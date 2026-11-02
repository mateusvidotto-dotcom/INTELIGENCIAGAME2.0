"""Recomendações heurísticas por revisão pendente, lacunas e pré-requisitos."""
from __future__ import annotations

from typing import Any


def recommend(curriculum: dict, mastery_by_skill: dict[str, dict[str, Any]], due_reviews: list[dict[str, Any]]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for review in due_reviews[:3]:
        items.append({"kind":"review","priority":"high","title":f"Revisar {review['concept_id']}","reason":"Há uma recuperação programada pendente.","competency_id":review["competency_id"]})
    track_map = {track["id"]:track for track in curriculum["tracks"]}
    candidates = []
    for skill_id, evidence in mastery_by_skill.items():
        candidates.append((evidence.get("score") if evidence.get("score") is not None else -0.1, skill_id, evidence))
    candidates.sort(key=lambda row: row[0])
    for score, skill_id, evidence in candidates:
        if len(items) >= 5:
            break
        if score < 0.7:
            items.append({"kind":"practice","priority":"medium","title":f"Praticar {skill_id}","reason":f"{evidence.get('evidence_count',0)} evidência(s); {evidence.get('status','sem dados')}. Reforce o conceito antes de subir o nível.","competency_id":skill_id})
    if len(items) < 3:
        assessed = set(mastery_by_skill)
        for track in curriculum["tracks"]:
            if len(items) >= 3:
                break
            if track["id"] not in assessed:
                prereqs_ok = all(p in assessed for p in track.get("prerequisites", []))
                if prereqs_ok:
                    items.append({"kind":"learn","priority":"low","title":f"Iniciar trilha: {track['title']}","reason":"Trilha ainda não possui evidências registradas; comece pelos fundamentos e confirme os pré-requisitos.","competency_id":track["id"]})
    return items[:5]
