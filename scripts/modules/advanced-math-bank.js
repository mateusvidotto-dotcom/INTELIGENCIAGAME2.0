(function (global) {
  'use strict';
  const MF = global.MindForge;
  const mathematics = MF.getModule('mathematics');
  if (!mathematics) throw new Error('O laboratório de matemática precisa ser carregado antes do banco avançado.');

  const authoredChallenges = [
    {
      id: 'math-authored-001', moduleId: 'mathematics', type: 'number', level: 6,
      taskFamily: 'piecewise-modeling', shortTitle: 'Tarifa por faixas',
      prompt: 'Um restaurante cobra R$ 1,50 por cada 100 g para quem consome até 600 g e R$ 1,00 por cada 100 g para quem consome mais de 600 g. Raimundo consumiu 250 g a mais que Macabeia, mas os dois pagaram exatamente o mesmo valor. Quantos gramas Macabeia consumiu?',
      context: 'A tarifa não é progressiva por blocos: quando o peso ultrapassa 600 g, a taxa de R$ 1,00 por 100 g é aplicada à porção inteira. O consumo de Macabeia está na faixa de até 600 g e o de Raimundo, na faixa superior.',
      answer: 500,
      explanation: 'Se x é o peso consumido por Macabeia, Raimundo consumiu x + 250. Como Macabeia está na primeira faixa e Raimundo na segunda, a igualdade dos pagamentos é 1,50·x/100 = 1,00·(x+250)/100. Logo, 1,5x = x + 250; 0,5x = 250; x = 500 g. Raimundo consumiu 750 g. Cada um pagou R$ 7,50, e os dois pesos respeitam as faixas utilizadas.',
      hints: ['Defina x como o peso de Macabeia; o peso de Raimundo é x + 250.', 'Use uma taxa para a porção de Macabeia e outra para a porção inteira de Raimundo.', 'Iguale os valores pagos e depois confira se x ≤ 600 e x + 250 > 600.'],
      tags: ['função por partes', 'modelagem', 'equações'],
    },
    {
      id: 'math-authored-002', moduleId: 'mathematics', type: 'number', level: 6,
      taskFamily: 'pigeonhole-principle', shortTitle: 'Garantia por distribuição',
      prompt: 'Uma caixa contém um cartão com o número 1, dois cartões com o número 2, três cartões com o número 3 e assim sucessivamente, até dez cartões com o número 10. Sem olhar, qual é o menor número de cartões que precisa ser retirado para garantir que pelo menos cinco deles tenham o mesmo número?',
      explanation: 'Para evitar cinco cartões iguais pelo maior tempo possível, podemos retirar todos os cartões dos grupos 1, 2, 3 e 4: 1 + 2 + 3 + 4 = 10. Dos grupos 5 a 10, retiramos no máximo quatro de cada: 6 × 4 = 24. Portanto, é possível retirar 34 cartões sem obter cinco iguais. O 35º cartão necessariamente completa cinco cartões de algum número. Logo, o mínimo é 35.',
      hints: ['Procure o maior número de cartões que ainda permite evitar cinco iguais.', 'Dos rótulos 1 a 4, você pode retirar todos; dos rótulos 5 a 10, no máximo quatro de cada.', 'Some esse máximo sem garantia e acrescente um cartão.'],
      answer: 35, tags: ['princípio das gavetas', 'combinatória', 'prova por limite'],
    },
    {
      id: 'math-authored-003', moduleId: 'mathematics', type: 'number', level: 7,
      taskFamily: 'lattice-counting', shortTitle: 'Contagem em uma malha',
      prompt: 'Um painel retangular é dividido em quadrados de 1 m de lado. Há uma lâmpada vermelha no centro de cada quadrado e uma lâmpada azul em cada vértice. Em determinado painel há 72 lâmpadas vermelhas e 90 lâmpadas azuis ao todo. Quantas lâmpadas azuis ficam na borda externa?',
      context: 'Considere m linhas e n colunas de quadrados. As lâmpadas azuis aparecem em todos os vértices da malha, inclusive nos vértices internos; a pergunta solicita apenas as lâmpadas dos vértices do contorno.',
      answer: 34,
      explanation: 'As lâmpadas vermelhas contam os quadrados: mn = 72. As lâmpadas azuis em todos os vértices são (m+1)(n+1) = 90. Expandindo: mn + m + n + 1 = 90. Como mn = 72, temos m + n = 17. Os inteiros positivos com soma 17 e produto 72 são 8 e 9. As lâmpadas azuis na borda são 2m + 2n = 2·17 = 34. Atenção: 90 é a quantidade de lâmpadas azuis total, não apenas as da borda.',
      hints: ['As lâmpadas vermelhas contam quadrados; as azuis totais contam todos os vértices da malha.', 'Use mn = 72 e (m+1)(n+1) = 90 para encontrar m+n.', 'A borda contém 2m+2n vértices.'],
      tags: ['geometria discreta', 'contagem', 'equações'],
    },
    {
      id: 'math-authored-004', moduleId: 'mathematics', type: 'number', level: 8,
      taskFamily: 'digit-disc-invariant', shortTitle: 'O visor de três discos',
      prompt: 'Um aparelho mostra três algarismos C, D e U (centenas, dezenas e unidades) e calcula o número de controle 10 + C − D + U. Ao girar o disco C ou o disco U uma posição, o disco D gira junto, na mesma direção. O visor mostra 690. Um dos discos externos é girado uma posição e o número de controle permanece exatamente igual. Qual passa a ser o número mostrado no visor?',
      context: 'Cada disco contém os algarismos de 0 a 9 em ordem circular. Ao passar de 9 para 0 ou de 0 para 9, ocorre uma volta completa no disco. O disco D não pode ser girado sozinho.',
      answer: 580,
      explanation: 'No visor 690, o controle é 10 + 6 − 9 + 0 = 7. Para mantê-lo igual, o algarismo C pode diminuir uma unidade enquanto D também diminui uma unidade: C=5 e D=8, sem alterar U=0. O novo visor é 580 e o controle continua 10 + 5 − 8 + 0 = 7. Girar C para cima faria D passar de 9 para 0 e mudaria o controle em 10; girar U também força a passagem de D entre 9 e 0 e não mantém o valor exato. Portanto, 580 é a configuração possível.',
      hints: ['Calcule primeiro o número de controle do visor 690.', 'Analise separadamente o efeito de girar C e o efeito de girar U; lembre-se de que D gira junto.', 'Teste a rotação de C de 6 para 5 e de D de 9 para 8; confira o controle.'],
      tags: ['invariantes', 'aritmética', 'raciocínio algébrico'],
    },
    {
      id: 'math-authored-005', moduleId: 'mathematics', type: 'number', level: 8,
      taskFamily: 'perfect-interleaving', shortTitle: 'O embaralhamento de 104 cartas',
      prompt: 'Uma pilha contém 104 cartas numeradas de 1 a 104, de cima para baixo. Em um embaralhamento, as 52 cartas da metade superior são intercaladas com as 52 da metade inferior, de modo que a carta que estava no topo passa para a segunda posição. Partindo da ordem crescente, em qual posição ficará a carta de número 5 depois de cinco embaralhamentos?',
      context: 'Depois de cada embaralhamento, a pilha volta a ter posições numeradas de 1 a 104, do topo para baixo. A metade superior ocupa as posições 1 a 52; a inferior, as posições 53 a 104.',
      answer: 55,
      explanation: 'Na intercalação descrita, uma carta que está na posição p≤52 passa para 2p. Uma carta na posição p≥53 passa para 2p−105. A carta 5 percorre as posições 5 → 10 → 20 → 40 → 80 → 55. Portanto, após cinco embaralhamentos, estará na 55ª posição. A regra muda quando a carta passa da metade superior para a inferior; por isso não basta multiplicar por 2 cinco vezes sem ajustar a posição.',
      hints: ['Determine a nova posição separadamente para uma carta na metade superior e para uma carta na metade inferior.', 'Na metade superior, a posição p passa para 2p; na inferior, a carta ocupa uma das posições ímpares: 2p−105.', 'Acompanhe a carta 5 uma etapa por vez: 5, 10, 20, 40...'],
      tags: ['permutações', 'padrões', 'processos iterativos'],
    },
    {
      id: 'math-authored-006', moduleId: 'mathematics', type: 'choice', level: 7,
      taskFamily: 'conditional-probability', shortTitle: 'Primeira repetição',
      prompt: 'Quatro participantes, em ordem, escolhem independentemente e com a mesma probabilidade um número inteiro de 1 a 8. Ganha o primeiro que escolher um número já escolhido por alguém anterior. Qual é a probabilidade de o quarto participante ser o primeiro a repetir um número?',
      options: ['63/256', '21/128', '3/8', '7/32'],
      answer: 0,
      optionExplanations: [
        'Correta. As três primeiras escolhas precisam ser distintas: 1 · 7/8 · 6/8. A quarta deve coincidir com uma das três anteriores: 3/8. O produto é 126/512 = 63/256.',
        'Este resultado surge de uma contagem incompleta dos casos favoráveis ou de uma redução incorreta da fração; a probabilidade precisa incluir a condição de as três primeiras escolhas serem distintas.',
        '3/8 é apenas a probabilidade condicional de a quarta escolha repetir uma das três anteriores, supondo que as três primeiras já sejam distintas. Falta multiplicar pela probabilidade dessa condição anterior.',
        '7/32 não considera corretamente a diminuição das opções disponíveis nas segunda e terceira escolhas ou a condição de primeira repetição.'
      ],
      explanation: 'Para que o quarto ganhe, o primeiro não pode repetir (probabilidade 1), o segundo precisa diferir do primeiro (7/8), o terceiro precisa diferir dos dois anteriores (6/8) e o quarto precisa escolher um dos três números já usados (3/8). Portanto: (7/8)(6/8)(3/8)=126/512=63/256.',
      hints: ['Escreva as condições necessárias para que a primeira repetição ocorra exatamente na quarta escolha.', 'As três primeiras escolhas devem ser todas diferentes.', 'Multiplique 7/8, 6/8 e 3/8; a primeira escolha não altera a probabilidade.'],
      tags: ['probabilidade condicional', 'contagem', 'eventos dependentes'],
    },
    {
      id: 'math-authored-007', moduleId: 'mathematics', type: 'choice', level: 9,
      taskFamily: 'rational-functions', shortTitle: 'Transformação involutiva',
      prompt: 'Considere f(x) = (5x + 4)/(x − 5), definida para x ≠ 5. Qual expressão é igual a f(f(x)) para todo x do domínio?',
      options: ['x', '−x', '(x + 29)/29', '1/x'],
      answer: 0,
      optionExplanations: [
        'Correta. Substituindo f(x) na própria função, o numerador interno simplifica para 29x/(x−5) e o denominador para 29/(x−5). A divisão resulta em x.',
        'O sinal não se inverte: os termos constantes e os sinais do denominador cancelam de modo a produzir x.',
        'A constante 29 aparece nos cálculos intermediários, mas surge tanto no numerador quanto no denominador da composição e se cancela.',
        'A composição não é o recíproco da variável; a substituição algébrica direta mostra que o resultado é a própria entrada.'
      ],
      explanation: 'Temos f(f(x)) = [5·(5x+4)/(x−5)+4] / [(5x+4)/(x−5)−5]. O numerador simplifica para 29x/(x−5) e o denominador para 29/(x−5). Dividindo, obtemos x. Além disso, f(x) nunca é 5, então a segunda aplicação está definida sempre que x ≠ 5. Essa função é uma involução: aplicá-la duas vezes devolve o valor inicial.',
      hints: ['Não tente expandir tudo de uma vez; escreva f(f(x)) como uma fração dividida por outra.', 'Simplifique separadamente o numerador e o denominador da composição.', 'Observe se aparece o mesmo fator 29/(x−5) em ambos.'],
      tags: ['funções racionais', 'composição de funções', 'álgebra'],
    },
    {
      id: 'math-authored-008', moduleId: 'mathematics', type: 'number', level: 8,
      taskFamily: 'spatial-surface-area', shortTitle: 'Superfície de um sólido',
      prompt: 'Seis cubos unitários são unidos por faces inteiras. Seus cubos ocupam as posições (0,0,0), (1,0,0), (2,0,0), (0,1,0), (0,1,1) e (1,1,1), em uma malha tridimensional. Quantas faces unitárias ficam expostas na superfície externa do sólido?',
      context: 'Duas posições representam cubos vizinhos por uma face quando diferem em exatamente 1 em uma coordenada e são iguais nas outras duas.',
      answer: 26,
      explanation: 'Seis cubos isolados teriam 6×6=36 faces. Há cinco pares de cubos que compartilham uma face: (0,0,0)-(1,0,0), (1,0,0)-(2,0,0), (0,0,0)-(0,1,0), (0,1,0)-(0,1,1) e (0,1,1)-(1,1,1). Cada contato esconde duas faces externas. Logo, 36−2×5=26 faces expostas.',
      hints: ['Comece imaginando os seis cubos separados: quantas faces haveria?', 'Conte apenas pares que diferem em uma unidade em exatamente uma coordenada.', 'Cada contato entre dois cubos elimina duas faces da superfície externa.'],
      tags: ['geometria espacial', 'contagem', 'visualização'],
    },
    {
      id: 'math-authored-009', moduleId: 'mathematics', type: 'choice', level: 7,
      taskFamily: 'integer-optimization', shortTitle: 'Escolha de saltos',
      prompt: 'Dois robôs percorrem exatamente 80 metros usando apenas saltos de comprimentos inteiros específicos. O robô A pode saltar 1 m ou 6 m; o robô B pode saltar 1 m ou 9 m. Cada robô escolhe a combinação que minimiza a quantidade total de saltos. Qual conclusão é correta?',
      options: [
        'O robô A usa 15 saltos e termina um salto antes do robô B, que usa 16.',
        'O robô B usa 9 saltos e termina seis saltos antes do robô A.',
        'Os dois usam 15 saltos, pois ambos conseguem aproximar-se de 80 m com saltos longos.',
        'O robô B usa 14 saltos e termina um salto antes do robô A, que usa 15.'
      ],
      answer: 0,
      optionExplanations: [
        'Correta. A usa 13 saltos de 6 m e 2 de 1 m: 15 saltos. B usa 8 saltos de 9 m e 8 de 1 m: 16 saltos. A diferença é de um salto.',
        'O robô B precisa cobrir também os 8 m restantes após oito saltos de 9 m; não pode ignorar esse restante.',
        'Os restos são diferentes: 80 = 13×6 + 2 e 80 = 8×9 + 8. As quantidades totais não coincidem.',
        'O robô B não pode percorrer 80 m em 14 saltos: com oito saltos de 9 m, ainda precisa de oito saltos unitários.'
      ],
      explanation: 'Para minimizar o número de saltos, cada robô deve usar o máximo possível do salto longo, pois substituir um salto de 1 m por um salto longo reduz o total de movimentos. A: 80=13×6+2, total 13+2=15. B: 80=8×9+8, total 8+8=16. Portanto, A usa um salto a menos.',
      hints: ['Para cada robô, divida 80 pelo tamanho do salto maior.', 'O quociente dá a quantidade máxima de saltos longos; o resto será percorrido com saltos de 1 m.', 'Some os saltos longos e os saltos unitários de cada robô.'],
      tags: ['otimização discreta', 'divisão euclidiana', 'estratégia'],
    },
    {
      id: 'math-authored-010', moduleId: 'mathematics', type: 'open', level: 8,
      taskFamily: 'proof-induction', shortTitle: 'Prova por indução geométrica',
      prompt: 'Uma região poligonal convexa com n vértices é dividida em triângulos por diagonais internas que não se cruzam. Demonstre que, qualquer que seja a triangulação, o número de triângulos é sempre n − 2. Sua resposta deve explicar por que a conclusão não depende da escolha das diagonais.',
      explanation: 'Uma prova por indução é possível. Base: para n=3, o polígono já é um triângulo e há 1=3−2 triângulo. Passo: uma triangulação de um polígono convexo com n>3 contém uma diagonal interna. Essa diagonal divide o polígono em dois polígonos menores com r e s vértices, em que r+s=n+2. Pela hipótese de indução, suas triangulações têm r−2 e s−2 triângulos. O total é (r−2)+(s−2)=r+s−4=n−2. Portanto a fórmula vale para todo n≥3.',
      hints: ['Comece com o caso de um triângulo.', 'Considere uma diagonal qualquer da triangulação: ela separa o polígono em duas partes menores.', 'Se as partes têm r e s vértices, use r+s=n+2 e some as quantidades de triângulos das duas partes.'],
      criteria: ['Apresente corretamente o caso inicial n=3.', 'Explique que uma diagonal divide o polígono em dois polígonos menores.', 'Relacione o número de vértices por r+s=n+2.', 'Some (r−2)+(s−2) e conclua n−2.', 'Explique que a escolha da diagonal não altera a contagem final.'],
      tags: ['demonstração', 'indução matemática', 'geometria'],
    },
    {
      id: 'math-authored-011', moduleId: 'mathematics', type: 'open', level: 8,
      taskFamily: 'parity-invariant', shortTitle: 'Invariante de paridade',
      prompt: 'Um tabuleiro 7×7 começa com todas as casas brancas. Em cada movimento, escolhem-se duas casas que compartilham um lado e inverte-se a cor de ambas. É possível alcançar uma posição em que as 49 casas estejam pretas? Justifique sem tentar enumerar sequências de movimentos.',
      explanation: 'Não. Considere a paridade da quantidade de casas pretas. Cada movimento muda exatamente duas casas: o número de casas pretas aumenta em 2, diminui em 2 ou permanece igual. Portanto, sua paridade (par ou ímpar) nunca muda. No início há 0 casas pretas, quantidade par. No tabuleiro totalmente preto haveria 49, quantidade ímpar. Como a paridade é invariante, o estado final é impossível.',
      hints: ['Não acompanhe as cores individuais; procure uma propriedade global do número de casas pretas.', 'Cada movimento altera o total de casas pretas em um número par.', 'Compare a paridade inicial com a paridade de 49.'],
      criteria: ['Define a quantidade de casas pretas como grandeza analisada.', 'Observa que cada movimento altera essa quantidade em −2, 0 ou +2.', 'Conclui que a paridade é invariável.', 'Compara 0 (par) com 49 (ímpar) e conclui impossibilidade.'],
      tags: ['paridade', 'invariantes', 'prova de impossibilidade'],
    },
    {
      id: 'math-authored-012', moduleId: 'mathematics', type: 'number', level: 7,
      taskFamily: 'combinatorial-counting', shortTitle: 'Contagem com restrições',
      prompt: 'Quantos códigos de quatro algarismos distintos podem ser formados usando apenas os dígitos 0, 1, 2, 3, 4 e 5, sabendo que o primeiro algarismo não pode ser zero e o último deve ser par?',
      answer: 156,
      explanation: 'Separe em casos pelo último algarismo. Caso 1: termina em 0. O primeiro algarismo pode ser 1–5 (5 opções); os dois do meio são escolhidos em ordem entre os quatro restantes (4×3). Total: 5×4×3=60. Caso 2: termina em 2 ou 4 (2 opções). Para cada final, o primeiro pode ser qualquer um dos quatro dígitos não nulos restantes; os dois do meio têm 4×3 possibilidades. Total: 2×4×4×3=96. Somando: 60+96=156 códigos.',
      hints: ['Separe os casos em que o último algarismo é 0 e em que é 2 ou 4.', 'Em cada caso, conte primeiro as opções para o último e o primeiro algarismos.', 'Depois conte as duas posições centrais em ordem, sem repetir dígitos.'],
      tags: ['análise de casos', 'princípio multiplicativo', 'combinatória'],
    }
  ];

  const existing = new Set(mathematics.questions.map(question => question.id));
  for (const question of authoredChallenges) {
    if (existing.has(question.id)) throw new Error(`Desafio matemático duplicado: ${question.id}`);
    mathematics.questions.push(question);
  }
  mathematics.description = 'Aritmética, álgebra, combinatória, invariantes, probabilidade, geometria e demonstrações. Inclui desafios autorais de raciocínio em vários níveis.';
  mathematics.duration = '8–20 min';
  global.MindForge.AdvancedMathBank = { count: authoredChallenges.length, ids: authoredChallenges.map(question => question.id) };
})(window);
