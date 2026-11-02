"""API do MIND FORGE PYTHON CORE — execução local, single-user e sem IA simulada."""
from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.core.config import ai_status, cors_origins, database_path
from app.core.db import database, initialize
from app.engines.curriculum_engine import load_curriculum
from app.engines.diagnostic_engine import DIAGNOSTIC_ITEMS, check_item, public_item
from app.engines.exercise_engine import SUPPORTED, check_answer, generate_exercise, public_exercise
from app.engines.learning_engine import estimate_mastery
from app.engines.recommendation_engine import recommend
from app.engines.revision_engine import next_schedule

API_PREFIX = "/api/v1"


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class GenerateExerciseIn(BaseModel):
    competency_id: str = Field(min_length=3, max_length=100)
    level: int = Field(default=3, ge=1, le=9)
    seed: int | None = Field(default=None, ge=0, le=2**31-1)


class ExerciseAnswerIn(BaseModel):
    answer: str = Field(min_length=1, max_length=1000)
    hints_used: int = Field(default=0, ge=0, le=10)
    confidence: int | None = Field(default=None, ge=1, le=5)
    elapsed_ms: int | None = Field(default=None, ge=0, le=86_400_000)
    transfer: bool = False


class FrontendAttemptIn(BaseModel):
    exercise_id: str = Field(min_length=1, max_length=160)
    competency_id: str = Field(min_length=1, max_length=100)
    correct: bool
    hints_used: int = Field(default=0, ge=0, le=20)
    confidence: int | None = Field(default=None, ge=1, le=5)
    elapsed_ms: int | None = Field(default=None, ge=0, le=86_400_000)
    transfer: bool = False


class ReviewGradeIn(BaseModel):
    rating: str = Field(pattern="^(again|hard|good|easy)$")


class DiagnosticAnswerIn(BaseModel):
    item_id: str = Field(min_length=1, max_length=80)
    answer: str = Field(max_length=4000)


class PreferencesIn(BaseModel):
    daily_minutes: int = Field(default=35, ge=5, le=240)
    focus_tracks: list[str] = Field(default_factory=list, max_length=10)
    preferred_difficulty: int = Field(default=3, ge=1, le=9)
    no_timer: bool = True


def _get_exercise(conn, exercise_id: str) -> dict[str, Any] | None:
    row = conn.execute("SELECT payload_json FROM generated_exercises WHERE id=?", (exercise_id,)).fetchone()
    return json.loads(row["payload_json"]) if row else None


def _record_attempt(conn, *, exercise_id: str, competency_id: str, correct: bool,
                    hints_used: int, confidence: int | None, elapsed_ms: int | None,
                    transfer: bool) -> dict[str, Any]:
    attempt_id = str(uuid.uuid4())
    created = utc_now()
    conn.execute(
        """INSERT INTO attempts(id,exercise_id,competency_id,correct,hints_used,confidence,elapsed_ms,transfer,created_at)
           VALUES(?,?,?,?,?,?,?,?,?)""",
        (attempt_id, exercise_id, competency_id, int(correct), hints_used, confidence, elapsed_ms, int(transfer), created),
    )
    prior = conn.execute("SELECT * FROM review_cards WHERE concept_id=?", (competency_id,)).fetchone()
    repetitions = prior["repetitions"] if prior else 0
    interval = prior["interval_days"] if prior else 0.0
    ease = prior["ease"] if prior else 2.5
    rating = "again" if not correct else "hard" if hints_used else "easy" if confidence and confidence >= 5 else "good"
    schedule = next_schedule(rating, repetitions, interval, ease)
    conn.execute(
        """INSERT INTO review_cards(concept_id,competency_id,due_at,interval_days,repetitions,ease,status,updated_at)
           VALUES(?,?,?,?,?,?,?,?)
           ON CONFLICT(concept_id) DO UPDATE SET due_at=excluded.due_at, interval_days=excluded.interval_days,
             repetitions=excluded.repetitions,ease=excluded.ease,status=excluded.status,updated_at=excluded.updated_at""",
        (competency_id, competency_id, schedule["due_at"], schedule["interval_days"], schedule["repetitions"], schedule["ease"], schedule["status"], created),
    )
    return {"attempt_id":attempt_id,"created_at":created,"review":schedule}


def _attempts_by_competency(conn) -> dict[str, list[dict[str, Any]]]:
    rows = conn.execute("SELECT * FROM attempts ORDER BY created_at ASC").fetchall()
    result: dict[str, list[dict[str, Any]]] = {}
    for row in rows:
        result.setdefault(row["competency_id"], []).append(dict(row))
    return result


