# Ativar o Tutor IA do Mind Forge

O site GitHub Pages é estático. Para usar uma IA de verdade sem publicar uma chave secreta no navegador, o repositório inclui um Cloudflare Worker que atua como intermediário seguro.

## O que já está no repositório

- Interface do Tutor Mind Forge dentro do site.
- Worker que encaminha a pergunta para a OpenAI Responses API.
- Chave da API lida exclusivamente de um segredo do Worker.
- Requisições com `store: false` e histórico curto mantido pelo navegador durante a sessão.
- CORS limitado à origem do site GitHub Pages.

## Implantação

É necessária uma conta Cloudflare e uma chave de API da OpenAI. A API pode gerar custos separados da assinatura do ChatGPT; defina limites de uso e acompanhe os gastos antes de disponibilizar publicamente.

1. Instale Node.js e, no terminal, entre na pasta `worker`.
2. Instale/execute o Wrangler: `npx wrangler login`.
3. Configure a chave como segredo (não como variável pública):
   `npx wrangler secret put OPENAI_API_KEY`
4. Publique:
   `npx wrangler deploy`
5. Copie a URL `workers.dev` exibida pelo Wrangler, acrescentando `/api/tutor`.
6. Abra o site, entre em **Tutor IA → Conectar a IA**, cole a URL e salve.
7. Use **Testar conexão**. O teste consulta `/health`.

O arquivo `wrangler.toml` define a origem permitida e o modelo padrão. Caso o modelo padrão não esteja habilitado na sua conta, altere `OPENAI_MODEL` para um modelo disponível no seu projeto e publique novamente.

## Proteção e privacidade

- **Nunca** coloque `OPENAI_API_KEY` no `index.html`, em arquivos `.js` públicos, no GitHub ou no campo de URL do site.
- Não envie senhas, dados pessoais ou material sensível ao tutor.
- O Worker não armazena conversas. A chamada à API usa `store: false`; isso desativa o armazenamento da resposta pela Responses API, mas não significa que a solicitação nunca seja processada ou retida por qualquer sistema.
- A URL do Worker é pública. Antes de divulgar amplamente, configure regras de rate limiting no Cloudflare para limitar requisições por IP, acompanhe o uso da API e estabeleça limites de gastos no provedor.
- CORS reduz chamadas feitas por páginas de outras origens, mas não é autenticação e não impede chamadas diretas automatizadas.

## Música ambiente

A música do site é sintetizada localmente pelo navegador com Web Audio API. Ela só começa depois do clique em **Ativar música**, respeitando o bloqueio de reprodução automática dos navegadores. O mesmo botão desliga a música.
