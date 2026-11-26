# Ativar o Tutor IA do Mind Forge

O site GitHub Pages é estático. Para usar uma IA de verdade sem publicar uma chave secreta no navegador, o repositório inclui um Cloudflare Worker que atua como intermediário seguro.

## O que já está no repositório

- Interface do Tutor Mind Forge dentro do site.
- Worker que encaminha a pergunta para a OpenAI Responses API.
- Chave da API lida exclusivamente de um segredo do Worker.
- Requisições com `store: false` e histórico curto mantido pelo navegador durante a sessão.
- CORS limitado à origem do site GitHub Pages.
- Rate Limiting obrigatório: sem o binding `TUTOR_RATE_LIMITER`, o Worker bloqueia as chamadas antes de encaminhar requisições pagas.

## Implantação

É necessária uma conta Cloudflare e uma chave de API da OpenAI. A API pode gerar custos separados da assinatura do ChatGPT; defina limites de uso e acompanhe os gastos antes de disponibilizar publicamente.

1. Instale Node.js e, no terminal, entre na pasta `worker`.
2. Instale/execute o Wrangler: `npx wrangler login`.
3. Configure a chave como segredo (não como variável pública):
   `npx wrangler secret put OPENAI_API_KEY`
4. Publique:
   `npx wrangler deploy`
5. Copie a URL `workers.dev` exibida pelo Wrangler, acrescentando `/api/tutor`.
6. A configuração já está em `worker/wrangler.toml`. Antes de publicar, confira se `namespace_id = "202611260853"` é único na sua conta Cloudflare; se já for usado, troque por outro inteiro positivo. Publique o Worker a partir da pasta `worker`. O limite inicial é 20 chamadas por minuto por IP e por localização Cloudflare. Sem o binding, ou se ele ficar indisponível, o Worker retorna HTTP 503 sem chamar a API paga.
7. Abra o site, entre em **Tutor IA → Conectar a IA**, cole a URL e salve.
8. Use **Testar conexão**. O teste consulta `/health`.

O arquivo `wrangler.toml` define a origem permitida e o modelo padrão. Caso o modelo padrão não esteja habilitado na sua conta, altere `OPENAI_MODEL` para um modelo disponível no seu projeto e publique novamente.

## Proteção e privacidade

- Ao enviar uma pergunta ao Tutor integrado, o texto e o histórico recente saem do aparelho e são enviados ao Cloudflare Worker e ao provedor de IA. Não inclua nome completo, endereço, telefone, escola, senhas ou outros dados pessoais.
- A interface deve mostrar este aviso antes do envio e lembrar que respostas de IA podem conter erros; confira o conteúdo em materiais confiáveis.

- **Nunca** coloque `OPENAI_API_KEY` no `index.html`, em arquivos `.js` públicos, no GitHub ou no campo de URL do site.
- Não envie senhas, dados pessoais ou material sensível ao tutor.
- O Worker não grava conversas em banco próprio. A chamada usa `store: false`, que desativa o armazenamento da resposta pela Responses API; isso não é uma promessa de que nenhum sistema do provedor processe ou retenha qualquer dado. Consulte a política vigente do provedor.
- A URL do Worker é pública. CORS não autentica chamadas nem impede clientes automatizados. O binding `TUTOR_RATE_LIMITER` é obrigatório. O limite nativo é aproximado e separado por localização Cloudflare; não é um teto global de gastos. O IP pode ser compartilhado por pessoas na mesma escola, casa ou rede móvel. Configure também um limite de gastos no provedor da API. Para um teto estrito global, será necessário um contador central, por exemplo com Durable Objects.
- CORS reduz chamadas feitas por páginas de outras origens, mas não é autenticação e não impede chamadas diretas automatizadas.

## Música ambiente

A música do site é sintetizada localmente pelo navegador com Web Audio API. Ela só começa depois do clique em **Ativar música**, respeitando o bloqueio de reprodução automática dos navegadores. O mesmo botão desliga a música.
