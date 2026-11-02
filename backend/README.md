# MIND FORGE PYTHON CORE — API local

Backend FastAPI + SQLite, executado localmente. Esta entrega não fornece autenticação multiusuário nem é segura para exposição pública direta.

## Requisitos

- Python 3.11 ou superior.
- Acesso local à pasta do projeto.

## Iniciar no Windows

Execute `scripts/windows/start-backend.bat` com o terminal aberto na raiz do projeto. O script cria `backend/.venv`, instala as dependências e inicia a API em `http://127.0.0.1:8000`.

Para iniciar o frontend, em outra janela execute `scripts/windows/start-frontend.bat`. Abra `http://127.0.0.1:5500`.

## Iniciar manualmente

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Documentação interativa: `http://127.0.0.1:8000/docs`.

`backend/.env.example` é um modelo de variáveis; o projeto não carrega arquivos `.env` automaticamente. Para personalizar caminhos e origens CORS, defina `MFO_DATABASE_PATH` e `MFO_CORS_ORIGINS` no ambiente antes de iniciar o processo.

## Testes

```bash
cd backend
python -m pip install -r requirements-dev.txt
python -m pytest
```

## O que está realmente implementado

- API de saúde, currículo, geração determinística de onze famílias de exercício, pistas, validação e correção.
- Registro de tentativas originadas no frontend.
- Estimativas heurísticas de evidência de domínio, histórico SQLite e revisão espaçada.
- Recomendações por evidência e revisão pendente.
- Diagnóstico exploratório de amostra curta.
- Preferências simples de perfil.
- Status de integração de IA explicitamente desativado.

## Limitações e segurança

- O serviço usa SQLite local e pressupõe uma única instalação/usuário local.
- Não há login, autenticação, autorização por usuário, sincronização entre dispositivos ou mecanismo de recuperação de conta.
- Não exponha a API publicamente. Para hospedagem remota, primeiro implemente autenticação, autorização, limites de requisição, proteção CSRF quando aplicável, gestão de segredos, backups, política de privacidade e testes de segurança.
- GitHub Pages publica somente o frontend estático. Hospede o backend separadamente caso queira conectá-lo a um site público.
- Nenhum provedor de IA está conectado. A presença de campo de configuração não significa que uma IA esteja operando.
