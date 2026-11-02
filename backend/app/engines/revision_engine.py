"""Agendamento espaçado simples, transparente e não clínico."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

RATINGS = {"again","hard","good","easy"}


def next_schedule(rating: str, repetitions: int, interval_days: float, ease: float) -> dict[str, Any]:
    if rating not in RATINGS:
        raise ValueError("rating deve ser again, hard, good ou easy")
    ease = max(1.3, min(3.0, ease))
    if rating == "again":
        repetitions, interval_days, ease = 0, 0.25, max(1.3,ease-0.2)
    elif rating == "hard":
        repetitions += 1
        interval_days = max(1.0, interval_days*1.2 if interval_days else 1.0)
        ease = max(1.3,ease-0.1)
    elif rating == "good":
        repetitions += 1
        interval_days = 1.0 if repetitions == 1 else 3.0 if repetitions == 2 else max(4.0, interval_days*ease)
    else:
        repetitions += 1
        interval_days = 2.0 if repetitions == 1 else 5.0 if repetitions == 2 else max(6.0, interval_days*ease*1.25)
        ease = min(3.0,ease+0.15)
    due = datetime.now(timezone.utc) + timedelta(days=interval_days)
    return {"repetitions":repetitions,"interval_days":round(interval_days,2),"ease":round(ease,2),"due_at":due.isoformat(),"status":"scheduled"}
