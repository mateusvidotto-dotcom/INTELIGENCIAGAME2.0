"""Configuração ambiental sem dependência de biblioteca externa."""
from __future__ import annotations

import os
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[2]
DEFAULT_DB = BACKEND_DIR / "data" / "mindforge.sqlite3"


def database_path() -> Path:
    value = os.getenv("MFO_DATABASE_PATH", "").strip()
    path = Path(value).expanduser() if value else DEFAULT_DB
    if not path.is_absolute():
        path = (BACKEND_DIR / path).resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def cors_origins() -> list[str]:
    raw = os.getenv(
        "MFO_CORS_ORIGINS",
        "http://127.0.0.1:5500,http://localhost:5500,http://127.0.0.1:8000,http://localhost:8000",
    )
    return [item.strip() for item in raw.split(",") if item.strip()]


def ai_status() -> dict[str, str | bool]:
    # Nenhum adaptador de provedor foi implementado nesta fase. Não inferir que
    # uma chave de API, sozinha, significa que a integração está funcional.
    return {
        "enabled": False,
        "provider": "disabled",
        "message": "Integração de IA externa ainda não implementada. Nenhum modelo é simulado.",
    }
