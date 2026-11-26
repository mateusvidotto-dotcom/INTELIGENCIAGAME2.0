# MIND FORGE OMEGA ∞ — v2.1 · Núcleo acadêmico expandido

Plataforma pessoal de aprendizagem e treinamento intelectual. Preserva os laboratórios originais, a Expedição Omega, a revisão inteligente, os relatórios e o Python Core; amplia as trilhas prioritárias de inglês, vestibulares e matemática olímpica.

## English Forge — curso completo conectado ao site

A página principal carrega o módulo independente `english-forge.js` e os estilos em `english-forge.css`. O curso oferece seis níveis CEFR, 18 unidades, 71 questões com explicação de cada alternativa, 72 cartões de vocabulário com revisão espaçada local, seis tarefas de listening, seis de speaking e seis de writing. Inclui apoio opcional em português nas aulas, uma rotina diária de 30 minutos e cadernos de erros e rascunhos locais. Consulte `ENGLISH_FORGE_GUIDE.md` para o método de estudo e as limitações de áudio/fala.

## Núcleos de aprendizagem

- **English Forge — CEFR A1–C2:** progressão organizada pelos seis níveis do Quadro Europeu Comum de Referência, com unidades autorais de gramática em contexto, vocabulário, leitura, compreensão auditiva e produção oral. Há seis atividades de listening e seis de speaking, uma por nível.
- **Listening:** reprodução de textos por síntese de voz do navegador, opção de velocidade reduzida, transcrição inicialmente oculta e questão de compreensão. A voz é sintetizada pelo dispositivo; não é áudio gravado por falantes nativos.
- **Speaking:** desafios comunicativos com objetivo, modelo e rubrica; gravação local pelo microfone, reprodução e download do áudio quando o navegador suporta MediaRecorder. Reconhecimento automático de fala é opcional e depende do navegador. O áudio não é enviado a servidor e não há avaliação automática de pronúncia.
- **Vestibular Forge — PAS/UEM:** programa resumido da Etapa 2 do PAS/UEM 2026, organizado por área e disciplina, com checklist de conteúdo, links para programa e manual oficiais, gêneros de redação e mini-simulador de somatória com pontuação demonstrativa.
- **Olympiad Forge — OBMEP Nível 3:** 20 problemas objetivos autorais de cinco alternativas para treino inspirado na 1ª fase e seis atividades discursivas autorais com rubrica e solução-modelo para treino da 2ª fase. O simulado registra resultado local.
- **Progresso e backup:** conclusão das aulas, atividades de listening/speaking, tópicos do programa PAS e tentativas de simulados ficam no navegador; o backup JSON incorpora os dados do centro expandido.

## Edições e fontes oficiais

O programa PAS/UEM incluído é especificamente o da **Etapa 2 de 2026**, cuja prova ocorreu em 1º de novembro de 2026. É uma edição de referência já aplicada, não um edital futuro. O programa de uma nova edição deve ser comparado com a publicação oficial antes de atualizar o curso.

- Programa PAS/UEM 2026: https://www.vestibular.uem.br/provas/prog/progpas26.pdf
- Manual do candidato PAS/UEM 2026: https://www.vestibular.uem.br/manuais/manual_candidato_64.pdf
- Página oficial da edição: https://www.vestibular.uem.br/evento_64.html
- Provas e soluções históricas OBMEP: https://www.obmep.org.br/provas.htm
- CEFR — Council of Europe: https://www.coe.int/en/web/common-european-framework-reference-languages

Os problemas do banco interno são autorais e não são apresentados como questões oficiais. O simulador OBMEP reproduz a estrutura geral de 20 questões objetivas e cinco alternativas na primeira fase; as seis tarefas discursivas são material de treino, não correção oficial.

## Atividades de fala: suporte e privacidade

A gravação requer permissão de microfone e navegador compatível, normalmente em HTTPS ou localhost. O reconhecimento de voz pode não existir em todos os navegadores. Se indisponível, o estudante pode digitar a própria transcrição. A gravação é mantida apenas na sessão, podendo ser reproduzida ou baixada pelo estudante; não é armazenada no servidor. A conclusão registrada guarda apenas o status e o número de critérios de autoavaliação, não a gravação.

## Executar o frontend

Na raiz do projeto:

\`\`\`bash
python -m http.server 5500
\`\`\`

Abra \`http://127.0.0.1:5500\`. O frontend funciona sem a API Python.

## Executar a API Python local

Requer Python 3.11 ou superior:

\`\`\`bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
\`\`\`

Em outra janela, execute o frontend na porta 5500. Na seção Ferramentas avançadas → Motor Python, conecte \`http://127.0.0.1:8000\`.

## Limites e transparência

- A progressão CEFR organiza conteúdo de A1 a C2, mas não certifica proficiência nem substitui exame independente das quatro habilidades. O volume de unidades continua sendo uma trilha didática em expansão, não um curso equivalente em carga horária a uma escola de idiomas.
- A escuta usa síntese de voz do navegador; não há ainda biblioteca de gravações humanas por sotaque, fala com interlocutor real ou avaliação fonética automatizada.
- O programa PAS/UEM incorporado é da edição 2026 Etapa 2; futuras edições precisam de auditoria e atualização manual. Não se deve presumir que o edital futuro seja idêntico.
- O mini-simulador PAS usa cinco itens autorais para demonstrar a mecânica; não é prova completa de 40 questões nem substitui a redação.
- O banco OBMEP inclui 20 questões objetivas e seis discursivas autorais. Não substitui o acervo oficial de provas e soluções ou a correção humana de demonstrações.
- O progresso é local e não sincroniza entre dispositivos.
- O mapa curricular original das 22 trilhas continua sendo planejamento, não 22 cursos completos.
- O Python Core gera e valida onze famílias específicas de exercícios determinísticos. Não existe provedor de IA conectado.
- O diagnóstico é exploratório, não é teste de QI nem avaliação psicométrica.
- A API local é single-user e não possui autenticação. Não publique o backend diretamente na internet.

## Testes

\`\`\`bash
node tools/run-tests.cjs
node tools/export-question-bank.cjs /tmp/mind-forge-bank.json
python tools/audit_questions.py /tmp/mind-forge-bank.json --strict
cd backend
python -m pip install -r requirements-dev.txt
PYTHONPATH=. python -m pytest
\`\`\`

## Estrutura

- \`index.html\`, \`styles/\`, \`scripts/\`: frontend e laboratórios.
- \`scripts/modules/study-center.js\`: núcleo de trilhas e interação.
- \`scripts/data/study-programs.js\`: fontes curriculares versionadas e descritores CEFR.
- \`scripts/modules/study-expansion.js\`: expansão CEFR, áudio, speaking, PAS/UEM e banco OBMEP.
- \`styles/study-center.css\`, \`styles/study-expansion.css\`: interface responsiva.
- \`data/curriculum/tracks.json\`: mapa curricular original de 22 trilhas.
- \`scripts/modules/advanced-math-bank.js\`: banco matemático complementar.
- \`backend/app/\`: API FastAPI, geradores, revisão, recomendações e SQLite.
- \`tools/\`: testes e auditoria de questões.

Consulte \`docs/architecture.md\`, \`docs/pedagogy.md\`, \`docs/deployment.md\` e \`docs/roadmap.md\`.
