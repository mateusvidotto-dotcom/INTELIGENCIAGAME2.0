# Changelog

## 2.5.0 — Continuidade da PWA, Tutor contextual e áudio

- Alterado o service worker para aguardar confirmação explícita antes de ativar uma nova versão; o estudante pode continuar a sessão atual ou atualizar quando desejar.
- Adicionado aviso de versão pronta, com ações Atualizar agora e Agora não; cache passa a v11.
- O Tutor recebe o estímulo da questão (texto, tabela, gráfico, fórmula/modelo), objetivo, habilidade e dificuldade no pedido de aprofundamento.
- Acrescentado controle de volume da música ambiente, salvo localmente; botão mantém ícone e estado acessível.
- O desempenho passou a mostrar tentativas por disciplina, habilidade e temas com erros, sem exibir percentuais por grupos com menos de cinco tentativas.
- Adicionada suíte de teste para consentimento de atualização, Tutor contextual e volume local.


## 2.4.0 — Questões com contexto e Português avançado

- Criado `scripts/core/question-context.js`, com renderização reutilizável de texto-base, fórmula, tabela, gráfico e imagem.
- Integrada a visualização do estímulo na tela da unidade e antes do enunciado da questão.
- Simulados preservam a unidade-fonte de cada item; o contexto é atualizado a cada questão.
- Questões que citam material ausente são bloqueadas e excluídas de simulados.
- Adicionado `portuguese-forge.js` com sete unidades autorais e 22 questões de interpretação, inferência, pressupostos, tese, evidência, contra-argumentação, falácias, coesão, gêneros, ironia, dados multimodais e redação.
- Questões novas recebem ID, objetivo, habilidade e nível de dificuldade; o histórico registra o identificador e o uso de pistas sem mudar o formato de backup.
- Implementadas três pistas progressivas, uso registrado na tentativa e reabertura da questão errada com o estímulo original.
- Atualizado o cache offline para v10 e adicionados testes de integridade do contexto à CI.


## 2.3.0 — CSP, JavaScript externo e navegação acessível

- Extraído o controlador principal para `scripts/site.js`, removendo JavaScript inline do HTML.
- Adicionada CSP por meta com `script-src 'self'`, bloqueio de `eval` e restrição das conexões do Tutor a `*.workers.dev`.
- Atualizado o shell offline para armazenar o novo arquivo JavaScript.
- Padronizados os rótulos da navegação e adotados ícones SVG acessíveis, com texto visível.
- Tornados os cartões dos quatro pilares botões operáveis por teclado e preenchida a home antes da execução do JavaScript.
- A precisão global só é exibida após pelo menos dez tentativas; antes disso, a interface informa que ainda há poucos dados.
- Auditoria de qualidade reforçada para detectar scripts inline, ausência de CSP e regressão do conteúdo inicial.


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
