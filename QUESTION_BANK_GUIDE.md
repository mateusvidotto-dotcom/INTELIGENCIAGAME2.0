# Mind Forge Omega — guia do banco de questões

## Conteúdo desta versão

O banco complementar é carregado pelo arquivo `question-bank.js` a partir de `index.html`. Nesta expansão, ele contém 35 unidades autorais e 104 questões objetivas, com textos-base, objetivos, dificuldades, áreas, vínculos de programa e explicações por alternativa.

Os conteúdos foram organizados para:
- ENEM
- FUVEST
- UFPR
- PAS/UEM — Etapas 1, 2 e 3 (programa oficial 2026 como referência)
- OBMEP

A plataforma também preserva 12 unidades e 24 questões anteriores. O total combinado nesta versão é de 47 unidades e 128 questões.

## Estrutura de uma unidade

Cada unidade contém:
- identificador único `id`
- disciplina/área `area`
- título e tema
- objetivo de aprendizagem
- exame ou etapa de referência
- nível de dificuldade
- texto-base opcional `passage`
- conceitos e exemplos
- estratégia de resolução
- conjunto de questões `q`
- referência oficial de programa ou prova
- tarefa discursiva opcional `writing`

Cada questão usa a estrutura:
`[enunciado, alternativas, índiceDoGabarito, explicaçãoBreve, análise]`

A análise inclui:
- conceito avaliado
- resolução passo a passo
- justificativa individual de cada alternativa
- aprendizado transferível
- armadilha comum

## Como acrescentar uma questão

1. Escolha uma unidade e confirme o conteúdo no programa oficial da edição.
2. Escreva um enunciado inequívoco e alternativas mutuamente exclusivas.
3. Resolva independentemente antes de registrar o índice do gabarito.
4. Escreva uma justificativa para cada alternativa, inclusive a correta.
5. Valide que o índice do gabarito está entre zero e o número de alternativas menos um.
6. Execute a checagem de esquema e faça uma tentativa real na interface.

As questões desta base são autorais. Os nomes dos exames representam referências de habilidade e programa; não significam que os enunciados foram aplicados em provas oficiais. Para questões oficiais, consulte os portais e arquivos das respectivas instituições.

## Referências de estudo

- ENEM/INEP: https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem
- FUVEST: https://www.fuvest.br/vestibular-da-usp/
- UFPR: https://lua.nc.ufpr.br/PortalNC/Concurso?concurso=PS2027
- PAS/UEM: https://www.vestibular.uem.br/provas/prog/progpas26.pdf
- OBMEP: https://www.obmep.org.br/provas.htm

## Correção pedagógica

A interface apresenta a análise imediatamente após cada resposta, seja ela correta ou incorreta. O caderno de erros guarda a pergunta, a alternativa escolhida, o gabarito, o exame e a disciplina para orientar a revisão. Os rascunhos discursivos ficam no armazenamento local do navegador e podem ser enviados ao Tutor IA para feedback adicional.
