"""Geração determinística de desafios matemáticos e lógicos com gabarito privado.

O motor é deliberadamente pequeno e explicável. Ele não usa LLM e não afirma cobrir
competências para as quais ainda não há um gerador validado.
"""
from __future__ import annotations

import math
import random
import uuid
from fractions import Fraction
from typing import Any

SUPPORTED = {
    "math.algebra.linear-equations",
    "math.number-theory.gcd",
    "math.combinatorics.combinations",
    "logic.sequences.arithmetic",
    "programming.algorithms.loop-trace",
    "math.statistics.median",
    "math.percentage.discount",
    "math.ratio.proportions",
    "math.number-theory.modular",
    "math.algebra.systems",
    "math.probability.two-dice-sum",
}


def _choice_options(correct: str, distractors: list[str], rng: random.Random) -> tuple[list[str], int]:
    unique: list[str] = []
    for item in [correct, *distractors]:
        if item not in unique:
            unique.append(item)
    candidate = 1
    while len(unique) < 4:
        candidate += 1
        filler = f"{int(correct) + candidate}" if correct.lstrip("-").isdigit() else f"Opção alternativa {candidate}"
        if filler not in unique:
            unique.append(filler)
    options = unique[:4]
    rng.shuffle(options)
    return options, options.index(correct)


