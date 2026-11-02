"""Carregamento e validação do mapa curricular versionado."""
from __future__ import annotations

import json
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parents[3] / "data" / "curriculum" / "tracks.json"


def load_curriculum() -> dict:
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    ids = [track["id"] for track in data.get("tracks", [])]
    if len(ids) != len(set(ids)):
        raise ValueError("O mapa curricular contém IDs de trilhas duplicados.")
    known = set(ids)
    for track in data["tracks"]:
        missing = set(track.get("prerequisites", [])) - known
        if missing:
            raise ValueError(f"Pré-requisitos desconhecidos em {track['id']}: {sorted(missing)}")
    return data
