# Arquitetura Mind Forge Omega

## Experiência publicada no GitHub Pages

A página inicial publicada é uma aplicação estática e independente. A entrada principal é `index.html`, que carrega:

- `question-bank.js`: banco de questões integrado à experiência principal;
- `english-forge.js` e `english-forge.css`: trilha de inglês A1–C2;
- `logic-forge.js` e `logic-forge.css`: quarto pilar de lógica e programação;
- `service-worker.js` e `manifest.webmanifest`: instalação PWA e cache do app shell.

O progresso dos módulos estáticos permanece no armazenamento do navegador. O painel principal migra `mindforge.v3` para `mfo:main:v4` sem apagar a cópia antiga; English Forge migra para `mfo:english:v2`; Logic Forge usa `mfo:logic-forge:v1`. Não há sincronização automática entre aparelhos. Um backup versionado reúne os três módulos e as preferências visuais.

## Núcleo modular adicional

O diretório `scripts/` contém outra arquitetura, com registro de módulos, questões, revisão, adaptação e experiências adicionais. Esses arquivos **não são todos importados pela página estática raiz**. O `scripts/app.js` representa uma experiência modular separada/alternativa; não deve ser descrito como se todos os seus laboratórios já estivessem integrados ao site publicado.

## Python Core

O backend FastAPI em `backend/app` funciona localmente com SQLite. Ele valida payloads com Pydantic e oferece endpoints para currículo, geração e correção de exercícios, tentativas, revisões, recomendações e diagnóstico heurístico.

- Não possui autenticação multiusuário.
- Não deve ser publicado diretamente na internet.
- Não sincroniza o progresso do site estático por padrão.
- A estimativa de domínio é heurística, não diagnóstico, QI nem avaliação psicométrica.

## Tutor IA opcional

O `worker/src/index.js` é um proxy separado para a Responses API. A chave fica como segredo do Worker, não no JavaScript público. O Tutor integrado só funciona quando o administrador configura o Worker e a pessoa fornece sua URL na interface. O Python Core não tem provedor de IA próprio.

O Worker restringe a origem por CORS, mas CORS não é autenticação. O binding `TUTOR_RATE_LIMITER` é obrigatório e está declarado em `worker/wrangler.toml`; o Worker falha de forma segura quando ele não está configurado ou fica indisponível. O limite nativo é aproximado por localização Cloudflare e por IP, não substitui um teto global do provedor. Mensagens enviadas ao Tutor deixam o aparelho e devem ser tratadas como conteúdo externo.

## Limites conhecidos

- A PWA armazena o app shell após a primeira visita online; serviços externos, voz e Tutor não se tornam offline.
- O executor de código Python/JavaScript dos estudantes ainda não está disponível na página publicada. Logic Forge ensina raciocínio e leitura de exemplos sem executar código arbitrário.
- A revisão de Logic Forge usa intervalos simples de 1, 3, 7, 14 e 30 dias. Não é FSRS nem SM-2 validado.
- As preferências visuais incluem Forja, Luz, Alto contraste, Explorador, Calmo e modo automático, além de redução de movimento. A acessibilidade automatizada verifica estrutura básica; não certifica WCAG 2.2 AA nem substitui leitor de tela, testes de teclado e avaliação humana.

## Implantação futura

Para sincronização ou backend público, exigir autenticação, autorização, isolamento por usuário, proteção de segredos, limitação de requisições, política de retenção, backups e revisão de segurança. Manter o frontend estático como experiência de fallback.