def generate_exercise(competency_id: str, level: int, seed: int | None = None) -> dict[str, Any]:
    if competency_id not in SUPPORTED:
        raise ValueError(f"Competência sem gerador validado: {competency_id}")
    level = max(1, min(9, int(level)))
    rng = random.Random(seed)
    exercise_id = str(uuid.uuid4())

    if competency_id == "math.algebra.linear-equations":
        a = rng.randint(2, 5 + level)
        x = rng.randint(-5, 5 + level)
        b = rng.randint(-7 * level, 7 * level)
        c = a * x + b
        correct = f"x = {x}"
        distractors = [f"x = {(c + b) // a}", f"x = {c - b}", f"x = {x + a}", f"x = {x - b}"]
        options, answer_index = _choice_options(correct, distractors, rng)
        prompt = f"Resolva a equação {a}x {'+' if b >= 0 else '−'} {abs(b)} = {c}. Qual valor de x satisfaz a igualdade?"
        operation = f"subtraia {b}" if b >= 0 else f"some {abs(b)}"
        steps = [f"Aplique a operação inversa: {operation} nos dois lados, obtendo {a}x = {c - b}.", f"Divida os dois lados por {a}: x = {(c - b)}/{a} = {x}.", "Substituir x na expressão original confirma a igualdade."]
        hints = ["Isole o termo que contém x, realizando a mesma operação nos dois lados.", f"Depois de mover o termo constante, você obterá {a}x = {c-b}.", f"Agora divida ambos os lados por {a}."]
        return {"id":exercise_id,"competency_id":competency_id,"level":level,"type":"choice","prompt":prompt,"options":options,"answer":correct,"answer_index":answer_index,"hints":hints,"explanation":"A equação mantém a igualdade quando a mesma operação é aplicada aos dois lados.","solution_steps":steps,"tags":["equação linear","isolamento de variável","verificação"]}

    if competency_id == "math.number-theory.gcd":
        p = rng.randint(2, 5 + level)
        q = rng.randint(2, 5 + level)
        base = rng.randint(2, 6 + level)
        a, b = base * p, base * q
        answer = math.gcd(a, b)
        wrong = [math.lcm(a,b), a+b, abs(a-b), max(p,q)*base]
        distractors = list(dict.fromkeys(str(v) for v in wrong if v != answer))
        hints = ["Procure o maior inteiro que divide os dois números sem deixar resto.", "Use o algoritmo de Euclides: substitua (a,b) por (b, a mod b).", "Continue até o resto ser zero; o último divisor não nulo é o MDC."]
        steps = [f"Aplicando o algoritmo de Euclides a {a} e {b}, calculam-se restos sucessivos.", f"O último resto não nulo (ou último divisor antes do resto zero) é {answer}.", f"Como {a} ÷ {answer} e {b} ÷ {answer} são inteiros, e nenhum divisor comum maior existe, MDC = {answer}."]
        return {"id":exercise_id,"competency_id":competency_id,"level":level,"type":"number","prompt":f"Determine o máximo divisor comum (MDC) de {a} e {b}. Informe apenas o número inteiro.","options":[],"answer":answer,"hints":hints,"explanation":"O MDC é o maior inteiro positivo que divide simultaneamente os dois números.","solution_steps":steps,"tags":["teoria dos números","divisibilidade","algoritmo de Euclides"]}

    if competency_id == "math.combinatorics.combinations":
        n = rng.randint(6 + level, 9 + level * 2)
        k = rng.choice([2,3,4]) if level >= 4 else 2
        answer = math.comb(n,k)
        permutation = math.perm(n,k)
        distractors = [permutation, n*k, math.comb(n-1,k), math.comb(n,k-1)]
        hints = ["A ordem das pessoas escolhidas altera o grupo formado?", "Como a ordem não importa, use combinação: C(n,k) = n! / (k!(n-k)!).", f"Substitua n={n} e k={k} na expressão de combinação."]
        steps = [f"A ordem não importa: escolher A, B e C forma o mesmo grupo que C, B e A.", f"Use C({n},{k}) = {n}! / ({k}!·({n-k})!).", f"O cálculo resulta em {answer} grupos distintos."]
        return {"id":exercise_id,"competency_id":competency_id,"level":level,"type":"number","prompt":f"Uma equipe será formada escolhendo {k} pessoas dentre {n} candidatos. Quantas equipes diferentes podem ser formadas, sem considerar a ordem dos escolhidos? Informe um inteiro.","options":[],"answer":answer,"hints":hints,"explanation":"Como a ordem não altera a equipe, trata-se de uma combinação simples.","solution_steps":steps,"tags":["combinatória","combinações","contagem"]}

    if competency_id == "logic.sequences.arithmetic":
        first = rng.randint(-8, 18)
        step = rng.randint(2, 4 + level)
        if rng.random() < .25:
            step = -step
        terms = [first + step*i for i in range(5)]
        correct = str(terms[-1])
        distractors = [str(terms[-1] + step), str(terms[-1] - step), str(terms[-2] + 2), str(terms[-1] + 2*step)]
        options, answer_index = _choice_options(correct, distractors, rng)
        prompt = f"Observe a sequência: {', '.join(map(str,terms[:4]))}, __. Qual é o próximo termo, considerando a regra mais simples compatível com todos os termos apresentados?"
        hints = ["Calcule a diferença entre termos consecutivos.", f"As diferenças são constantes e iguais a {step}.", f"Some {step} ao último termo apresentado."]
        steps = [f"As diferenças consecutivas são {step}, {step} e {step}.", f"A sequência é aritmética, com razão {step}.", f"Próximo termo = {terms[-2]} + ({step}) = {terms[-1]}."]
        return {"id":exercise_id,"competency_id":competency_id,"level":level,"type":"choice","prompt":prompt,"options":options,"answer":correct,"answer_index":answer_index,"hints":hints,"explanation":"A diferença constante entre termos caracteriza uma progressão aritmética.","solution_steps":steps,"tags":["sequências","diferenças","padrões"]}

    # programação: rastreamento simples de um acumulador em laço
    n = rng.randint(4, 6 + level)
    start = rng.randint(1, 4)
    increment = rng.randint(1, 3 + level)
    values = list(range(start, start + n*increment, increment))[:n]
    answer = sum(values)
    hints = ["Liste o valor do acumulador a cada repetição.", f"Os termos somados são {', '.join(map(str,values))}.", "Some os termos, sem pular a primeira ou a última repetição."]
    steps = [f"O laço soma os valores {', '.join(map(str,values))}.", f"A soma é {answer}.", "O total é conferido somando exatamente n termos da sequência gerada pelo range."]
    prompt = f"Considere o pseudocódigo: total = 0; para i em range({start}, {start+n*increment}, {increment}): total += i. Qual será o valor final de total? Informe um inteiro."
    return {"id":exercise_id,"competency_id":competency_id,"level":level,"type":"number","prompt":prompt,"options":[],"answer":answer,"hints":hints,"explanation":"O range inclui o início, avança pelo passo indicado e exclui o limite superior.","solution_steps":steps,"tags":["algoritmos","rastreamento de estado","laços"]}


def public_exercise(item: dict[str, Any]) -> dict[str, Any]:
    """Remove gabarito e explicação completa antes da tentativa."""
    return {k:v for k,v in item.items() if k not in {"answer","answer_index","explanation","solution_steps"}}


def check_answer(item: dict[str, Any], answer: str) -> bool:
    expected = item.get("answer")
    value = str(answer).strip().replace(",", ".")
    if isinstance(expected, int | float):
        try:
            return abs(float(value) - float(expected)) < 1e-9
        except ValueError:
            return False
    if isinstance(expected, str) and "/" in expected:
        try:
            return Fraction(value) == Fraction(expected)
        except (ValueError, ZeroDivisionError):
            return False
    return value.casefold() == str(expected).strip().casefold()
