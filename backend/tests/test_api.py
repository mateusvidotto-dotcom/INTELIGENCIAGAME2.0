from fastapi.testclient import TestClient

from app.main import create_app
from app.engines.exercise_engine import generate_exercise


def make_client(tmp_path):
    app = create_app(db_path=tmp_path / "test.sqlite3", origins=["http://localhost:5500"])
    return TestClient(app)


def test_health_and_ai_are_honest(tmp_path):
    with make_client(tmp_path) as client:
        response = client.get("/api/health")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "ok"
        assert body["storage"] == "sqlite-local"
        assert body["ai"]["enabled"] is False


def test_generated_answer_is_hidden_until_submission(tmp_path):
    with make_client(tmp_path) as client:
        generated = client.post("/api/v1/exercises/generate", json={
            "competency_id": "math.algebra.linear-equations", "level": 4, "seed": 12345
        })
        assert generated.status_code == 200
        exercise = generated.json()
        assert "answer" not in exercise
        assert "explanation" not in exercise
        assert exercise["id"]
        expected = generate_exercise("math.algebra.linear-equations", 4, 12345)["answer"]
        submitted = client.post(f"/api/v1/exercises/{exercise['id']}/answer", json={
            "answer": expected,
            "hints_used": 0,
            "confidence": 4,
        })
        assert submitted.status_code == 200
        assert submitted.json()["correct"] is True
        assert "solution_steps" in submitted.json()
        assert "mastery" in submitted.json()


def test_hint_limits_and_missing_exercise(tmp_path):
    with make_client(tmp_path) as client:
        missing = client.get("/api/v1/exercises/not-real/hint?step=1")
        assert missing.status_code == 404
        generated = client.post("/api/v1/exercises/generate", json={
            "competency_id": "logic.sequences.arithmetic", "level": 3, "seed": 7
        }).json()
        hint = client.get(f"/api/v1/exercises/{generated['id']}/hint?step=1")
        assert hint.status_code == 200
        assert hint.json()["step"] == 1


def test_attempts_create_analytics_and_review(tmp_path):
    with make_client(tmp_path) as client:
        payload = {
            "exercise_id": "frontend-logic-1",
            "competency_id": "logic",
            "correct": True,
            "hints_used": 0,
            "confidence": 4,
            "transfer": True,
        }
        saved = client.post("/api/v1/attempts", json=payload)
        assert saved.status_code == 200
        assert saved.json()["saved"] is True
        analytics = client.get("/api/v1/analytics/competencies").json()
        assert analytics["competencies"]["logic"]["evidence_count"] == 1
        reviews = client.get("/api/v1/reviews").json()
        assert reviews["count"] == 1
        concept_id = reviews["items"][0]["concept_id"]
        graded = client.post(f"/api/v1/reviews/{concept_id}/grade", json={"rating":"good"})
        assert graded.status_code == 200


def test_curriculum_and_invalid_competency(tmp_path):
    with make_client(tmp_path) as client:
        curriculum = client.get("/api/v1/curriculum").json()
        assert len(curriculum["tracks"]) >= 20
        invalid = client.post("/api/v1/exercises/generate", json={
            "competency_id":"unimplemented.skill", "level":3
        })
        assert invalid.status_code == 422


def test_diagnostic_session_records_objective_and_open_answers(tmp_path):
    with make_client(tmp_path) as client:
        started = client.post("/api/v1/diagnostic/start").json()
        session_id = started["session_id"]
        item = started["item"]
        response = client.post(f"/api/v1/diagnostic/{session_id}/answer", json={
            "item_id": item["id"], "answer":"42"
        })
        assert response.status_code == 200
        assert response.json()["feedback"]["scored"] is True
        wrong_order = client.post(f"/api/v1/diagnostic/{session_id}/answer", json={
            "item_id": "not-the-next-item", "answer":"anything"
        })
        assert wrong_order.status_code == 409


def test_preferences_validate_track_ids(tmp_path):
    with make_client(tmp_path) as client:
        response = client.put("/api/v1/profile/preferences", json={
            "daily_minutes": 35, "focus_tracks": ["not-a-real-track"],
            "preferred_difficulty": 4, "no_timer": True
        })
        assert response.status_code == 422
        valid = client.put("/api/v1/profile/preferences", json={
            "daily_minutes": 35, "focus_tracks": ["math"],
            "preferred_difficulty": 4, "no_timer": True
        })
        assert valid.status_code == 200


def test_all_deterministic_generators_validate_their_own_answers():
    from app.engines.exercise_engine import SUPPORTED, check_answer, generate_exercise, public_exercise

    assert len(SUPPORTED) == 11
    for competency_id in sorted(SUPPORTED):
        item = generate_exercise(competency_id, level=6, seed=20261102)
        assert check_answer(item, str(item["answer"])), competency_id
        public = public_exercise(item)
        assert "answer" not in public
        assert "explanation" not in public
        assert item["prompt"]
        assert len(item["hints"]) >= 2
        assert len(item["solution_steps"]) >= 2


def test_probability_checker_accepts_equivalent_fraction():
    from app.engines.exercise_engine import check_answer

    item = {
        "answer": "1/2",
        "type": "text",
    }
    assert check_answer(item, "2/4") is True
    assert check_answer(item, "3/4") is False



def test_full_diagnostic_has_21_items_and_completes_with_open_reflections(tmp_path):
    with make_client(tmp_path) as client:
        started = client.post("/api/v1/diagnostic/start").json()
        assert started["total_items"] == 21
        session_id = started["session_id"]
        current = started["item"]
        responses = 0
        while True:
            if current["type"] == "choice":
                answer = current["options"][0]
            elif current["type"] == "open":
                answer = "Uma resposta reflexiva com duas hipóteses diferentes."
            elif current["type"] == "self_report":
                answer = "Minha confiança varia conforme o tipo de conteúdo."
            else:
                answer = "0"
            response = client.post(f"/api/v1/diagnostic/{session_id}/answer", json={
                "item_id": current["id"], "answer": answer
            })
            assert response.status_code == 200
            responses += 1
            body = response.json()
            if body["completed"]:
                assert body["summary"]["responses"] == 21
                assert body["summary"]["scoreable_total"] < 21
                break
            current = body["next_item"]
        assert responses == 21
