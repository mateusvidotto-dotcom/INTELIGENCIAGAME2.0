# Changelog

## 2.2.0 — Logic Forge, acessibilidade estrutural e modo offline

- Adicionado Logic Forge como quarto pilar: 6 níveis, 20 unidades e 40 exercícios autorais, do pensamento computacional a minimax e poda alfa-beta.
- Exercícios com pistas, feedback por etapas, análise das alternativas, armadilhas comuns e projetos de transferência.
- Progresso e revisão locais, com backup versionado e indicação transparente de que o agendamento é heurístico.
- Navegação harmonizada, suporte a teclado e foco, anúncio de mudanças de tela, título por seção e link para pular ao conteúdo.
- Adicionados manifesto PWA, ícone SVG e cache do app shell para uso offline após a primeira visita online.
- Criada integração contínua para sintaxe JavaScript, auditoria do HTML e dos recursos, testes dos módulos e backend.
- Endurecido o Worker do Tutor com limite real do corpo, validação de JSON, timeout e Rate Limiting obrigatório (fail-closed).
- Atualizados os documentos de arquitetura, privacidade, implantação e autoria de conteúdo.

## 1.3.1 — Revisão de navegação e ampliação matemática

- Simplificada a página de trilhas, mantendo o mapa curricular como seção independente.
- Adicionados 12 desafios autorais de matemática e explicações por alternativa.
- Atualizados os scripts de teste, exportação e auditoria para incluir o banco matemático ampliado.


## 2.3.0 — Dados, segurança e conforto visual

- Migração não destrutiva do progresso principal e do English Forge para chaves namespaced.
- Backup único para painel principal, English Forge, Logic Forge e preferências visuais.
- Validação estrutural, limite de tamanho e rejeição de chaves perigosas antes de importar; compatibilidade com backups antigos.
- Temas Forja, Luz, Alto contraste, Explorador, Calmo e Automático; redução de movimento configurável.
- Histórico de navegação por hash, com suporte a Voltar e Avançar.
- Música ambiente suspensa quando a página fica em segundo plano.
- Tutor Worker bloqueia chamadas pagas quando o limite obrigatório não está configurado ou fica indisponível.
