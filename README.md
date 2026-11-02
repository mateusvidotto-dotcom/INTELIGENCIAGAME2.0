# MIND FORGE OMEGA ∞ — v1.3.0

Plataforma estática de treinamento intelectual com 12 laboratórios originais, mapa curricular de 22 trilhas, biblioteca de PDFs OBMEP enviados pelo usuário e um Python Core opcional para desenvolvimento local.

## Executar o frontend

Na raiz do projeto:

```bash
python -m http.server 5500
```

Abra `http://127.0.0.1:5500`.

## Executar a API Python local

Requer Python 3.11+:

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Em outra janela, execute o frontend na porta 5500. Na aba Motor Python, conecte `http://127.0.0.1:8000`. No Windows, os atalhos `.bat` em `scripts/windows/` iniciam os dois processos.

## Conteúdo e limites importantes

- As 22 trilhas são um mapa de tópicos e pré-requisitos, não 22 cursos completos.
- O banco de desafios original é executado pelo JavaScript e preserva o modo sem backend.
- O Python gera e valida onze famílias específicas de exercícios determinísticos. Ele não finge oferecer geradores para todos os tópicos.
- O diagnóstico é exploratório e curto, não é teste de QI nem avaliação psicométrica.
- Não há provedor de IA conectado. Não há correção generativa simulada.
- A API local é single-user e não possui autenticação. Não publique o backend diretamente na internet.
- A integração completa de xadrez com motor Stockfish, partidas online e as 22 trilhas em formato de cursos/aulas ainda não foram implementadas nesta fase.

## Biblioteca OBMEP

`assets/obmep/pdfs/` contém os 14 PDFs enviados (missões 1–8 e 10–15); a missão 9 não foi fornecida. O catálogo indexa 56 páginas de questões. O texto extraído serve para busca; confira o PDF original quando houver diagramas, símbolos ou extração textual incompleta. Antes de tornar os PDFs públicos, verifique os direitos de redistribuição.

## Testes

```bash
node tools/run-tests.cjs
node tools/export-question-bank.cjs /tmp/mind-forge-bank.json
python tools/audit_questions.py /tmp/mind-forge-bank.json --strict
cd backend
python -m pip install -r requirements-dev.txt
PYTHONPATH=. python -m pytest
```

## Estrutura

- `index.html`, `styles/`, `scripts/`: frontend existente, ampliado sem substituir seus laboratórios.
- `data/curriculum/tracks.json`: mapa curricular.
- `assets/obmep/`: arquivos e catálogo OBMEP do usuário.
- `backend/app/`: API FastAPI, geradores, estimativas heurísticas, revisão, recomendações e SQLite.
- `backend/tests/`: testes API.
- `tools/`: auditoria e testes do frontend.
- `.github/workflows/quality-check.yml`: automação de qualidade no push e pull request.

Consulte `docs/architecture.md`, `docs/pedagogy.md`, `docs/deployment.md` e `docs/roadmap.md`.
