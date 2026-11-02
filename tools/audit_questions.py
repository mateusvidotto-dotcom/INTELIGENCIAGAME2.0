#!/usr/bin/env python3
"""Auditoria estrutural e heurística do banco do Mind Forge Omega.

Não tenta decidir automaticamente se um argumento, uma interpretação bíblica ou
um distrator é pedagogicamente perfeito. Sinaliza defeitos verificáveis e indícios
que devem receber revisão editorial.
"""
from __future__ import annotations
import argparse
import json
import math
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

SUPPORTED = {"choice", "number", "count", "memory", "text", "open"}
ACCENTS = str.maketrans({"á":"a", "à":"a", "â":"a", "ã":"a", "é":"e", "ê":"e", "í":"i", "ó":"o", "ô":"o", "õ":"o", "ú":"u", "ç":"c"})


def normalize(text: str) -> str:
    text = text.lower().translate(ACCENTS)
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return " ".join(text.split())


def normalize_option(text: str) -> str:
    # Keep symbols and mathematical signs: ▲/● are distinct alternatives and −5 != 5.
    text = unicodedata.normalize("NFKC", text).casefold().translate(ACCENTS)
    text = text.replace("−", "-")
    return " ".join(text.split())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("bank", type=Path, help="JSON produzido por export-question-bank.cjs")
    parser.add_argument("--strict", action="store_true", help="Falhar também diante de avisos editoriais")
    args = parser.parse_args()
    try:
        data = json.loads(args.bank.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"ERRO: não foi possível ler JSON: {exc}", file=sys.stderr)
        return 2
    modules = data.get("modules")
    if not isinstance(modules, list) or not modules:
        print("ERRO: o arquivo não contém uma lista de módulos.", file=sys.stderr)
        return 2

    errors: list[str] = []
    warnings: list[str] = []
    seen_ids: dict[str, str] = {}
    total = 0
    all_types = Counter()
    module_counts = {}
    choice_positions = Counter()
    length_warnings = 0
    repeated_prompts = 0
    near_duplicates = 0

    for module in modules:
        mid = str(module.get("id", "<sem-id>"))
        questions = module.get("questions")
        if not isinstance(questions, list) or not questions:
            errors.append(f"{mid}: sem lista de questões ou banco vazio")
            continue
        module_counts[mid] = len(questions)
        if len(questions) < 20:
            warnings.append(f"{mid}: contém apenas {len(questions)} questões; meta editorial recomendada: 20+")
        prompt_records: list[tuple[str, str, bool]] = []

        for q in questions:
            total += 1
            qid = q.get("id")
            prompt = q.get("prompt")
            qtype = q.get("type")
            level = q.get("level")
            label = f"{mid}/{qid or '<sem-id>'}"
            all_types[str(qtype)] += 1
            if not isinstance(qid, str) or not qid.strip():
                errors.append(f"{label}: identificador ausente ou inválido")
            elif qid in seen_ids:
                errors.append(f"{label}: identificador duplicado também usado em {seen_ids[qid]}")
            else:
                seen_ids[qid] = label
            if q.get("moduleId") != mid:
                errors.append(f"{label}: moduleId não corresponde ao módulo que contém a questão")
            if not isinstance(prompt, str) or not prompt.strip():
                errors.append(f"{label}: enunciado vazio")
            if not isinstance(level, int) or not 1 <= level <= 9:
                errors.append(f"{label}: nível precisa ser um inteiro entre 1 e 9")
            if qtype not in SUPPORTED:
                errors.append(f"{label}: tipo de questão não suportado ({qtype})")

            if isinstance(prompt, str) and prompt.strip() and not q.get("dynamic"):
                normalized_prompt = normalize(prompt)
                prompt_records.append((normalized_prompt, str(qid), False))

            if qtype == "choice":
                opts = q.get("options")
                ans = q.get("answer")
                if not isinstance(opts, list) or len(opts) != 4:
                    errors.append(f"{label}: questão objetiva deve ter exatamente quatro alternativas")
                    continue
                if not all(isinstance(opt, str) and opt.strip() for opt in opts):
                    errors.append(f"{label}: existe alternativa vazia ou que não é texto")
                    continue
                normalized_options = [normalize_option(opt) for opt in opts]
                if len(set(normalized_options)) != len(normalized_options):
                    errors.append(f"{label}: possui alternativas duplicadas após normalização")
                if not isinstance(ans, int) or isinstance(ans, bool) or not 0 <= ans < len(opts):
                    errors.append(f"{label}: índice de resposta correto inválido")
                else:
                    choice_positions[ans] += 1
                lengths = [len(opt.strip()) for opt in opts]
                correct_length = len(opts[ans].strip()) if isinstance(ans, int) and 0 <= ans < len(opts) else 0
                wrong_lengths = [len(opt.strip()) for index, opt in enumerate(opts) if index != ans]
                wrong_median = sorted(wrong_lengths)[len(wrong_lengths)//2] if wrong_lengths else 0
                long_asymmetry = min(lengths) >= 20 and max(lengths) >= 50 and max(lengths) / max(1, min(lengths)) >= 1.8
                correct_asymmetry = correct_length >= 42 and correct_length >= wrong_median * 1.45
                if long_asymmetry or correct_asymmetry:
                    length_warnings += 1
                    warnings.append(f"{label}: verificar pista pelo comprimento (correta={correct_length}; outras={wrong_lengths})")
                trivial = [opt for opt in opts if re.search(r"\b(nunca|sempre|automaticamente|necessariamente|toda?\s+incerteza|sem precisar|não tem relação alguma)\b", opt.lower())]
                if len(trivial) >= 2:
                    warnings.append(f"{label}: várias alternativas usam absolutos linguísticos; verificar se são distratores artificiais")
            elif qtype in {"number", "count"}:
                ans = q.get("answer")
                if not isinstance(ans, (int, float)) or isinstance(ans, bool) or not math.isfinite(ans):
                    errors.append(f"{label}: resposta numérica ausente ou inválida")
            elif qtype == "memory":
                seq, ans = q.get("sequence"), q.get("answer")
                if not isinstance(seq, list) or not seq or not isinstance(ans, str) or not ans:
                    errors.append(f"{label}: sequência ou resposta de memória ausente")
                elif not q.get("dynamic"):
                    mode = q.get("memoryMode", "forward")
                    ordered_symbols = ["●", "▲", "■", "◆", "✦", "○", "△", "◇"]
                    expected = list(seq)
                    if mode == "reverse": expected.reverse()
                    elif mode == "oddPositions": expected = seq[::2]
                    elif mode == "evenPositions": expected = seq[1::2]
                    elif mode == "symbolOrder": expected = sorted(enumerate(seq), key=lambda pair: (ordered_symbols.index(pair[1]), pair[0]))
                    if mode == "symbolOrder": expected = [item[1] for item in expected]
                    if "".join(expected) != ans:
                        errors.append(f"{label}: resposta não corresponde à regra de memória declarada")
            elif qtype == "open":
                criteria = q.get("criteria")
                if not isinstance(criteria, list) or len(criteria) < 2 or not all(isinstance(c, str) and c.strip() for c in criteria):
                    errors.append(f"{label}: atividade aberta sem critérios de autoavaliação suficientes")
            elif qtype == "text":
                if not isinstance(q.get("answer"), str) or not q["answer"].strip():
                    errors.append(f"{label}: resposta textual ausente")

        # Duplicate prompt detection excludes procedural templates, whose content varies per play.
        for i, (prompt_a, id_a, _) in enumerate(prompt_records):
            for prompt_b, id_b, _ in prompt_records[i + 1:]:
                if prompt_a == prompt_b:
                    repeated_prompts += 1
                    warnings.append(f"{mid}/{id_b}: enunciado igual ao de {id_a}")
                elif len(prompt_a) > 35 and len(prompt_b) > 35 and SequenceMatcher(None, prompt_a, prompt_b).ratio() >= 0.94:
                    near_duplicates += 1
                    warnings.append(f"{mid}/{id_b}: enunciado muito parecido com {id_a}; avaliar diversidade real")

    print("MIND FORGE OMEGA — AUDITORIA DO BANCO")
    print(f"Módulos: {len(modules)} | Questões: {total} | Distratores revisados: {data.get('qualityOverridesApplied', 0)}")
    print("Tipos: " + ", ".join(f"{name}={count}" for name, count in sorted(all_types.items())))
    print("Questões por módulo: " + ", ".join(f"{mid}={count}" for mid, count in module_counts.items()))
    print("Posições originais dos gabaritos (a ordem é embaralhada na interface): " + ", ".join(f"{chr(65+i)}={choice_positions[i]}" for i in range(4)))
    print(f"Sinais editoriais: {length_warnings} alertas de comprimento; {repeated_prompts} prompts repetidos; {near_duplicates} possíveis quase-duplicatas")
    if warnings:
        print(f"\nAVISOS ({len(warnings)}):")
        for warning in warnings[:80]: print(f" - {warning}")
        if len(warnings) > 80: print(f" - ... e mais {len(warnings)-80} aviso(s)")
    if errors:
        print(f"\nFALHAS ESTRUTURAIS ({len(errors)}):", file=sys.stderr)
        for error in errors: print(f" - {error}", file=sys.stderr)
        return 1
    if args.strict and warnings:
        print(f"\nFALHAS EDITORIAIS NO MODO ESTRITO ({len(warnings)}):", file=sys.stderr)
        for warning in warnings: print(f" - {warning}", file=sys.stderr)
        return 1
    print("\nRESULTADO: estrutura íntegra. Avisos editoriais não são prova automática de defeito, mas indicam itens que merecem revisão humana.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
