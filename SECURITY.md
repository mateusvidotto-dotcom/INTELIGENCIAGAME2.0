# Política de segurança

## Segredos

Nunca adicione chaves de API, tokens ou credenciais a HTML, JavaScript servido ao navegador, arquivos de configuração públicos, issues ou backups. O Tutor integrado usa um segredo armazenado no Cloudflare Worker.

## Código do estudante

Não execute código fornecido pelo estudante no contexto principal da página. Um executor futuro deve usar Worker ou iframe sandbox com isolamento de origem, limites de tempo, memória e saída, e sem acesso a cookies, armazenamento da aplicação ou rede.

## Relato de vulnerabilidades

Não publique detalhes exploráveis em uma issue pública. Use os recursos privados de reporte de vulnerabilidades do GitHub para este repositório. Inclua passos mínimos de reprodução e evite dados pessoais.

## Operação

- Não publique o backend FastAPI local sem autenticação e isolamento por usuário.
- O binding `TUTOR_RATE_LIMITER` é obrigatório e já está declarado em `worker/wrangler.toml`. Ele é aproximado por região e chave IP, não constitui teto global de custo; configure também limite financeiro no provedor. Sem o binding, o Worker bloqueia chamadas pagas.
- Mantenha dependências e Actions atualizadas.
- Verifique os logs/alertas do provedor sem adicionar telemetria de estudantes.
