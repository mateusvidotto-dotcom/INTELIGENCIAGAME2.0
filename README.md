# MIND FORGE OMEGA ∞ — v2.0 · Núcleo de estudos

Plataforma pessoal de aprendizagem e treinamento intelectual. Preserva os laboratórios originais, a Expedição Omega, a revisão inteligente, os relatórios e o Python Core; acrescenta três percursos prioritários: inglês, preparação acadêmica e matemática olímpica.

## O que há nesta versão

- **English Forge:** cinco aulas iniciais A1 com estrutura de frases, verbo to be, Present Simple, artigos e leitura. Inclui vocabulário contextual e leitura em voz alta quando o navegador oferece síntese de fala.
- **Vestibular Forge:** cinco aulas autorais de fundamentos em matemática, física, química e interpretação. O conteúdo é um núcleo inicial e precisa ser associado ao programa oficial da edição escolhida.
- **Olympiad Forge:** cinco aulas sobre paridade, princípio da casa dos pombos, divisibilidade, contagem e demonstração discursiva. As atividades são autorais e não são identificadas como provas oficiais.
- **Progresso das trilhas:** conclusão de aulas salva localmente no navegador.
- **Mapa curricular:** as 22 trilhas originais continuam disponíveis em uma seção secundária.
- **Laboratórios cognitivos:** os módulos de lógica, atenção, memória, criatividade, matemática, ciências, pensamento crítico, Bíblia, estratégia e metacognição continuam preservados.
- **Expedição Omega, revisão, evolução, backup e Python Core:** mantidos como recursos complementares.

## Executar o frontend

Na raiz do projeto:

```bash
python -m http.server 5500
```

Abra `http://127.0.0.1:5500`. O frontend funciona sem a API Python.

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

Em outra janela, execute o frontend na porta 5500. Na seção Ferramentas avançadas → Motor Python, conecte `http://127.0.0.1:8000`.

## Limites e transparência do conteúdo

- As três trilhas prioritárias são um núcleo inicial, não cursos completos de A1–C2 ou cobertura integral de todos os vestibulares e olimpíadas.
- O inglês ainda precisa de expansão de listening, speaking com gravação e níveis A2–C2.
- O Vestibular Forge precisa de seleção de instituição/edição, vinculação a programas oficiais e expansão de aulas e bancos de questões.
- O Olympiad Forge é uma introdução autoral; não substitui um banco amplo de provas oficiais e soluções autorizadas.
- O progresso do centro de estudos é armazenado no navegador e não sincroniza entre dispositivos.
- O mapa das 22 trilhas continua sendo planejamento de tópicos e pré-requisitos; não representa 22 cursos completos.
- O Python Core gera e valida onze famílias específicas de exercícios determinísticos. Não existe provedor de IA conectado.
- O diagnóstico é exploratório, não é teste de QI nem avaliação psicométrica.
- A API local é single-user e não possui autenticação. Não publique o backend diretamente na internet.

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
- `scripts/modules/study-center.js`: conteúdo e interação das três trilhas prioritárias.
- `styles/study-center.css`: identidade visual do centro de estudos.
- `data/curriculum/tracks.json`: mapa curricular original de 22 trilhas.
- `scripts/modules/advanced-math-bank.js`: banco matemático complementar.
- `backend/app/`: API FastAPI, geradores, revisão, recomendações e SQLite.
- `tools/`: testes e auditoria de questões.

Consulte `docs/architecture.md`, `docs/pedagogy.md`, `docs/deployment.md` e `docs/roadmap.md`.
