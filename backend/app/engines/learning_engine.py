"""Estimativa de domínio observável, explicitamente heurística e conservadora."""
from __future__ import annotations

from statistics import pstdev
from typing import Any


def estimate_mastery(attempts: list[dict[str, Any]]) -> dict[str, Any]:
    n = len(attempts)
    if not n:
        return {"status":"not_assessed","score":None,"confidence":"none","evidence_count":0,"reasons":["Ainda não há tentativas registradas."]}
    accuracy = sum(int(bool(a["correct"])) for a in attempts) / n
    hint_rate = sum(int(a.get("hints_used",0) > 0) for a in attempts) / n
    transfer_items = [a for a in attempts if a.get("transfer")]
    transfer_rate = sum(int(bool(a["correct"])) for a in transfer_items) / len(transfer_items) if transfer_items else None
    recent = attempts[-8:]
    consistency = 1 - (pstdev([int(bool(a["correct"])) for a in recent]) if len(recent)>1 else 0)
    score = 0.65*accuracy + 0.15*(1-hint_rate) + 0.20*(transfer_rate if transfer_rate is not None else accuracy) 
    score = max(0.0,min(1.0,score))
    confidence = "low" if n < 5 else "medium" if n < 12 or not transfer_items else "high"
    if n < 3:
        status = "initial_evidence"
    elif score >= .85 and n >= 8 and transfer_rate is not None and transfer_rate >= .75:
        status = "evidence_of_consolidation"
    elif score >= .65:
        status = "developing"
    else:
        status = "needs_practice"
    reasons = [f"Precisão observada: {accuracy:.0%}.", f"Tentativas com pista: {hint_rate:.0%}.", f"Consistência recente aproximada: {consistency:.0%}."]
    if transfer_rate is None:
        reasons.append("Ainda não há observações em tarefas de transferência; confiança reduzida.")
    else:
        reasons.append(f"Precisão em tarefas marcadas como transferência: {transfer_rate:.0%}.")
    return {"status":status,"score":round(score,3),"confidence":confidence,"evidence_count":n,"accuracy":round(accuracy,3),"hint_rate":round(hint_rate,3),"consistency":round(consistency,3),"transfer_accuracy":None if transfer_rate is None else round(transfer_rate,3),"reasons":reasons}
