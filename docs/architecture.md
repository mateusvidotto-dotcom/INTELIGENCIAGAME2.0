# Arquitetura MIND FORGE OMEGA v1.3.1

## Separação de execução

- **Frontend estático**: HTML, CSS e JavaScript servidos por GitHub Pages ou servidor estático. Todos os laboratórios existentes permanecem disponíveis sem backend.
- **Python Core**: FastAPI local em `backend/app`, com SQLite. O frontend usa a API quando o usuário configura e testa uma URL.
- **Dados curriculares**: JSON versionado em `data/curriculum/tracks.json`, usado no frontend e exposto pelo endpoint `/api/v1/curriculum`.
- **Banco matemático autoral**: desafios estruturados em `scripts/modules/advanced-math-bank.js`, anexados ao laboratório de matemática já existente.

## Fluxo de exercícios

1. O navegador seleciona uma questão do banco integrado.
2. O motor de sessão instancia e, quando aplicável, embaralha as alternativas.
3. Explicações individuais das alternativas são embaralhadas em conjunto com suas alternativas correspondentes.
4. Depois da tentativa, o feedback exibe a explicação principal e as justificativas específicas, quando disponíveis.
5. Tentativas, XP e revisões são registrados pelo estado local; o Python Core pode receber a tentativa quando a API está configurada.

## Fluxo Python

1. O frontend envia requisições ao Python Core.
2. FastAPI valida os payloads com Pydantic.
3. Geradores determinísticos criam exercícios somente para as competências implementadas.
4. O endpoint de geração oculta resposta e solução antes de enviar o exercício ao navegador.
5. A tentativa é validada e registrada em SQLite.
6. Motores heurísticos calculam evidências, revisões e recomendações.

## Limites conhecidos

- Não existe provedor de IA conectado.
- O banco local não sincroniza entre dispositivos.
- A API não tem autenticação multiusuário; não deve ser publicada diretamente na internet.
- A estimativa de domínio é heurística, não diagnóstico, QI ou medida psicométrica.
- O mapa curricular descreve tópicos e pré-requisitos, não cursos completos já redigidos.

## Implantação futura

GitHub Pages executa apenas o frontend estático. Em produção, mantenha frontend e backend separados, com origem CORS explícita, autenticação, autorização, limites de requisição, gestão de segredos, backups, política de privacidade e revisão de segurança.
