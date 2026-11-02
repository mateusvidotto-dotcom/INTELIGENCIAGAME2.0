# MIND FORGE OMEGA ∞ — v1.3.1

Plataforma de treinamento intelectual com 12 laboratórios, mapa curricular de 22 trilhas, banco ampliado de matemática e Python Core opcional para desenvolvimento local. O projeto não depende de imagens ou documentos externos para executar os exercícios.

## Executar o frontend

Na raiz do projeto:

```bash
python -m http.server 5500
```

Abra `http://127.0.0.1:5500`. O frontend permanece utilizável sem a API Python.

## Executar a API Python local

Requer Python 3.11 ou superior:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Em outra janela, execute o frontend na porta 5500. Na seção Motor Python, conecte `http://127.0.0.1:8000`. No Windows, os atalhos `.bat` em `scripts/windows/` iniciam os dois processos.

## Conteúdo e limites

- O banco matemático recebeu 12 desafios integrados em texto: cinco são reescritas/adaptações didáticas de problemas fornecidos pelo usuário, preservando seus dados e a estrutura essencial; sete são desafios autorais complementares. Todos possuem respostas ou critérios de avaliação, pistas graduais e justificativas.
- Questões objetivas selecionadas explicam também por que cada alternativa está certa ou errada; as explicações permanecem alinhadas quando as alternativas são embaralhadas.
- As 22 trilhas representam um mapa de tópicos e pré-requisitos, não 22 cursos completos.
- O Python gera e valida onze famílias específicas de exercícios determinísticos.
- O diagnóstico é exploratório, não é teste de QI nem avaliação psicométrica.
- Não há provedor de IA conectado nem correção generativa simulada.
- A API local é single-user e não possui autenticação. Não publique o backend diretamente na internet.
- A integração completa de xadrez com motor dedicado, partidas online e cursos completos para todas as trilhas continuam fora do escopo desta versão.

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

- `index.html`, `styles/`, `scripts/`: frontend e laboratórios.
- `scripts/modules/advanced-math-bank.js`: desafios autorais adicionais.
- `data/curriculum/tracks.json`: mapa curricular.
- `backend/app/`: API FastAPI, geradores, modelos heurísticos, revisão, recomendações e SQLite.
- `backend/tests/`: testes da API.
- `tools/`: auditoria e testes do frontend.
- `.github/workflows/quality-check.yml`: automação de qualidade em push e pull request.

Consulte `docs/architecture.md`, `docs/pedagogy.md`, `docs/deployment.md` e `docs/roadmap.md`.
