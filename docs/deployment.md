# Desenvolvimento, implantação e modo offline

## Frontend estático

Publique a raiz do repositório com GitHub Pages. O site usa caminhos relativos para continuar funcionando em um subdiretório, como `/INTELIGENCIAGAME2.0/`.

Para executar localmente:
```bash
python -m http.server 5500
```
Abra `http://127.0.0.1:5500`.

## PWA e cache offline

O usuário precisa visitar o site online pelo menos uma vez para que o service worker armazene o app shell. Depois, a página principal, o banco e os módulos locais podem continuar disponíveis sem rede. Tutor IA, reconhecimento de voz do navegador, downloads externos e outros serviços não são garantidos offline.

O cache tem versão explícita em `service-worker.js`. Ao publicar uma alteração nos recursos, aumente `CACHE_NAME` para substituir o shell anterior. O escopo do service worker é relativo à pasta publicada no GitHub Pages.

## Python Core local

Use `scripts/windows/start-backend.bat` e `scripts/windows/start-frontend.bat` no Windows; ou `scripts/start-backend.sh` e `scripts/start-frontend.sh` em macOS/Linux. API local em `http://127.0.0.1:8000`; frontend em `http://127.0.0.1:5500`.

O backend local é de usuário único e não tem autenticação multiusuário. Não o exponha diretamente à internet.

## Tutor IA opcional

Consulte `AI_SETUP.md`. A chave OpenAI deve ser configurada como segredo do Cloudflare Worker. Nunca a coloque no HTML, JavaScript público, localStorage, commit ou backup.

CORS aceita somente a origem configurada, mas isso não autentica o cliente. Para uso público, configure o binding Cloudflare Rate Limiting chamado `TUTOR_RATE_LIMITER`, monitore consumo e defina um teto de gastos. A política por IP pode limitar pessoas que compartilham uma rede. O Worker responde com erro de serviço se o binding estiver configurado e indisponível.

## Integração contínua

O workflow `.github/workflows/quality.yml` executa checagem de sintaxe JavaScript, auditoria estrutural de HTML e links locais, testes do Logic Forge, testes do núcleo modular, auditoria do banco de questões e testes do backend Python.

Esses testes não substituem inspeção visual em navegadores reais, testes com teclado e leitores de tela, avaliação de segurança do Worker ou revisão pedagógica humana.
