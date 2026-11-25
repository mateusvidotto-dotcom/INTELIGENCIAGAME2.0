(function (global) {
  'use strict';

  const STORAGE_KEY = 'mind-forge-study-center-v1';

  function choice(id, title, unit, objective, concepts, example, prompt, options, answer, explanation, hint, vocabulary) {
    return {
      id, title, unit, objective, concepts, example, vocabulary: vocabulary || [],
      question: { type: 'choice', prompt, options, answer, explanation, hint }
    };
  }

  const paths = [
    {
      id: 'english',
      title: 'English Forge',
      eyebrow: 'LANGUAGE MASTERY',
      short: 'Aprenda inglês com progressão, contexto e prática.',
      description: 'Uma trilha inicial de inglês com explicações, exemplos, vocabulário contextual e exercícios. O ponto de partida é A1; os níveis seguintes serão liberados à medida que o conteúdo for desenvolvido e validado.',
      level: 'A1 · Fundamentos',
      color: 'cyan',
      skills: ['Gramática em contexto', 'Vocabulário', 'Leitura', 'Escuta guiada'],
      notice: 'Este núcleo inicia o percurso A1. Aulas avançadas, avaliação completa das quatro habilidades e prática oral gravada ainda serão desenvolvidas.',
      lessons: [
        choice('en-a1-01','Como uma frase em inglês funciona','A1 · Estrutura de frases',
          'Reconhecer a ordem mais comum de uma frase afirmativa em inglês.',
          [
            'A ordem básica mais comum é Subject + Verb + Complement (sujeito + verbo + complemento).',
            'Em inglês, normalmente não omitimos o sujeito como acontece com frequência em português.',
            'Adjetivos geralmente aparecem antes do substantivo: a difficult question, não a question difficult.',
            'A ordem pode mudar em perguntas, negativas e construções especiais; primeiro domine a estrutura afirmativa.'
          ],
          {label:'Exemplo',text:'My brother studies mathematics.',audio:'My brother studies mathematics.'},
          'Which sentence follows the usual English word order?',
          ['Studies Ana English every day.','Ana studies English every day.','English every day Ana studies.','Every day English studies Ana.'],
          1,
          'A frase correta coloca o sujeito Ana primeiro, o verbo studies em seguida e o complemento English depois. A expressão every day indica frequência.',
          'Encontre primeiro quem realiza a ação. Depois localize o verbo e aquilo que completa seu sentido.',
          [{word:'subject',meaning:'sujeito'},{word:'verb',meaning:'verbo'},{word:'sentence',meaning:'frase'},{word:'every day',meaning:'todos os dias'}]
        ),
        choice('en-a1-02','O verbo to be: am, is e are','A1 · Verbo to be',
          'Escolher am, is ou are de acordo com o sujeito.',
          [
            'Use am com I: I am a student.',
            'Use is com he, she, it e sujeitos singulares: She is ready.',
            'Use are com you, we, they e sujeitos plurais: They are ready.',
            'Na negativa, acrescente not: He is not tired. Na pergunta, coloque o verbo antes do sujeito: Are they ready?'
          ],
          {label:'Exemplo',text:'We are students. / She is my friend. / I am ready.',audio:'We are students. She is my friend. I am ready.'},
          'Complete the sentence: “They ___ at school today.”',
          ['am','is','are','be'],
          2,
          'They é um pronome plural e utiliza are. A forma be é o infinitivo/base do verbo e não completa essa frase afirmativa no presente.',
          'Associe o pronome ao verbo: I → am; he/she/it → is; you/we/they → are.',
          [{word:'ready',meaning:'pronto(a)'},{word:'school',meaning:'escola'},{word:'today',meaning:'hoje'},{word:'tired',meaning:'cansado(a)'}]
        ),
        choice('en-a1-03','Present Simple: hábitos e rotinas','A1 · Present Simple',
          'Descrever hábitos e reconhecer a mudança verbal na terceira pessoa do singular.',
          [
            'O Present Simple é utilizado para hábitos, rotinas e fatos gerais.',
            'Com I, you, we e they, usamos a forma base: They study every day.',
            'Com he, she e it, normalmente acrescentamos -s ou -es: She studies; he watches.',
            'Nas negativas e perguntas, usamos do ou does. Com does, o verbo principal volta à forma base: Does she study?'
          ],
          {label:'Exemplo',text:'I study English. / She studies English. / She does not study on Sunday.',audio:'I study English. She studies English. She does not study on Sunday.'},
          'Choose the grammatically correct sentence.',
          ['He go to school by bus.','He goes to school by bus.','He going to school by bus.','He does goes to school by bus.'],
          1,
          'He exige goes na afirmativa do Present Simple. Com does, a forma correta seria “He does go”, embora a forma mais neutra da negativa seja “He does not go”.',
          'O sujeito é he. Em uma frase afirmativa no Present Simple, observe a terminação do verbo.',
          [{word:'usually',meaning:'geralmente'},{word:'sometimes',meaning:'às vezes'},{word:'always',meaning:'sempre'},{word:'never',meaning:'nunca'}]
        ),
        choice('en-a1-04','Artigos: a, an e the','A1 · Artigos',
          'Distinguir o uso inicial de a, an e the.',
          [
            'A e an introduzem um substantivo contável singular ainda não identificado especificamente.',
            'Use a antes de som consonantal e an antes de som vocálico: a book, an apple.',
            'A escolha depende do som inicial, não apenas da primeira letra: an hour, a university.',
            'The é usado quando o referente é identificado ou específico no contexto.'
          ],
          {label:'Exemplo',text:'I saw an elephant. The elephant was near a tree.',audio:'I saw an elephant. The elephant was near a tree.'},
          'Complete: “She wants to buy ___ umbrella.”',
          ['a','an','the','some'],
          1,
          'Umbrella começa com som vocálico /ʌ/, por isso usamos an. The exigiria um guarda-chuva específico já identificado pelo contexto.',
          'Pronuncie a primeira sílaba de umbrella e observe o som inicial.',
          [{word:'umbrella',meaning:'guarda-chuva'},{word:'hour',meaning:'hora'},{word:'university',meaning:'universidade'},{word:'specific',meaning:'específico(a)'}]
        ),
        choice('en-a1-05','Leitura curta: identificar informação','A1 · Reading',
          'Localizar informações explícitas em um pequeno texto em inglês.',
          [
            'Leia primeiro o contexto geral e depois procure nomes, horários, lugares e ações.',
            'Não transforme uma possibilidade em certeza: diferencie o que o texto afirma do que você imagina.',
            'Palavras como but, because e so alteram a relação entre as ideias.',
            'Use o contexto para inferir uma palavra desconhecida antes de recorrer à tradução.'
          ],
          {label:'Texto',text:'Mia works at a library. She starts at nine o’clock and leaves at three. On Mondays, the library closes early.',audio:'Mia works at a library. She starts at nine o’clock and leaves at three. On Mondays, the library closes early.'},
          'According to the text, when does Mia start work?',
          ['At seven o’clock.','At nine o’clock.','At three o’clock.','The text does not say.'],
          1,
          'O texto afirma explicitamente “She starts at nine o’clock”. A saída às três é outro horário e não deve ser confundida com o início do expediente.',
          'Procure a frase que contém starts. Não confunda starts com leaves.',
          [{word:'works',meaning:'trabalha'},{word:'starts',meaning:'começa'},{word:'leaves',meaning:'sai / deixa'},{word:'closes',meaning:'fecha'}]
        )
      ]
    },
    {
      id: 'vestibular',
      title: 'Vestibular Forge',
      eyebrow: 'ACADEMIC EXCELLENCE',
      short: 'Estude fundamentos e pratique com método.',
      description: 'Um núcleo acadêmico inicial com matemática, física, química e interpretação. A estrutura foi pensada para receber programas específicos como PAS/UEM, ENEM e outros vestibulares, sempre respeitando a edição selecionada.',
      level: 'Fundamentos · Ensino Médio',
      color: 'blue',
      skills: ['Teoria e exemplos', 'Questões aplicadas', 'Análise de erros', 'Preparação por edição'],
      notice: 'As aulas abaixo são fundamentos autorais de estudo, não uma reprodução integral do programa oficial de uma instituição. Antes de cada prova, o conteúdo deverá ser conferido com o edital e o programa da edição correspondente.',
      resources: [{ label:'Portal oficial do PAS/UEM',url:'https://pas.uem.br/' },{ label:'Apresentação e etapas do PAS/UEM',url:'https://pcs.uem.br/daa/estude-na-uem/graduacao/processo-de-avaliacao-seriada-pas' }],
      lessons: [
        choice('vest-math-01','Porcentagem e variação percentual','Matemática · Aritmética',
          'Calcular porcentagens e interpretar descontos sem confundir taxa com valor final.',
          [
            'x% de uma quantidade Q corresponde a (x/100) × Q.',
            'Um desconto de 15% significa pagar 85% do preço original.',
            'Para aumentos sucessivos, aplique cada fator multiplicativo sobre o valor atualizado.',
            'Diferencie pontos percentuais de variação percentual relativa.'
          ],
          {label:'Exemplo resolvido',text:'Uma mochila custa R$ 240 e recebe desconto de 15%. O desconto é 0,15 × 240 = R$ 36. O preço final é 240 − 36 = R$ 204.'},
          'Quanto corresponde a 25% de 320?',
          ['40','64','80','100'],
          2,
          '25% é um quarto. Então 320 ÷ 4 = 80. Outra forma é calcular 0,25 × 320.',
          'Transforme 25% em fração: 25/100 = 1/4.'
        ),
        choice('vest-math-02','Função afim e interpretação','Matemática · Funções',
          'Calcular valores de uma função afim e interpretar coeficientes.',
          [
            'Uma função afim pode ser escrita como f(x) = ax + b.',
            'O coeficiente a representa a taxa de variação; b é o valor de f(0), isto é, a interseção com o eixo vertical.',
            'Se a é positivo, a função é crescente; se a é negativo, é decrescente.',
            'Para calcular f(x), substitua a variável pelo valor solicitado e respeite a prioridade das operações.'
          ],
          {label:'Exemplo resolvido',text:'Se f(x) = 2x + 3, então f(4) = 2·4 + 3 = 11. O coeficiente angular é 2 e a interseção vertical é 3.'},
          'Se f(x) = 3x − 2, qual é o valor de f(5)?',
          ['8','13','15','17'],
          1,
          'Substituindo x = 5: f(5) = 3·5 − 2 = 15 − 2 = 13.',
          'Substitua o x por 5 antes de efetuar a multiplicação.'
        ),
        choice('vest-physics-01','Movimento uniforme','Física · Cinemática',
          'Relacionar distância, velocidade média e intervalo de tempo em movimento uniforme.',
          [
            'No movimento uniforme, a velocidade escalar permanece constante.',
            'A velocidade média em um intervalo é dada por v = Δs/Δt.',
            'Mantenha unidades compatíveis: quilômetros com horas produzem km/h; metros com segundos produzem m/s.',
            'A fórmula não informa, sozinha, se o movimento é progressivo ou retrógrado; o sinal da velocidade depende da orientação adotada.'
          ],
          {label:'Exemplo resolvido',text:'Um veículo percorre 150 km em 3 h, com velocidade constante. v = 150/3 = 50 km/h.'},
          'Um ciclista percorre 180 km em 4 horas a velocidade constante. Qual é sua velocidade?',
          ['36 km/h','40 km/h','45 km/h','60 km/h'],
          2,
          'v = Δs/Δt = 180/4 = 45 km/h. A unidade é quilômetros por hora porque a distância está em quilômetros e o tempo em horas.',
          'Divida a distância total pelo tempo total, mantendo as unidades.'
        ),
        choice('vest-chem-01','Quantidade de matéria e mol','Química · Estequiometria',
          'Relacionar massa, massa molar e quantidade de matéria.',
          [
            'A quantidade de matéria n pode ser calculada por n = m/M.',
            'm é a massa da amostra, normalmente em gramas, e M é a massa molar em g/mol.',
            'Para água (H₂O), usando H ≈ 1 e O ≈ 16, M = 2·1 + 16 = 18 g/mol.',
            'Confira as unidades: gramas divididos por gramas por mol resultam em mol.'
          ],
          {label:'Exemplo resolvido',text:'Para 36 g de água: n = 36/18 = 2 mol. A massa molar depende da fórmula química e das massas atômicas adotadas.'},
          'Uma amostra contém 36 g de água (H₂O). Considerando M = 18 g/mol, quantos mols há?',
          ['0,5 mol','1 mol','2 mol','18 mol'],
          2,
          'n = m/M = 36/18 = 2 mol. A massa de 36 g corresponde a duas vezes a massa molar da água.',
          'Use n = m/M. Identifique m = 36 g e M = 18 g/mol.'
        ),
        choice('vest-language-01','Interpretação: informação e inferência','Linguagens · Leitura',
          'Distinguir uma informação explícita de uma inferência que depende de contexto.',
          [
            'Informação explícita está afirmada diretamente no texto.',
            'Inferência é uma conclusão construída a partir de pistas; deve ser plausível e sustentada.',
            'Não acrescente ao texto uma causa, intenção ou resultado que ele não apresenta.',
            'Em questões de interpretação, examine os limites das alternativas: uma palavra absoluta pode ampliar indevidamente a afirmação.'
          ],
          {label:'Texto-base',text:'“A equipe concluiu a primeira etapa do projeto, mas ainda não avaliou os resultados finais.” O trecho confirma a conclusão da etapa inicial e informa que a avaliação final não aconteceu.'},
          'Qual conclusão extrapola o que o texto permite afirmar?',
          ['A primeira etapa foi concluída.','Os resultados finais ainda não foram avaliados.','O projeto foi comprovadamente bem-sucedido.','A avaliação final não é apresentada como concluída.'],
          2,
          'Concluir uma etapa inicial não prova que o projeto inteiro foi bem-sucedido. A alternativa transforma uma informação parcial em uma conclusão definitiva.',
          'Procure a alternativa que afirma mais do que o texto realmente informa.'
        )
      ]
    },
    {
      id: 'olympiad',
      title: 'Olympiad Forge',
      eyebrow: 'OLYMPIAD MASTERY',
      short: 'Desenvolva estratégia, criatividade e demonstração matemática.',
      description: 'Uma trilha inicial de resolução de problemas olímpicos, com ênfase em ideias matemáticas, justificativas e transferência. A OBMEP Nível 3 é uma referência importante para a organização do conteúdo.',
      level: 'OBMEP · Nível 3',
      color: 'gold',
      skills: ['Teoria dos números', 'Combinatória', 'Invariantes', 'Demonstração'],
      notice: 'A trilha diferencia treino objetivo e treino discursivo. Os exercícios são autorais e didáticos; não são apresentados como questões oficiais da OBMEP.',
      resources: [{ label:'Provas e soluções oficiais da OBMEP',url:'https://relatorio.obmep.org.br/provas.htm' },{ label:'Banco oficial de questões',url:'https://server24.obmep.org.br/banco.htm' }],
      lessons: [
        choice('olymp-parity-01','Paridade: pensar em pares e ímpares','Estratégia · Paridade',
          'Usar a representação algébrica de números pares e ímpares para justificar uma conclusão.',
          [
            'Todo número par pode ser escrito como 2k, para algum inteiro k.',
            'Todo número ímpar pode ser escrito como 2k + 1, para algum inteiro k.',
            'A soma de dois ímpares é par: (2a + 1) + (2b + 1) = 2(a + b + 1).',
            'Em problemas olímpicos, paridade pode revelar impossibilidades sem exigir cálculos extensos.'
          ],
          {label:'Exemplo',text:'A soma de três números inteiros consecutivos é sempre múltipla de 3: n + (n+1) + (n+2) = 3n + 3 = 3(n+1).'},
          'Qual expressão demonstra corretamente que a soma de dois números ímpares é par?',
          ['2a + 2b + 1','2a + 1 + 2b + 1 = 2(a + b + 1)','2a + 1 + 2b = 2(a + b)','(2a + 1)(2b + 1) = 2ab'],
          1,
          'A soma é 2a + 1 + 2b + 1 = 2(a + b + 1). Como a + b + 1 é inteiro, a expressão é divisível por 2 e, portanto, é par.',
          'Escreva cada ímpar na forma 2k + 1 e procure colocar 2 em evidência.'
        ),
        choice('olymp-pigeon-01','Princípio da casa dos pombos','Estratégia · Contagem',
          'Reconhecer situações em que mais objetos do que categorias garantem uma repetição.',
          [
            'Se n + 1 objetos são distribuídos entre n categorias, pelo menos uma categoria recebe dois ou mais objetos.',
            'O argumento não depende de conhecer antecipadamente onde ocorrerá a repetição.',
            'É essencial identificar corretamente os objetos e as categorias.',
            'O princípio prova a existência de uma repetição, mas geralmente não identifica quais objetos serão repetidos.'
          ],
          {label:'Exemplo',text:'Entre 13 pessoas, pelo menos duas nasceram no mesmo mês, pois existem 13 pessoas e apenas 12 meses possíveis.'},
          'Em uma sala com 32 estudantes, o que é garantido considerando apenas os dias do mês em que nasceram (1 a 31)?',
          ['Pelo menos dois nasceram no mesmo dia do mês.','Todos nasceram em meses diferentes.','Exatamente dois nasceram no mesmo dia.','Ninguém nasceu nos dias 1 a 5.'],
          0,
          'Há 32 estudantes e apenas 31 números possíveis para o dia do mês. Como 32 é maior que 31, pelo princípio da casa dos pombos, pelo menos duas pessoas compartilham o mesmo dia do mês.',
          'Compare o número de objetos com o número de categorias. O princípio garante repetição quando os objetos são mais numerosos que as categorias.'
        ),
        choice('olymp-divisibility-01','Divisibilidade e soma dos algarismos','Teoria dos números · Divisibilidade',
          'Aplicar critérios de divisibilidade e justificar o resultado.',
          [
            'Um inteiro é divisível por 9 quando a soma de seus algarismos é divisível por 9.',
            'O critério decorre de que 10 deixa resto 1 na divisão por 9; assim, cada potência de 10 também deixa resto 1.',
            'Terminar em 0 ou 5 é o critério de divisibilidade por 5, não por 9.',
            'Critérios são atalhos para uma propriedade matemática; em uma solução discursiva, explique por que são aplicáveis.'
          ],
          {label:'Exemplo',text:'729: 7 + 2 + 9 = 18. Como 18 é divisível por 9, 729 também é divisível por 9.'},
          'Qual número é divisível por 9?',
          ['634','721','729','845'],
          2,
          'A soma dos algarismos de 729 é 18, que é múltiplo de 9. Os demais números têm somas 13, 10 e 17.',
          'Some os algarismos de cada alternativa e verifique qual soma é múltipla de 9.'
        ),
        choice('olymp-counting-01','Princípio multiplicativo da contagem','Combinatória · Princípios de contagem',
          'Contar escolhas independentes em etapas sem enumerar cada possibilidade.',
          [
            'Quando uma escolha ocorre em etapas sucessivas e cada etapa oferece um número definido de opções, multiplicamos as quantidades.',
            'Se há 3 camisetas e 2 calças, cada camiseta pode ser combinada com cada calça: 3 × 2 = 6.',
            'Antes de multiplicar, verifique se todas as opções podem ser combinadas e se não existem restrições.',
            'Diagramas de árvore ajudam a visualizar as escolhas e detectar casos omitidos.'
          ],
          {label:'Exemplo',text:'Com 3 camisetas e 2 calças, há 6 conjuntos possíveis. Cada uma das 3 camisetas combina com as 2 calças.'},
          'Um código tem duas posições: a primeira pode ser preenchida por 4 letras e a segunda por 3 algarismos. Quantos códigos são possíveis, sem outras restrições?',
          ['7','12','16','24'],
          1,
          'Pelo princípio multiplicativo, há 4 escolhas para a primeira posição e 3 para a segunda: 4 × 3 = 12 códigos.',
          'Conte as opções da primeira posição e multiplique pelas opções da segunda.'
        ),
        {
          id: 'olymp-proof-01',
          title: 'Questão discursiva: restos e demonstração',
          unit: 'OBMEP · Preparação para a 2ª fase',
          objective: 'Construir uma justificativa completa utilizando classificação por restos.',
          concepts: [
            'Na divisão de um inteiro por 5, o resto só pode ser 0, 1, 2, 3 ou 4.',
            'Esses cinco valores são as únicas categorias possíveis de resto.',
            'Se seis inteiros são classificados em cinco categorias, pelo menos dois ficam na mesma categoria.',
            'Se dois números deixam o mesmo resto na divisão por 5, a diferença entre eles é divisível por 5.'
          ],
          example: { label:'Estratégia', text:'Organize a demonstração em três passos: identifique os restos possíveis, aplique o princípio da casa dos pombos e traduza a igualdade dos restos em divisibilidade.' },
          question: {
            type:'open',
            prompt:'Explique por que, entre quaisquer seis números inteiros, existem dois cuja diferença é divisível por 5.',
            hint:'Considere os restos possíveis na divisão por 5. Depois, explique por que dois números precisam compartilhar um desses restos.',
            rubric:[
              'Mencione explicitamente os cinco restos possíveis: 0, 1, 2, 3 e 4.',
              'Explique por que seis números distribuídos em cinco classes obrigam uma classe a conter pelo menos dois.',
              'Conclua que números com o mesmo resto têm diferença divisível por 5.'
            ],
            modelAnswer:'Ao dividir qualquer inteiro por 5, o resto é 0, 1, 2, 3 ou 4. Portanto, há cinco classes possíveis de restos. Como temos seis inteiros, pelo princípio da casa dos pombos, ao menos dois deles deixam o mesmo resto. Se esses números são 5a + r e 5b + r, sua diferença é 5(a − b), que é divisível por 5.'
          }
        }
      ]
    }
  ];

  const state = { pathId: null, lessonId: null, solved: false, answerDraft: '' };

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);
    });
  }
  function documentRef() { return global.document || null; }
  function storage() {
    try {
      if (!global.localStorage) return { completed: {} };
      const value = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || '{}');
      return value && typeof value === 'object' && value.completed && typeof value.completed === 'object' ? value : { completed: {} };
    } catch (error) { return { completed: {} }; }
  }
  function saveProgress(data) {
    try { if (global.localStorage) global.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (error) { /* armazenamento pode estar indisponível */ }
  }
  function completedCount(path) {
    const data = storage();
    return path.lessons.filter(function (lesson) { return !!data.completed[lesson.id]; }).length;
  }
  function progressPercent(path) {
    return Math.round(completedCount(path) / path.lessons.length * 100);
  }
  function pathById(id) { return paths.find(function (path) { return path.id === id; }) || null; }
  function lessonById(path, id) { return path ? path.lessons.find(function (lesson) { return lesson.id === id; }) || null : null; }
  function getRoot() { return documentRef() && documentRef().getElementById('study-center-content'); }

  function renderOverview() {
    const root = getRoot();
    if (!root) return;
    root.innerHTML =
      '<div class="study-center-heading"><div><div class="eyebrow">TRILHAS PRIORITÁRIAS</div><h2>Escolha o que você quer dominar.</h2><p>Três percursos centrais, com aulas, prática e progresso salvo neste navegador. As unidades serão ampliadas e revisadas progressivamente.</p></div><span class="study-center-mark">∞</span></div>' +
      '<div class="study-track-grid">' + paths.map(function (path) {
        const done = completedCount(path), total = path.lessons.length, percent = progressPercent(path);
        return '<article class="study-track-card study-track-' + escapeHTML(path.color) + '">' +
          '<div class="study-track-top"><span class="study-track-eyebrow">' + escapeHTML(path.eyebrow) + '</span><span class="study-track-symbol" aria-hidden="true">' + (path.id === 'english' ? 'Aa' : path.id === 'vestibular' ? '∑' : 'Ω') + '</span></div>' +
          '<h3>' + escapeHTML(path.title) + '</h3><p>' + escapeHTML(path.short) + '</p>' +
          '<div class="study-track-meta"><span>' + escapeHTML(path.level) + '</span><span>' + done + '/' + total + ' aulas</span></div>' +
          '<div class="study-track-progress" aria-label="' + percent + '% concluído"><span style="width:' + percent + '%"></span></div>' +
          '<button type="button" class="button button-secondary" data-study-path="' + escapeHTML(path.id) + '">Abrir trilha <span aria-hidden="true">→</span></button>' +
        '</article>';
      }).join('') + '</div>' +
      '<div class="study-method-panel"><div class="eyebrow">COMO O MIND FORGE ENSINA</div><div class="study-method-grid">' +
      '<div><strong>01 · Compreender</strong><p>Objetivos claros, explicações e exemplos resolvidos antes de praticar.</p></div>' +
      '<div><strong>02 · Resolver</strong><p>Exercícios com feedback, pistas graduais e justificativas.</p></div>' +
      '<div><strong>03 · Consolidar</strong><p>Conclusão de aulas registrada localmente para orientar sua continuidade.</p></div>' +
      '</div></div>';
    api.updateDashboard();
  }

  function renderPath(id) {
    const path = pathById(id);
    const root = getRoot();
    if (!path || !root) return;
    state.pathId = path.id;
    state.lessonId = null;
    const done = completedCount(path), percent = progressPercent(path);
    const data = storage();
    root.innerHTML =
      '<div class="study-detail-toolbar"><button type="button" class="text-button" data-study-action="back">← Todas as trilhas</button><span class="study-track-eyebrow">' + escapeHTML(path.eyebrow) + '</span></div>' +
      '<section class="study-path-hero study-track-' + escapeHTML(path.color) + '"><div><div class="eyebrow">' + escapeHTML(path.level) + '</div><h2>' + escapeHTML(path.title) + '</h2><p>' + escapeHTML(path.description) + '</p><div class="study-skill-list">' + path.skills.map(function (skill) { return '<span>' + escapeHTML(skill) + '</span>'; }).join('') + '</div></div><div class="study-path-score"><strong>' + percent + '%</strong><span>concluído</span><div class="study-track-progress"><span style="width:' + percent + '%"></span></div><small>' + done + ' de ' + path.lessons.length + ' aulas</small></div></section>' +
      '<div class="study-notice"><strong>Escopo desta versão</strong><p>' + escapeHTML(path.notice) + '</p></div>' +
      (path.resources && path.resources.length ? '<div class="study-resources"><strong>Fontes oficiais para continuar estudando</strong>' + path.resources.map(function (resource) { return '<a href="' + escapeHTML(resource.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(resource.label) + ' ↗</a>'; }).join('') + '</div>' : '') +
      '<div class="study-lessons-heading"><div><div class="eyebrow">PERCURSO DE APRENDIZAGEM</div><h3>Aulas e desafios</h3></div><span>' + path.lessons.length + ' unidades iniciais</span></div>' +
      '<div class="study-lesson-list">' + path.lessons.map(function (lesson, index) {
        const isDone = !!data.completed[lesson.id];
        return '<button type="button" class="study-lesson-row ' + (isDone ? 'is-complete' : '') + '" data-study-lesson="' + escapeHTML(lesson.id) + '">' +
          '<span class="study-lesson-number">' + String(index + 1).padStart(2, '0') + '</span><span class="study-lesson-copy"><strong>' + escapeHTML(lesson.title) + '</strong><small>' + escapeHTML(lesson.unit) + ' · ' + escapeHTML(lesson.objective) + '</small></span>' +
          '<span class="study-lesson-status">' + (isDone ? 'Concluída ✓' : 'Estudar →') + '</span></button>';
      }).join('') + '</div>';
    api.updateDashboard();
  }

  function renderLesson(lessonId) {
    const path = pathById(state.pathId);
    const lesson = lessonById(path, lessonId);
    const root = getRoot();
    if (!lesson || !root) return;
    state.lessonId = lesson.id;
    state.solved = false;
    state.answerDraft = '';
    const data = storage();
    const completed = !!data.completed[lesson.id];
    const question = lesson.question;
    const isOpen = question.type === 'open';
    const questionMarkup = isOpen
      ? '<div class="study-open-task"><label for="study-open-answer">' + escapeHTML(question.prompt) + '</label><textarea id="study-open-answer" rows="6" placeholder="Escreva seu raciocínio, justificando cada etapa..."></textarea><div class="study-rubric"><strong>Autoavaliação da demonstração</strong><p>Marque os critérios que sua resposta realmente atende. Não marque um critério apenas por ter utilizado uma palavra semelhante.</p>' + question.rubric.map(function (item, index) { return '<label><input type="checkbox" name="study-rubric" value="' + index + '"><span>' + escapeHTML(item) + '</span></label>'; }).join('') + '</div><button type="button" class="button button-primary" data-study-action="self-check">Comparar com os critérios</button></div>'
      : '<div class="study-options">' + question.options.map(function (option, index) { return '<label class="study-option"><input type="radio" name="study-answer" value="' + index + '"><span>' + escapeHTML(option) + '</span></label>'; }).join('') + '</div><button type="button" class="button button-primary" data-study-action="submit">Verificar resposta</button>';
    const audioButton = path.id === 'english' && lesson.example && (lesson.example.audio || lesson.example.text)
      ? '<button type="button" class="button button-ghost" data-study-speak="' + escapeHTML(lesson.example.audio || lesson.example.text) + '">Ouvir exemplo em inglês <span aria-hidden="true">▶</span></button>'
      : '';
    root.innerHTML =
      '<div class="study-detail-toolbar"><button type="button" class="text-button" data-study-action="back">← Voltar para ' + escapeHTML(path.title) + '</button><span class="study-track-eyebrow">' + escapeHTML(lesson.unit) + '</span></div>' +
      '<article class="study-lesson-view"><div class="eyebrow">AULA ' + escapeHTML(lesson.id.toUpperCase()) + '</div><h2>' + escapeHTML(lesson.title) + '</h2><div class="study-objective"><strong>Objetivo de aprendizagem</strong><p>' + escapeHTML(lesson.objective) + '</p></div>' +
      '<div class="study-lesson-section"><h3>Entenda o conceito</h3>' + lesson.concepts.map(function (concept) { return '<p>' + escapeHTML(concept) + '</p>'; }).join('') + '</div>' +
      '<div class="study-example"><div class="eyebrow">' + escapeHTML(lesson.example.label || 'EXEMPLO') + '</div><p>' + escapeHTML(lesson.example.text) + '</p>' + audioButton + '</div>' +
      (lesson.vocabulary && lesson.vocabulary.length ? '<div class="study-vocabulary"><div class="eyebrow">VOCABULARY IN CONTEXT</div><div class="study-vocabulary-grid">' + lesson.vocabulary.map(function (item) { return '<div><strong>' + escapeHTML(item.word) + '</strong><span>' + escapeHTML(item.meaning) + '</span></div>'; }).join('') + '</div></div>' : '') +
      '<div class="study-practice"><div class="eyebrow">PRÁTICA ATIVA</div><h3>Agora é sua vez.</h3><p class="study-question-prompt">' + escapeHTML(question.prompt) + '</p>' + questionMarkup +
      '<div class="study-help-row"><button type="button" class="text-button" data-study-action="hint">Revelar uma pista</button><div id="study-hint" class="study-hint" hidden>' + escapeHTML(question.hint) + '</div></div><div id="study-feedback" aria-live="polite"></div>' +
      '<button type="button" class="button button-secondary study-complete-button" data-study-action="complete" ' + (completed ? 'disabled' : 'disabled') + '>' + (completed ? 'Aula já concluída ✓' : 'Marcar aula como concluída') + '</button>' +
      '</div></article>';
  }

  function showFeedback(message, correct) {
    const node = documentRef() && documentRef().getElementById('study-feedback');
    if (!node) return;
    node.className = 'study-feedback ' + (correct ? 'is-correct' : 'is-review');
    node.textContent = message;
  }

  function enableCompletion() {
    const button = documentRef() && documentRef().querySelector('[data-study-action="complete"]');
    if (button) button.disabled = false;
  }

  function nextLesson() {
    const path = pathById(state.pathId);
    if (!path) return;
    const current = path.lessons.findIndex(function (lesson) { return lesson.id === state.lessonId; });
    const next = path.lessons[current + 1];
    if (next) renderLesson(next.id);
    else renderPath(path.id);
  }

  function bind() {
    const doc = documentRef();
    if (!doc || doc.__mindForgeStudyBound) return;
    doc.__mindForgeStudyBound = true;
    doc.addEventListener('click', function (event) {
      const pathButton = event.target.closest('[data-study-path]');
      if (pathButton) { renderPath(pathButton.dataset.studyPath); return; }
      const lessonButton = event.target.closest('[data-study-lesson]');
      if (lessonButton) { renderLesson(lessonButton.dataset.studyLesson); return; }
      const speakButton = event.target.closest('[data-study-speak]');
      if (speakButton) {
        if (global.speechSynthesis && global.SpeechSynthesisUtterance) {
          global.speechSynthesis.cancel();
          const utterance = new global.SpeechSynthesisUtterance(speakButton.dataset.studySpeak);
          utterance.lang = 'en-US';
          global.speechSynthesis.speak(utterance);
        } else {
          showFeedback('A leitura em voz alta não está disponível neste navegador. Você ainda pode estudar o exemplo por escrito.', false);
        }
        return;
      }
      const actionButton = event.target.closest('[data-study-action]');
      if (!actionButton) return;
      const action = actionButton.dataset.studyAction;
      if (action === 'back') {
        if (state.lessonId) renderPath(state.pathId);
        else { state.pathId = null; renderOverview(); }
      } else if (action === 'hint') {
        const hint = doc.getElementById('study-hint');
        if (hint) hint.hidden = !hint.hidden;
      } else if (action === 'submit') {
        const selected = doc.querySelector('input[name="study-answer"]:checked');
        if (!selected) { showFeedback('Selecione uma alternativa antes de verificar.', false); return; }
        const path = pathById(state.pathId), lesson = lessonById(path, state.lessonId), question = lesson && lesson.question;
        const correct = question && Number(selected.value) === question.answer;
        state.solved = !!correct;
        showFeedback(correct ? 'Resposta correta. ' + question.explanation : 'Ainda não. Revise o conceito e tente novamente. ' + question.explanation, !!correct);
        if (correct) enableCompletion();
      } else if (action === 'self-check') {
        const path = pathById(state.pathId), lesson = lessonById(path, state.lessonId), question = lesson && lesson.question;
        const answer = (doc.getElementById('study-open-answer') || {}).value || '';
        const checked = doc.querySelectorAll('input[name="study-rubric"]:checked').length;
        if (answer.trim().length < 25) { showFeedback('Escreva uma justificativa desenvolvida antes de avaliar sua resposta.', false); return; }
        if (checked < 2) { showFeedback('Revise sua resposta e marque pelo menos dois critérios que ela realmente atende.', false); return; }
        state.answerDraft = answer;
        state.solved = true;
        showFeedback('Compare sua demonstração com o modelo e identifique qualquer etapa que esteja faltando. Modelo: ' + question.modelAnswer, true);
        enableCompletion();
      } else if (action === 'complete') {
        if (!state.solved) return;
        const path = pathById(state.pathId);
        if (!path) return;
        const data = storage();
        data.completed[state.lessonId] = true;
        saveProgress(data);
        renderPath(path.id);
      }
    });
    doc.addEventListener('input', function (event) {
      if (event.target && event.target.id === 'study-open-answer') state.answerDraft = event.target.value;
    });
  }

  const api = {
    paths: paths,
    init: function () { bind(); },
    render: function () { bind(); renderOverview(); },
    openPath: function (id) { bind(); renderPath(id); },
    progress: function () {
      return paths.reduce(function (result, path) {
        result[path.id] = { completed: completedCount(path), total: path.lessons.length, percent: progressPercent(path) };
        return result;
      }, {});
    },
    exportProgress: function () {
      return { version: 1, completed: Object.assign({}, storage().completed) };
    },
    importProgress: function (payload) {
      if (!payload || payload.version !== 1 || !payload.completed || typeof payload.completed !== 'object' || Array.isArray(payload.completed)) return false;
      const known = new Set(paths.reduce(function (ids, path) { return ids.concat(path.lessons.map(function (lesson) { return lesson.id; })); }, []));
      const completed = {};
      Object.keys(payload.completed).forEach(function (id) {
        if (known.has(id) && payload.completed[id] === true) completed[id] = true;
      });
      saveProgress({ version: 1, completed: completed });
      api.updateDashboard();
      api.renderProgress();
      return true;
    },
    updateDashboard: function () {
      const doc = documentRef();
      if (!doc) return;
      doc.querySelectorAll('[data-study-progress]').forEach(function (node) {
        const path = pathById(node.dataset.studyProgress);
        if (path) node.textContent = progressPercent(path) + '% concluído';
      });
      doc.querySelectorAll('[data-study-bar]').forEach(function (node) {
        const path = pathById(node.dataset.studyBar);
        if (path) node.style.width = progressPercent(path) + '%';
      });
    },
    renderProgress: function () {
      const doc = documentRef();
      const root = doc && doc.getElementById('study-path-progress-list');
      if (!root) return;
      root.innerHTML = paths.map(function (path) {
        const percent = progressPercent(path);
        return '<div class="study-progress-row"><div class="study-progress-row-copy"><strong>' + escapeHTML(path.title) + '</strong><span>' + completedCount(path) + ' de ' + path.lessons.length + ' aulas concluídas</span></div><div class="study-progress-row-track"><span style="width:' + percent + '%"></span></div><strong class="study-progress-percent">' + percent + '%</strong></div>';
      }).join('');
    },
    resetProgress: function () {
      saveProgress({ version: 1, completed: {} });
      state.pathId = null;
      state.lessonId = null;
      renderOverview();
      api.updateDashboard();
      api.renderProgress();
    }
  };

  global.MindForge = global.MindForge || {};
  global.MindForge.StudyCenter = api;
  if (global.document) bind();
})(window);
