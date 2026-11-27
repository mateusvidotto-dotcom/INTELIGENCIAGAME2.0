# MIND FORGE OMEGA ∞ — v2.5 · Quatro pilares de aprendizagem

Plataforma pessoal de aprendizagem e treinamento intelectual. Preserva o conteúdo e os laboratórios existentes; oferece quatro pilares conectados: inglês, preparação acadêmica, matemática olímpica e lógica/programação. O objetivo é domínio progressivo, não competição.

## English Forge — curso completo conectado ao site

A página principal carrega o módulo independente `english-forge.js` e os estilos em `english-forge.css`. O curso oferece seis níveis CEFR, 18 unidades, 71 questões com explicação de cada alternativa, 72 cartões de vocabulário com revisão espaçada local, seis tarefas de listening, seis de speaking e seis de writing. Inclui apoio opcional em português nas aulas, uma rotina diária de 30 minutos e cadernos de erros e rascunhos locais. Consulte `ENGLISH_FORGE_GUIDE.md` para o método de estudo e as limitações de áudio/fala.

## Logic Forge — lógica e programação do zero ao avançado

O quarto pilar é um curso autoral com **6 níveis, 20 unidades e 40 exercícios**. Vai do pensamento computacional sem computador até estruturas de dados, algoritmos, engenharia de software, matemática discreta, grafos e minimax aplicado ao xadrez. Cada exercício apresenta pistas graduais, resolução passo a passo, análise de alternativas e uma armadilha comum. Inclui mini-projetos, revisão local e backup independente.

Esta primeira versão ensina leitura e rastreamento de exemplos: **não executa código escrito pelo estudante**. Um editor Python/JavaScript só deve ser incorporado com isolamento, limites de execução e testes de segurança. A revisão do Logic Forge usa intervalos simples e transparentes; não é FSRS nem uma medida científica de retenção.

## Núcleos de aprendizagem

- **Logic Forge — níveis 0–5:** pensamento computacional, pseudocódigo, Python, JavaScript, estruturas de dados, algoritmos e engenharia de software.
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

## Instalação e modo offline

O frontend pode ser instalado como aplicativo em navegadores compatíveis. O service worker guarda a estrutura principal e os módulos essenciais após a primeira visita online; áudio sintetizado, Tutor IA e recursos externos ainda dependem de seus respectivos serviços. Atualizações do site podem levar alguns instantes para substituir o cache. O progresso continua local ao navegador.

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
- O Python Core gera e valida onze famílias específicas de exercícios determinísticos e não possui provedor de IA próprio. O Tutor IA é uma integração opcional separada via Cloudflare Worker, descrita em `AI_SETUP.md`.
- O diagnóstico é exploratório, não é teste de QI nem avaliação psicométrica.
- A API local é single-user e não possui autenticação. Não publique o backend diretamente na internet.

## Testes

A integração contínua em `.github/workflows/quality.yml` executa checagem de sintaxe, auditoria do HTML, testes do Logic Forge e Tutor Worker, testes dos módulos existentes, auditoria do banco e pytest do backend. O teste automatizado não substitui teste visual real, leitor de tela ou revisão editorial humana.

\`\`\`bash
node tools/run-tests.cjs
node tools/export-question-bank.cjs /tmp/mind-forge-bank.json
python tools/audit_questions.py /tmp/mind-forge-bank.json --strict
cd backend
python -m pip install -r requirements-dev.txt
PYTHONPATH=. python -m pytest
\`\`\`

## Estrutura

- `logic-forge.js`, `logic-forge.css`: quarto pilar, com curso local de lógica e programação.
- `manifest.webmanifest`, `service-worker.js`, `icons/`: instalação e cache offline do app shell.

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


## Segurança e acessibilidade — v2.3

O controlador principal fica em `scripts/site.js`, fora do HTML. A página usa CSP por meta com `script-src 'self'`, sem `eval` e sem scripts inline. O Tutor integrado aceita URLs HTTPS no domínio padrão `*.workers.dev`. A navegação utiliza ícones SVG com texto visível, os cartões dos quatro pilares são botões acessíveis por teclado e a home apresenta conteúdo inicial antes da execução do JavaScript. A auditoria automática foi ampliada para verificar essas garantias.

A CSP por meta é uma proteção parcial: GitHub Pages não permite configurar todos os cabeçalhos HTTP. Consulte `SECURITY.md` e `docs/deployment.md` para os limites conhecidos.


## Questões contextualizadas e Português — v2.4

A aplicação pública carrega `portuguese-forge.js` depois de `question-bank.js` e antes de `scripts/site.js`. O componente `scripts/core/question-context.js` associa cada questão à unidade de origem e apresenta o estímulo antes do enunciado. Ele suporta texto-base, fórmula, tabela, gráfico de barras/linha e imagem local. Simulados mistos mantêm a origem de cada item; revisão reabre a questão errada com seu estímulo.

Questões que dependem de texto, gráfico, tabela, dados, experimento ou modelo e não possuem estímulo são bloqueadas. A CI audita o banco público e testa especificamente mobilidade urbana, crescimento populacional e materiais multimodais.

Português recebeu sete unidades autorais adicionais, com 22 questões: inferência/pressupostos, tese/evidência/contra-argumentação, falácias/causalidade, coesão/referenciação, gêneros/ironia, leitura multimodal e produção textual. O material multimodal usa números simulados, identificados como tais.


## Continuidade, Tutor e música — v2.5

A PWA armazena a nova versão sem substituir o service worker que controla uma sessão ativa. Quando a versão nova termina de instalar, o site mostra um aviso discreto; o recarregamento só acontece após o estudante escolher **Atualizar agora**. A atualização pode ser dispensada e a sessão atual continua ativa.

Ao pedir aprofundamento ao Tutor, a interface inclui a área, a unidade, o objetivo, a habilidade, a dificuldade e o estímulo real (texto-base, tabela, gráfico ou modelo) da questão selecionada. O aviso de privacidade permanece: o conteúdo enviado sai do navegador e segue ao serviço de IA configurado.

A música ambiente continua sendo sintetizada localmente pelo navegador e depende de ativação explícita. Agora há controle de volume com persistência local e estado acessível no botão de música.

O painel de desempenho também apresenta tentativas por disciplina e habilidade, além de temas com erros registrados. Os percentuais por grupo só aparecem a partir de cinco tentativas e são descritos como indicadores de atividade, não como diagnóstico de domínio.
