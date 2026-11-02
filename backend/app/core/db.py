"""Persistência SQLite pequena e auditável para modo local de usuário único."""
from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

SCHEMA = """
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS generated_exercises (
    id TEXT PRIMARY KEY,
    competency_id TEXT NOT NULL,
    level INTEGER NOT NULL CHECK(level BETWEEN 1 AND 9),
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS attempts (
    id TEXT PRIMARY KEY,
    exercise_id TEXT NOT NULL,
    competency_id TEXT NOT NULL,
    correct INTEGER NOT NULL CHECK(correct IN (0,1)),
    hints_used INTEGER NOT NULL DEFAULT 0 CHECK(hints_used >= 0),
    confidence INTEGER CHECK(confidence BETWEEN 1 AND 5),
    elapsed_ms INTEGER CHECK(elapsed_ms IS NULL OR elapsed_ms >= 0),
    transfer INTEGER NOT NULL DEFAULT 0 CHECK(transfer IN (0,1)),
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_attempts_competency ON attempts(competency_id, created_at);
CREATE TABLE IF NOT EXISTS review_cards (
    concept_id TEXT PRIMARY KEY,
    competency_id TEXT NOT NULL,
    due_at TEXT NOT NULL,
    interval_days REAL NOT NULL DEFAULT 0,
    repetitions INTEGER NOT NULL DEFAULT 0,
    ease REAL NOT NULL DEFAULT 2.5,
    status TEXT NOT NULL DEFAULT 'scheduled',
    updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reviews_due ON review_cards(status, due_at);
CREATE TABLE IF NOT EXISTS diagnostic_sessions (
    id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    item_index INTEGER NOT NULL DEFAULT 0,
    scoreable_total INTEGER NOT NULL DEFAULT 0,
    scoreable_correct INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    completed_at TEXT
);
CREATE TABLE IF NOT EXISTS diagnostic_answers (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES diagnostic_sessions(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    competency_id TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct INTEGER,
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS preferences (
    key TEXT PRIMARY KEY,
    value_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
PRAGMA user_version = 1;
"""


def connect(path: str | Path) -> sqlite3.Connection:
    db_path = str(path)
    if db_path != ":memory:":
        Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path, timeout=10, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("PRAGMA busy_timeout = 5000")
    if db_path != ":memory:":
        conn.execute("PRAGMA journal_mode = WAL")
    return conn


@contextmanager
def database(path: str | Path) -> Iterator[sqlite3.Connection]:
    conn = connect(path)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def initialize(path: str | Path) -> None:
    with database(path) as conn:
        conn.executescript(SCHEMA)
