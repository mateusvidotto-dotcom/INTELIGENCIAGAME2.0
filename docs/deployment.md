# Desenvolvimento e publicação

## Frontend independente

Envie o conteúdo do repositório ao GitHub e habilite Pages para publicar a raiz. O frontend continua funcionando com os sistemas locais em JavaScript. Os dados ficam no navegador.

## Python Core local

Use `scripts/windows/start-backend.bat` e `scripts/windows/start-frontend.bat` no Windows; ou `scripts/start-backend.sh` e `scripts/start-frontend.sh` em macOS/Linux. Frontend em `http://127.0.0.1:5500` e API em `http://127.0.0.1:8000`.

Na tela Motor Python, salve `http://127.0.0.1:8000` e teste a conexão.

## API pública

Não exponha a instância local. Antes de publicar o backend, adicione autenticação, autorização e isolamento por usuário, limitação de requisições, política de retenção, backups e gestão de segredos. Configure `MFO_CORS_ORIGINS` apenas com a origem exata do frontend implantado.

## GitHub Actions

O workflow executa checagem de sintaxe JS, auditoria do banco de questões, testes JS e testes pytest do backend. Ele não hospeda nem inicia o backend de produção.