def create_app(db_path: str | Path | None = None, origins: list[str] | None = None) -> FastAPI:
    path = Path(db_path) if db_path and str(db_path) != ":memory:" else db_path or database_path()
    initialize(path)
    app = FastAPI(
        title="MIND FORGE PYTHON CORE",
        description="API local para geração determinística de exercícios, evidências, revisões e trilhas.",
        version="0.2.0",
    )
    app.state.db_path = path
    allowed = origins if origins is not None else cors_origins()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed,
        allow_credentials=False,
        allow_methods=["GET", "POST", "PUT", "OPTIONS"],
        allow_headers=["Content-Type"],
        max_age=600,
    )

    @app.get("/api/health", tags=["system"])
    def health():
        return {"status":"ok","service":"MIND FORGE PYTHON CORE","version":"0.2.0","ai":ai_status(),"storage":"sqlite-local"}

    @app.get(f"{API_PREFIX}/curriculum", tags=["curriculum"])
    def curriculum():
        return load_curriculum()

    @app.get(f"{API_PREFIX}/curriculum/{{track_id}}", tags=["curriculum"])
    def curriculum_track(track_id: str):
        data = load_curriculum()
        for track in data["tracks"]:
            if track["id"] == track_id:
                return track
        raise HTTPException(status_code=404, detail="Trilha não encontrada.")

    @app.post(f"{API_PREFIX}/exercises/generate", tags=["exercises"])
    def create_exercise(payload: GenerateExerciseIn, request: Request):
        if payload.competency_id not in SUPPORTED:
            raise HTTPException(status_code=422, detail={"message":"Competência sem gerador implementado.","supported":sorted(SUPPORTED)})
        try:
            exercise = generate_exercise(payload.competency_id, payload.level, payload.seed)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc
        with database(request.app.state.db_path) as conn:
            conn.execute("INSERT INTO generated_exercises(id,competency_id,level,payload_json,created_at) VALUES(?,?,?,?,?)",
                         (exercise["id"], exercise["competency_id"], exercise["level"], json.dumps(exercise,ensure_ascii=False), utc_now()))
        return public_exercise(exercise)

    @app.get(f"{API_PREFIX}/exercises/{{exercise_id}}/hint", tags=["exercises"])
    def exercise_hint(exercise_id: str, request: Request, step: int = Query(1, ge=1, le=10)):
        with database(request.app.state.db_path) as conn:
            item = _get_exercise(conn, exercise_id)
        if not item:
            raise HTTPException(status_code=404, detail="Exercício não encontrado ou expirado.")
        hints = item.get("hints", [])
        if step > len(hints):
            raise HTTPException(status_code=404, detail="Não há outra pista disponível.")
        return {"exercise_id":exercise_id,"step":step,"total":len(hints),"hint":hints[step-1]}

    @app.post(f"{API_PREFIX}/exercises/{{exercise_id}}/answer", tags=["exercises"])
    def answer_exercise(exercise_id: str, payload: ExerciseAnswerIn, request: Request):
        with database(request.app.state.db_path) as conn:
            item = _get_exercise(conn, exercise_id)
            if not item:
                raise HTTPException(status_code=404, detail="Exercício não encontrado ou expirado.")
            correct = check_answer(item, payload.answer)
            record = _record_attempt(conn, exercise_id=exercise_id, competency_id=item["competency_id"], correct=correct,
                hints_used=payload.hints_used, confidence=payload.confidence, elapsed_ms=payload.elapsed_ms, transfer=payload.transfer)
            rows = conn.execute("SELECT * FROM attempts WHERE competency_id=? ORDER BY created_at DESC LIMIT 20", (item["competency_id"],)).fetchall()
            mastery = estimate_mastery([dict(row) for row in reversed(rows)])
        return {"correct":correct,"expected_answer":item["answer"],"explanation":item["explanation"],"solution_steps":item["solution_steps"],"record":record,"mastery":mastery}

    @app.post(f"{API_PREFIX}/attempts", tags=["learning"])
    def record_frontend_attempt(payload: FrontendAttemptIn, request: Request):
        with database(request.app.state.db_path) as conn:
            record = _record_attempt(conn, exercise_id=payload.exercise_id, competency_id=payload.competency_id,
                correct=payload.correct, hints_used=payload.hints_used, confidence=payload.confidence,
                elapsed_ms=payload.elapsed_ms, transfer=payload.transfer)
        return {"saved":True,"record":record}

    @app.get(f"{API_PREFIX}/analytics/competencies", tags=["analytics"])
    def analytics(request: Request):
        with database(request.app.state.db_path) as conn:
            groups = _attempts_by_competency(conn)
        return {"competencies":{key:estimate_mastery(items) for key,items in groups.items()},"note":"Heurística de aprendizagem local; não é diagnóstico psicométrico."}

    @app.get(f"{API_PREFIX}/reviews", tags=["revision"])
    def reviews(request: Request, due_only: bool = False):
        with database(request.app.state.db_path) as conn:
            rows = conn.execute("SELECT * FROM review_cards ORDER BY due_at ASC").fetchall()
        now = utc_now()
        items = [dict(row) for row in rows]
        if due_only:
            items = [item for item in items if item["due_at"] <= now]
        return {"items":items,"count":len(items)}

    @app.post(f"{API_PREFIX}/reviews/{{concept_id}}/grade", tags=["revision"])
    def grade_review(concept_id: str, payload: ReviewGradeIn, request: Request):
        with database(request.app.state.db_path) as conn:
            prior = conn.execute("SELECT * FROM review_cards WHERE concept_id=?", (concept_id,)).fetchone()
            if not prior:
                raise HTTPException(status_code=404, detail="Cartão de revisão não encontrado.")
            schedule = next_schedule(payload.rating, prior["repetitions"], prior["interval_days"], prior["ease"])
            conn.execute("UPDATE review_cards SET due_at=?,interval_days=?,repetitions=?,ease=?,status=?,updated_at=? WHERE concept_id=?",
                         (schedule["due_at"],schedule["interval_days"],schedule["repetitions"],schedule["ease"],schedule["status"],utc_now(),concept_id))
        return {"concept_id":concept_id,**schedule}

    @app.get(f"{API_PREFIX}/recommendations", tags=["learning"])
    def recommendations(request: Request):
        curriculum_data = load_curriculum()
        with database(request.app.state.db_path) as conn:
            groups = _attempts_by_competency(conn)
            review_rows = conn.execute("SELECT * FROM review_cards WHERE due_at<=? ORDER BY due_at ASC", (utc_now(),)).fetchall()
        mastery = {key:estimate_mastery(items) for key,items in groups.items()}
        return {"items":recommend(curriculum_data,mastery,[dict(row) for row in review_rows]),"basis":"revisões vencidas e evidências registradas","confidence":"heurística inicial"}

    @app.post(f"{API_PREFIX}/diagnostic/start", tags=["diagnostic"])
    def start_diagnostic(request: Request):
        session_id = str(uuid.uuid4())
        with database(request.app.state.db_path) as conn:
            conn.execute("INSERT INTO diagnostic_sessions(id,status,item_index,scoreable_total,scoreable_correct,created_at) VALUES(?,?,?,?,?,?)",
                         (session_id,"active",0,0,0,utc_now()))
        return {"session_id":session_id,"total_items":len(DIAGNOSTIC_ITEMS),"item":public_item(DIAGNOSTIC_ITEMS[0]),"note":"Diagnóstico exploratório. Itens abertos e autorrelatos não recebem nota automática."}

    @app.get(f"{API_PREFIX}/diagnostic/{{session_id}}/next", tags=["diagnostic"])
    def next_diagnostic(session_id: str, request: Request):
        with database(request.app.state.db_path) as conn:
            row = conn.execute("SELECT * FROM diagnostic_sessions WHERE id=?", (session_id,)).fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="Sessão diagnóstica não encontrada.")
            if row["status"] != "active":
                return {"completed":True,"summary":_diagnostic_summary(conn,session_id)}
            index = row["item_index"]
            if index >= len(DIAGNOSTIC_ITEMS):
                conn.execute("UPDATE diagnostic_sessions SET status='completed',completed_at=? WHERE id=?", (utc_now(),session_id))
                return {"completed":True,"summary":_diagnostic_summary(conn,session_id)}
            current = DIAGNOSTIC_ITEMS[index]
            already = conn.execute("SELECT 1 FROM diagnostic_answers WHERE session_id=? AND item_id=?", (session_id,current["id"])).fetchone()
            if already:
                raise HTTPException(status_code=409, detail="A questão atual já foi respondida; envie a próxima etapa.")
            return {"completed":False,"index":index+1,"total":len(DIAGNOSTIC_ITEMS),"item":public_item(current)}

    @app.post(f"{API_PREFIX}/diagnostic/{{session_id}}/answer", tags=["diagnostic"])
    def answer_diagnostic(session_id: str, payload: DiagnosticAnswerIn, request: Request):
        with database(request.app.state.db_path) as conn:
            session = conn.execute("SELECT * FROM diagnostic_sessions WHERE id=?", (session_id,)).fetchone()
            if not session:
                raise HTTPException(status_code=404, detail="Sessão diagnóstica não encontrada.")
            if session["status"] != "active":
                raise HTTPException(status_code=409, detail="Esta sessão já foi concluída.")
            index = session["item_index"]
            if index >= len(DIAGNOSTIC_ITEMS):
                raise HTTPException(status_code=409, detail="Não há questões pendentes nesta sessão.")
            item = DIAGNOSTIC_ITEMS[index]
            if item["id"] != payload.item_id:
                raise HTTPException(status_code=409, detail="O item enviado não corresponde à etapa atual.")
            duplicate = conn.execute("SELECT 1 FROM diagnostic_answers WHERE session_id=? AND item_id=?", (session_id,item["id"])).fetchone()
            if duplicate:
                raise HTTPException(status_code=409, detail="Resposta duplicada.")
            result = check_item(item,payload.answer)
            answer_id = str(uuid.uuid4())
            conn.execute("INSERT INTO diagnostic_answers(id,session_id,item_id,competency_id,answer_text,is_correct,created_at) VALUES(?,?,?,?,?,?,?)",
                         (answer_id,session_id,item["id"],item["competency_id"],payload.answer,None if result is None else int(result),utc_now()))
            total = session["scoreable_total"] + (1 if result is not None else 0)
            correct = session["scoreable_correct"] + (1 if result is True else 0)
            next_index = index + 1
            status = "completed" if next_index >= len(DIAGNOSTIC_ITEMS) else "active"
            conn.execute("UPDATE diagnostic_sessions SET item_index=?,scoreable_total=?,scoreable_correct=?,status=?,completed_at=? WHERE id=?",
                         (next_index,total,correct,status,utc_now() if status=="completed" else None,session_id))
            feedback = {"correct":result,"explanation":item["explanation"],"scored":result is not None}
            if status == "completed":
                summary = _diagnostic_summary(conn,session_id)
                return {"feedback":feedback,"completed":True,"summary":summary}
            return {"feedback":feedback,"completed":False,"next_item":public_item(DIAGNOSTIC_ITEMS[next_index]),"index":next_index+1,"total":len(DIAGNOSTIC_ITEMS)}

    @app.get(f"{API_PREFIX}/profile/preferences", tags=["profile"])
    def get_preferences(request: Request):
        with database(request.app.state.db_path) as conn:
            row = conn.execute("SELECT value_json FROM preferences WHERE key='profile' ").fetchone()
        return json.loads(row["value_json"]) if row else PreferencesIn().model_dump()

    @app.put(f"{API_PREFIX}/profile/preferences", tags=["profile"])
    def put_preferences(payload: PreferencesIn, request: Request):
        allowed_track_ids = {t["id"] for t in load_curriculum()["tracks"]}
        unknown = set(payload.focus_tracks) - allowed_track_ids
        if unknown:
            raise HTTPException(status_code=422, detail={"unknown_tracks":sorted(unknown)})
        value = payload.model_dump()
        with database(request.app.state.db_path) as conn:
            conn.execute("INSERT INTO preferences(key,value_json,updated_at) VALUES('profile',?,?) ON CONFLICT(key) DO UPDATE SET value_json=excluded.value_json,updated_at=excluded.updated_at",
                         (json.dumps(value,ensure_ascii=False),utc_now()))
        return {"saved":True,"preferences":value}

    @app.get(f"{API_PREFIX}/ai/status", tags=["ai"])
    def get_ai_status():
        return ai_status()

    return app


def _diagnostic_summary(conn, session_id: str) -> dict[str, Any]:
    session = conn.execute("SELECT * FROM diagnostic_sessions WHERE id=?", (session_id,)).fetchone()
    answers = conn.execute("SELECT competency_id,is_correct FROM diagnostic_answers WHERE session_id=?", (session_id,)).fetchall()
    scored = [row for row in answers if row["is_correct"] is not None]
    accuracy = sum(int(row["is_correct"]) for row in scored)/len(scored) if scored else None
    by_comp: dict[str, dict[str, Any]] = {}
    for row in answers:
        item = by_comp.setdefault(row["competency_id"],{"responses":0,"scored":0,"correct":0})
        item["responses"] += 1
        if row["is_correct"] is not None:
            item["scored"] += 1
            item["correct"] += int(row["is_correct"])
    return {"session_id":session_id,"status":session["status"],"responses":len(answers),"scoreable_total":len(scored),"scoreable_correct":sum(int(row["is_correct"]) for row in scored),"accuracy":None if accuracy is None else round(accuracy,3),"by_competency":by_comp,"limitations":"Amostra curta e exploratória; não constitui teste de QI, diagnóstico clínico ou avaliação psicométrica."}


app = create_app()
