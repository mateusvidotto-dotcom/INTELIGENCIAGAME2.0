# Arquitetura MIND FORGE OMEGA v1.3.0

## Separação de execução

- **Frontend estático**: HTML, CSS e JavaScript servidos por GitHub Pages ou servidor estático. O modo já existente permanece disponível sem o backend.
- **Python Core**: FastAPI local em `backend/app`, com SQLite local. O frontend só o utiliza quando o usuário configura e testa uma URL.
- **Dados curriculares**: JSON versionado em `data/curriculum/tracks.json`, exposto localmente no frontend e disponibilizado pelo endpoint `/api/v1/curriculum`.
- **Biblioteca OBMEP**: PDFs originais fornecidos pelo usuário em `assets/obmep/pdfs`, acompanhados de catálogo JSON com extração textual indicativa. Quando há figuras, fórmulas ou extração duvidosa, o PDF é a fonte autoritativa.

## Fluxo Python

1. O frontend faz uma requisição ao Python Core.
2. FastAPI valida payloads com Pydantic.
3. Geradores determinísticos criam exercícios somente para as competências registradas em `SUPPORTED`.
4. O endpoint de geração remove resposta e solução antes de enviar o exercício ao navegador.
5. A tentativa é validada no servidor e registrada no SQLite.
6. Motores heurísticos calculam evidências, revisões e recomendações.

## Limites conhecidos

- O motor não utiliza IA generativa: não existe provedor configurado e `/api/v1/ai/status` informa isso explicitamente.
- O banco local não sincroniza entre dispositivos.
- A API local não tem autenticação multiusuário; não a publique diretamente na internet.
- A estimativa de domínio é heurística para orientar treino, não diagnóstico, QI ou medida psicométrica.
- O mapa curricular descreve tópicos e pré-requisitos; não representa cursos completos já escritos.

## Implantação futura

GitHub Pages não executa backend Python. Em produção, mantenha frontend e backend separados, com origem CORS explícita, autenticação, autorização, rate limiting, gestão de segredos, backups, política de privacidade e revisão de segurança. Não habilite CORS aberto com `*` para endpoints que guardem dados pessoais.
