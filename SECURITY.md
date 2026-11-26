# Política de segurança

## Segredos

Nunca adicione chaves de API, tokens ou credenciais a HTML, JavaScript servido ao navegador, arquivos de configuração públicos, issues ou backups. O Tutor integrado usa um segredo armazenado no Cloudflare Worker.

## Código do estudante

Não execute código fornecido pelo estudante no contexto principal da página. Um executor futuro deve usar Worker ou iframe sandbox com isolamento de origem, limites de tempo, memória e saída, e sem acesso a cookies, armazenamento da aplicação ou rede.

## Relato de vulnerabilidades

Não publique detalhes exploráveis em uma issue pública. Use os recursos privados de reporte de vulnerabilidades do GitHub para este repositório. Inclua passos mínimos de reprodução e evite dados pessoais.

## Operação

- Não publique o backend FastAPI local sem autenticação e isolamento por usuário.
- Configure rate limiting e limites de custo no Tutor antes de divulgar o endpoint amplamente.
- Mantenha dependências e Actions atualizadas.
- Verifique os logs/alertas do provedor sem adicionar telemetria de estudantes.
