(function (global) {
  'use strict';
  global.MindForgeStudyPrograms = {
    ceFR: {
      framework: 'Common European Framework of Reference for Languages (CEFR)',
      source: 'https://www.coe.int/en/web/common-european-framework-reference-languages',
      levels: [
        {id:'A1',name:'Breakthrough',canDo:'Compreender e usar expressões muito familiares; apresentar-se e responder a perguntas simples quando o interlocutor fala devagar e ajuda.',focus:'Frases básicas, vocabulário concreto, perguntas pessoais, instruções lentas e pronúncia inteligível.'},
        {id:'A2',name:'Waystage',canDo:'Compreender mensagens frequentes sobre assuntos imediatos; trocar informações simples e descrever aspectos da rotina e do passado.',focus:'Situações previsíveis, passado, comparação, planos, pedidos e textos curtos.'},
        {id:'B1',name:'Threshold',canDo:'Compreender os pontos principais de linguagem clara sobre temas familiares; lidar com situações de viagem e produzir textos conectados.',focus:'Narrativas, experiências, opinião fundamentada, hipótese, leitura de textos de interesse.'},
        {id:'B2',name:'Vantage',canDo:'Compreender ideias principais de textos complexos; interagir com fluência razoável e defender pontos de vista com clareza.',focus:'Argumentação, inferência, discurso indireto, voz passiva, nuance e fala espontânea.'},
        {id:'C1',name:'Effective Operational Proficiency',canDo:'Compreender textos longos e exigentes, reconhecer sentidos implícitos e usar a língua com flexibilidade em contextos sociais, acadêmicos e profissionais.',focus:'Registro, coesão sofisticada, modalização, retórica, síntese e precisão.'},
        {id:'C2',name:'Mastery',canDo:'Compreender praticamente tudo o que ouve ou lê, sintetizar fontes e expressar distinções sutis com precisão e naturalidade.',focus:'Nuance, ironia, idiomatismo, ambiguidade, síntese e adequação estilística.'}
      ]
    },
    pasUem2026: {
      edition: 'PAS/UEM 2026 · Etapa 2',
      status: 'Edição de referência já aplicada em 1º de novembro de 2026; não representa um edital futuro.',
      programUrl: 'https://www.vestibular.uem.br/provas/prog/progpas26.pdf',
      manualUrl: 'https://www.vestibular.uem.br/manuais/manual_candidato_64.pdf',
      eventUrl: 'https://www.vestibular.uem.br/evento_64.html',
      examFormat: {
        questions: 40, durationHours: 5,
        blocks: ['Língua Portuguesa e Literaturas em Língua Portuguesa (8 questões)','Arte, Educação Física e Língua Estrangeira escolhida (8 questões)','Filosofia, Geografia, História e Sociologia (8 questões)','Matemática (8 questões)','Biologia, Física e Química (8 questões)'],
        response: 'Cada item possui cinco afirmações codificadas 01, 02, 04, 08 e 16. A resposta é a soma dos códigos escolhidos. O valor máximo por item é 6 pontos; a pontuação parcial depende de selecionar afirmações verdadeiras sem assinalar afirmações falsas. Um item sem afirmações verdadeiras vale 6 pontos quando a resposta é 00.',
        essay: 'Há também produção textual, cuja pontuação máxima no manual é 120 pontos; a extensão indicada é de 15 a 22 linhas. Os gêneros devem ser conferidos no programa da edição.'
      },
      areas: [
        {id:'portugues',title:'Língua Portuguesa e Literaturas',subjects:[
          {name:'Língua Portuguesa',topics:['Compreensão e interpretação de textos de diferentes gêneros','Gêneros discursivos, condições de produção e circulação','Variação linguística e adequação à situação comunicativa','Concordância, regência e colocação pronominal','Formação e significação das palavras','Período composto, relações sintáticas e conectores','Sinonímia, antonímia, paronímia, polissemia e efeitos de sentido','Denotação, conotação, figuras de linguagem e modalizadores','Vozes sociais, discurso citado e organização argumentativa']},
          {name:'Redação',topics:['Carta de solicitação','Comentário crítico de postagens','Resposta argumentativa','Artigo de opinião','Adequação ao gênero, interlocutor, finalidade e tema','Coesão, coerência, progressão e organização de argumentos','Revisão linguística e respeito à extensão definida no manual']},
          {name:'Literaturas em Língua Portuguesa',topics:['Gonçalves Dias e Álvares de Azevedo','Castro Alves e Olavo Bilac','Cruz e Sousa e Augusto dos Anjos','Machado de Assis e Lima Barreto','Antero de Quental','Jarid Arraes e Mia Couto','Relações entre forma, contexto histórico, linguagem e interpretação']}
        ]},
        {id:'linguagens',title:'Arte, Educação Física e Língua Estrangeira',subjects:[
          {name:'Língua Inglesa',topics:['Leitura de textos literários, científicos, escolares e publicitários','Ideia principal, informações específicas, inferência e organização textual','Relações entre linguagem verbal e não verbal','Phrasal verbs e Genitive Case','Present Perfect e Past Perfect','Comparatives, adjectives, adverbs e emphasizers','Conjunctions, modal verbs, reflexive, relative e indefinite pronouns','Prepositions e first/second conditionals']},
          {name:'Arte',topics:['Música, voz, canto e música corporal','Orquestra, música ocidental romântica e moderna','MPB e música sertaneja','Artes visuais: Renascimento, Barroco e Neoclassicismo','Teatro engajado e Teatro do Oprimido','Teatro no Paraná, dança moderna e danças populares']},
          {name:'Educação Física',topics:['Jogos, cooperação, competição e cultura lúdica','Pluralidade das práticas esportivas e esporte inclusivo/adaptado','Ginásticas de condicionamento físico, saúde e prevenção','Danças urbanas, ritmo e expressão corporal','Lutas e artes marciais: práticas, contextos e respeito']}
        ]},
        {id:'humanas',title:'Ciências Humanas',subjects:[
          {name:'Filosofia',topics:['Ética das virtudes, ética deontológica e utilitarismo','Direitos humanos, bioética e ética ambiental','Filosofia política: pólis grega, Estado moderno e formas de governo','Estado, sociedade civil, soberania e cidadania','Liberalismo, socialismo, contratualismo e justiça distributiva']},
          {name:'Geografia',topics:['Geologia, relevo, clima, hidrografia e biomas do Brasil','Recursos naturais, impactos ambientais e sustentabilidade','Industrialização, distribuição industrial e matriz energética','Espaço rural: estrutura fundiária, trabalho, reforma agrária e tecnologia','Cooperativismo, fronteira agrícola, impactos e êxodo rural','Urbanização, hierarquia urbana, redes, fluxos e segregação socioespacial','População, indicadores, migrações, diversidade cultural e regionalização','Paraná: formação territorial, população, economia e redes']},
          {name:'História',topics:['Renascimento, Reforma, Revolução Científica e expansão marítima','Colonização das Américas, mercantilismo e sociedades indígenas','Revoluções burguesas inglesa e francesa; Revolução Industrial','Capitalismo, liberalismo, protecionismo e independências americanas','Conservadorismo, nacionalismo e socialismo','Formação dos Estados Unidos, expansão territorial, Guerra Civil e industrialização','Brasil Império (1822–1889): política, sociedade, economia e escravidão','Paraná no século XIX: povos indígenas, africanos e europeus, trabalho, conflitos e migrações']},
          {name:'Sociologia',topics:['Surgimento da Sociologia e modernidade','Marx, Weber e Durkheim: conceitos e métodos','Teorias sociológicas contemporâneas','Cultura, etnografia, antropologia, diversidade e etnocentrismo','Formação social e cultural brasileira','Trabalho, capitalismo, tecnologia, globalização e desigualdade']}
        ]},
        {id:'matematica',title:'Matemática',subjects:[
          {name:'Matemática',topics:['Princípios aditivo e multiplicativo da contagem','Fatorial, arranjos, combinações e permutações','Probabilidade em espaços amostrais finitos e equiprováveis','União e interseção de eventos','Congruência e semelhança de triângulos','Relações métricas no triângulo retângulo e trigonometria','Leis dos senos e dos cossenos','Áreas de polígonos e quadriláteros','Funções lineares e quadráticas: gráficos, raízes e sinais','Função inversa, máximo, mínimo e interpretação de problemas']}
        ]},
        {id:'natureza',title:'Ciências da Natureza',subjects:[
          {name:'Biologia',topics:['Taxonomia, classificação e critérios de organização dos seres vivos','Vírus e os reinos dos seres vivos','Morfologia e fisiologia animal e vegetal','Reprodução humana e aspectos biológicos relacionados']},
          {name:'Física',topics:['Hidrostática: pressão, Stevin, Pascal e Arquimedes','Hidrodinâmica: vazão, continuidade e Bernoulli','Termologia: temperatura, calor, dilatação e calorimetria','Gases, transformações e primeira lei da Termodinâmica','Entropia e noções de segunda lei da Termodinâmica']},
          {name:'Química',topics:['Soluções: concentração e propriedades','Cinética química e fatores que alteram a velocidade','Equilíbrio químico e deslocamento','Ácidos, bases e escala de pH','Termoquímica, entalpia e processos exotérmicos/endotérmicos']}
        ]}
      ],
      writingRubric: ['Atendimento ao tema e ao comando','Adequação ao gênero textual e ao interlocutor','Tese/ideias e desenvolvimento argumentativo','Organização, coesão e coerência','Precisão lexical e domínio da norma escrita']
    },
    obmep2026: {
      title: 'OBMEP 2026 · Nível 3 (Ensino Médio)',
      source: 'https://www.obmep.org.br/provas.htm',
      level: 'Nível 3 corresponde ao Ensino Médio.',
      firstPhase: '20 questões objetivas, cada uma com cinco alternativas e uma única correta; duração oficial indicada no regulamento: 2h30.',
      secondPhase: '6 questões discursivas, com justificativas e resolução desenvolvida. O regulamento indica até 20 pontos por questão, totalizando 120 pontos.',
      note: 'Os problemas criados dentro do MIND FORGE são autorais para treinamento; não são cópias nem questões oficiais da OBMEP.'
    }
  };
})(window);