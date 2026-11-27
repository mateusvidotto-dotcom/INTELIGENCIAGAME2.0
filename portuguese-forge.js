(function (global) {
  'use strict';
  const bank = global.MIND_FORGE_BANK;
  if (!bank || !Array.isArray(bank.units) || !bank.byId) throw new Error('Question bank must load before Portuguese Forge.');
  const Q = (prompt, options, answer, concept, steps, alternatives, takeaway, trap, hints, skill, difficulty) => [
    prompt, options, answer, concept,
    { concept, steps, alternatives, takeaway, trap, hints, skill, difficulty, authorship: 'autoral' }
  ];
  const U = (id, title, topic, goal, exam, level, passage, examples, tip, questions, writing, stimulus) => {
    const difficulty = /desafio/i.test(level) ? 'desafio' : /avançado/i.test(level) ? 'avancado' : /intermediário/i.test(level) ? 'intermediario' : 'basico';
    questions.forEach((question, index) => {
      const meta = question[4] || {};
      meta.id = meta.id || id + '-q' + (index + 1);
      meta.difficulty = meta.difficulty || difficulty;
      meta.skill = meta.skill || topic;
      meta.objective = meta.objective || goal;
      meta.authorship = 'autoral';
      question[4] = meta;
    });
    return {
      id, area: 'Língua Portuguesa', title, topic, goal, exams: exam, level, difficulty,
      passage, stimulus: stimulus || null, examples, tip, text: topic + '. ' + goal,
      q: questions, writing: writing || null, authored: true
    };
  };

  const units = [
    U('pt-inferencia-pressupostos','Inferência, pressupostos e subentendidos','Leitura inferencial e construção de sentidos',
      'Distinguir informação explícita, inferência sustentada, pressuposto linguístico e subentendido contextual.','ENEM','Avançado',
      'Texto autoral — A biblioteca depois do expediente\n\nNa semana passada, a biblioteca do bairro passou a abrir até as 21h em duas noites. A mudança foi apresentada como um simples ajuste de horário. Em poucas semanas, moradores que antes deixavam livros reservados passaram a retirá-los depois do trabalho. A coordenadora observou que o acervo não havia mudado; mudara a possibilidade de chegar até ele. A biblioteca, portanto, ampliou o acesso sem adquirir novos exemplares naquele período.',
      ['A ampliação do horário remove uma barreira de acesso, embora o acervo permaneça igual.','O conector “portanto” introduz a síntese argumentativa do parágrafo.'],
      'Separe o que o texto afirma literalmente do que se pode concluir a partir da relação entre horário, trabalho e retirada dos livros.',
      [
        Q('A inferência mais bem sustentada pelo texto é que',[
          'a comunidade não tinha interesse em leitura antes da mudança',
          'a disponibilidade de um serviço depende também de condições práticas de acesso',
          'a biblioteca precisava substituir todo o acervo para atrair leitores',
          'o horário noturno garante que todos os moradores leiam mais',
          'a reserva de livros deixou de existir após a mudança'
        ],1,'O acervo permaneceu igual, mas a possibilidade de chegar até ele mudou. A inferência válida relaciona o acesso à compatibilidade entre o horário de funcionamento e a rotina dos moradores.',
        ['Localize a oposição entre “o acervo não havia mudado” e “mudara a possibilidade de chegar até ele”.','Pergunte qual obstáculo foi alterado: a quantidade de livros ou a oportunidade de usar o serviço.','Escolha a alternativa que expressa essa relação sem afirmar que todos passaram a ler.'],
        ['O texto não informa falta de interesse anterior; essa conclusão extrapola os dados.','É a conclusão que liga a mudança de horário ao acesso efetivo.','A coordenadora afirma que o acervo não mudou; a troca integral não é sustentada.','O texto relata retiradas após a mudança, mas não garante comportamento de todos.','As reservas são mencionadas como algo que já existia; não há notícia de seu fim.'],
        'Inferir é construir uma conclusão apoiada por pistas textuais, não ampliar o texto com suposições.','Generalizar um resultado observado para toda a comunidade.',
        ['Compare o que permaneceu igual com o que efetivamente mudou.','Identifique qual barreira foi removida para quem trabalhava durante o dia.','Evite alternativas que transformam uma observação localizada em garantia universal.'],'Inferência e limites da evidência','avancado'),
        Q('A expressão “passaram a retirá-los depois do trabalho” pressupõe que',[
          'os moradores já haviam retirado todos os livros antes da mudança',
          'a retirada dos livros em horário compatível era uma dificuldade para parte dos moradores',
          'a biblioteca funcionava exclusivamente durante a madrugada',
          'os livros reservados eram gratuitos apenas à noite',
          'a coordenadora proibiu reservas no período diurno'
        ],1,'A construção “passaram a” apresenta uma mudança de comportamento. No contexto, o novo horário remove uma dificuldade prática anterior para parte dos moradores.',
        ['Observe o valor de mudança expresso por “passaram a”.','Relacione o novo comportamento à informação de que a biblioteca abriu à noite.','Conclua apenas o que a relação permite: havia uma dificuldade prática anterior para alguns usuários.'],
        ['O texto não menciona que todos os livros foram retirados.','A alternativa explica a mudança contextual sem afirmar uma impossibilidade absoluta.','Não há indicação de funcionamento exclusivo na madrugada.','O texto não menciona cobrança ou gratuidade.','Não há proibição de reservas.'],
        'Pressupostos são conteúdos tomados como pano de fundo por certas construções linguísticas e pelo contexto.','Tratar o pressuposto como uma informação explicitamente declarada.',
        ['Observe o sentido de mudança presente em “passaram a”.','Pergunte por que o novo horário poderia alterar o comportamento descrito.','A resposta deve indicar uma dificuldade anterior, mas sem exagerar seu alcance.'],'Pressuposição linguística','avancado'),
        Q('A frase “o acervo não havia mudado; mudara a possibilidade de chegar até ele” funciona principalmente como',[
          'uma negação da importância das bibliotecas',
          'uma comparação que desloca a explicação da falta de livros para as condições de acesso',
          'uma prova de que a leitura depende somente de renda',
          'uma descrição de compra de novos exemplares',
          'uma contradição sem relação com o período anterior'
        ],1,'A estrutura contrapõe a estabilidade do acervo à alteração das condições de acesso. O efeito é mostrar que a oferta material, sozinha, não explica a utilização do serviço.',
        ['Identifique os dois elementos contrastados na frase.','Observe que um permanece igual e o outro se altera.','Associe a comparação à conclusão sobre ampliação do acesso.'],
        ['A frase não desvaloriza a biblioteca; explica como ampliar seu uso.','A oposição entre acervo e acesso é o núcleo do argumento.','Renda não é mencionada como fator exclusivo.','O texto afirma que não houve aquisição de exemplares naquele período.','A relação é coerente com o argumento desenvolvido.'],
        'Uma oposição sintática pode reorganizar o foco da argumentação sem negar o valor do primeiro elemento.','Ler o ponto e vírgula como separação de ideias sem relação.',
        ['Compare os verbos “não havia mudado” e “mudara”.','Identifique qual fator aparece como novidade.','A frase explica o aumento de uso sem atribuí-lo à compra de livros.'],'Efeito de sentido e contraste','avancado')
      ]),

    U('pt-argumentacao-evidencia','Tese, evidência e contra-argumentação','Estrutura argumentativa e avaliação de razões',
      'Identificar tese, distinguir evidência de opinião, avaliar relações causais e compreender a função de um contra-argumento.','UFPR','Avançado',
      'Texto autoral — Sombra como infraestrutura urbana\n\nAmpliar a arborização de ruas deve integrar o planejamento urbano, sobretudo em áreas com pouca cobertura vegetal. Árvores oferecem sombra e podem tornar trajetos a pé mais confortáveis. O plantio, contudo, exige escolha de espécies adequadas, espaço para raízes e manutenção contínua. Esse custo é uma objeção relevante, mas não elimina a necessidade da política: indica que ela precisa ser planejada e acompanhada. Uma ação pública responsável compara custos de implantação e manutenção com benefícios ambientais e de uso do espaço, em vez de tratar o plantio como solução instantânea.',
      ['A tese defende integrar a arborização ao planejamento urbano, não plantar árvores indiscriminadamente.','A objeção sobre custos é reconhecida e respondida por uma exigência de planejamento.'],
      'Localize a posição defendida e verifique se cada razão apresentada realmente a sustenta.',
      [
        Q('A tese central do texto é que',[
          'o plantio de árvores deve ocorrer sem avaliação de espécies ou manutenção',
          'a arborização deve integrar o planejamento urbano com critérios técnicos e acompanhamento',
          'o custo de manutenção torna qualquer política de arborização inviável',
          'o conforto dos pedestres depende apenas de árvores',
          'os benefícios ambientais podem ser ignorados diante de custos imediatos'
        ],1,'A posição é qualificada no desenvolvimento: a arborização é defendida, mas precisa de planejamento, escolha de espécies e manutenção.',
        ['Identifique a recomendação da primeira frase.','Leia a ressalva introduzida por “contudo”.','Escolha a alternativa que preserva tanto a defesa da política quanto suas condições técnicas.'],
        ['A ausência de critérios é rejeitada pelo texto.','É a síntese que integra tese e qualificação.','O custo é tratado como objeção a considerar, não como motivo para inviabilidade total.','A expressão “podem tornar” não afirma dependência exclusiva.','O texto pede comparação de custos e benefícios.'],
        'Uma tese pode defender uma medida e explicitar condições para sua execução.','Confundir uma ressalva com abandono da tese.',
        ['Leia a primeira frase e observe como a tese é qualificada.','A posição não é “plantar a qualquer custo”; procure a condição que o autor acrescenta.','Compare os extremos com a alternativa que preserva o planejamento.'],'Identificação e delimitação da tese','avancado'),
        Q('A referência a escolha de espécies, espaço para raízes e manutenção cumpre a função de',[
          'apresentar condições concretas que qualificam a proposta e respondem a uma possível objeção',
          'demonstrar que árvores não oferecem sombra',
          'substituir a tese por uma lista sem função argumentativa',
          'provar que o custo é sempre maior que o benefício',
          'desviar o assunto para a botânica sem relação com a cidade'
        ],0,'Os elementos técnicos mostram que a proposta depende de planejamento. Eles respondem à objeção de custo e evitam apresentar o plantio como ação simples ou imediata.',
        ['Observe que esses elementos aparecem após a palavra “contudo”.','Relacione a lista ao problema de execução e manutenção.','Escolha a alternativa que explica a função argumentativa da ressalva.'],
        ['A lista qualifica a proposta e antecipa dificuldades de implementação.','O texto afirma que árvores oferecem sombra; não nega esse benefício.','A lista está ligada diretamente à viabilidade da tese.','Não há cálculo que permita afirmar que o custo sempre supera o benefício.','O tema continua sendo planejamento urbano.'],
        'Detalhes técnicos fortalecem um argumento quando mostram condições reais de implementação.','Tratar exemplos de execução como assunto secundário sem função persuasiva.',
        ['Observe a conjunção que introduz a lista: ela marca uma ressalva.','Pergunte que crítica um leitor poderia fazer à proposta.','A lista responde à crítica sem abandonar a ideia central.'],'Função de evidências e qualificações','avancado'),
        Q('A frase “Esse custo é uma objeção relevante, mas não elimina a necessidade da política” apresenta',[
          'um argumento de autoridade',
          'uma concessão seguida de refutação parcial',
          'uma relação de condição',
          'uma conclusão que contradiz a tese inicial',
          'uma enumeração de consequências'
        ],1,'O autor reconhece a força da objeção e limita seu alcance: o custo exige planejamento, mas não prova que a política deva ser abandonada.',
        ['Localize o reconhecimento da objeção.','Observe a conjunção adversativa “mas”.','Explique o movimento: reconhecer a crítica e responder a ela.'],
        ['Não há autoridade citada.','A estrutura admite um ponto e restringe sua conclusão.','Não há construção condicional com “se”.','A tese inicial é mantida com condições.','Não há lista de consequências.'],
        'Contra-argumentar é avaliar o que uma crítica realmente demonstra.','Confundir reconhecer uma objeção com concordar integralmente com ela.',
        ['Observe a relação entre as duas orações.','A segunda oração limita a consequência que poderia ser tirada da primeira.','Identifique a função do “mas” no avanço do raciocínio.'],'Contra-argumentação e refutação','avancado')
      ]),

    U('pt-falacias-causalidade','Falácias, generalização e causalidade','Validade argumentativa e limites das evidências',
      'Reconhecer generalização apressada, falsa dicotomia e inferência causal não demonstrada em discursos argumentativos.','ENEM','Desafio',
      'Texto autoral — Uma conclusão apressada\n\nApós observar três estudantes usando o celular durante uma explicação, um comentarista afirmou: “Celulares impedem a aprendizagem; toda escola que permite aparelhos fracassa”. Para defender a proibição, citou uma escola que restringiu os aparelhos e registrou melhora em uma avaliação. Não apresentou resultados anteriores, escolas de comparação nem informações sobre mudanças simultâneas, como acompanhamento pedagógico e tempo de estudo. Ao final, concluiu: “Ou proibimos todos os aparelhos, ou aceitaremos o fracasso escolar”.',
      ['Três casos individuais não sustentam uma conclusão sobre todas as escolas.','Uma melhora posterior à proibição não demonstra, isoladamente, que a proibição foi sua causa.'],
      'Pergunte se a conclusão é proporcional à evidência e se outras explicações foram consideradas.',
      [
        Q('O salto de três observações individuais para a afirmação de que “toda escola que permite aparelhos fracassa” caracteriza',[
          'generalização apressada','argumento por definição','analogia controlada','concessão','dedução necessária'
        ],0,'A conclusão universal é muito mais ampla do que a amostra apresentada. Três observações não permitem concluir que todas as escolas que permitem celulares fracassam.',
        ['Compare a quantidade de casos observados com o alcance da conclusão.','Observe a palavra absoluta “toda”.','Verifique se há amostra representativa ou comparação suficiente; o texto não apresenta.'],
        ['A conclusão extrapola três casos para todas as escolas.','Não há definição conceitual sendo aplicada.','Não há comparação estruturada entre situações equivalentes.','O trecho não reconhece uma objeção antes de responder.','A conclusão não decorre necessariamente das premissas.'],
        'A força de uma generalização depende da qualidade, diversidade e representatividade dos casos.','Confundir exemplo ilustrativo com prova de uma regra universal.',
        ['Compare o tamanho da observação com o alcance da conclusão.','Procure termos que ampliam a afirmação para todos os casos.','Pergunte que evidência seria necessária para sustentar uma regra geral.'],'Generalização apressada','desafio'),
        Q('O fato de uma escola ter melhorado depois de restringir celulares não prova, por si só, que a restrição causou a melhora porque',[
          'a sequência temporal não elimina explicações alternativas ou fatores simultâneos',
          'toda avaliação escolar é inválida',
          'a proibição sempre reduz a aprendizagem',
          'não é possível observar resultados educacionais',
          'uma melhora nunca pode ser medida'
        ],0,'Uma associação temporal não estabelece causalidade. Seria necessário controlar fatores concorrentes ou comparar grupos e períodos de forma adequada.',
        ['Identifique a sequência alegada: restringiu e depois melhorou.','Observe quais informações o texto diz que não foram apresentadas.','Conclua que há explicações concorrentes não examinadas.'],
        ['É a limitação central: ausência de controle e de comparação.','O texto não afirma que todas as avaliações sejam inválidas.','A alternativa apresenta outra generalização sem evidência.','Resultados educacionais podem ser observados com métodos adequados.','Não há motivo para afirmar que mudanças nunca podem ser medidas.'],
        'Para defender causalidade, é preciso examinar hipóteses alternativas, não apenas a ordem dos acontecimentos.','Confundir “depois de” com “por causa de”.',
        ['Diferencie sequência temporal de relação causal.','Observe as variáveis que não foram comparadas no texto.','Uma conclusão causal precisa afastar explicações alternativas plausíveis.'],'Causalidade e variáveis de confusão','desafio'),
        Q('A frase “Ou proibimos todos os aparelhos, ou aceitaremos o fracasso escolar” constrói',[
          'um falso dilema, pois apresenta apenas duas opções extremas',
          'uma analogia entre escolas',
          'uma definição operacional de aprendizagem',
          'uma conclusão baseada em amostragem aleatória',
          'uma concessão equilibrada'
        ],0,'O enunciado apresenta duas possibilidades extremas como se fossem as únicas. Há outras alternativas possíveis, como regras de uso pedagógico, horários e restrições por atividade.',
        ['Procure a estrutura “ou... ou...” e identifique as opções apresentadas.','Pergunte se existem soluções intermediárias ou diferentes.','Avalie se o texto demonstrou que as duas opções são exaustivas; não demonstrou.'],
        ['O dilema é falso porque ignora alternativas intermediárias e contextuais.','Não há analogia.','A frase não define como medir aprendizagem.','Não há amostragem aleatória.','Não reconhece objeção; impõe uma escolha binária.'],
        'Antes de aceitar uma escolha binária, verifique se as opções realmente esgotam as possibilidades.','Aceitar como completa uma lista de opções construída de forma tendenciosa.',
        ['Não aceite automaticamente as duas opções apresentadas.','Pense em regras de uso seletivas, acompanhamento e contextos distintos.','Classifique o raciocínio pelo modo como restringe artificialmente as escolhas.'],'Falsa dicotomia','desafio')
      ]),

    U('pt-coesao-referencia','Coesão, referenciação e coerência','Anáfora, conectivos e progressão temática',
      'Identificar referentes, interpretar conectivos e avaliar a continuidade lógica de um texto.','UFPR','Intermediário',
      'Texto autoral — Leitura em circulação\n\nA secretaria anunciou um programa de leitura para escolas rurais. A iniciativa prevê empréstimos itinerantes e encontros mensais. Embora o transporte dos livros exija planejamento, ele aproxima os acervos de comunidades distantes. Essa medida, portanto, não substitui as bibliotecas: amplia seu alcance. Quando os encontros são organizados com professores e famílias, a leitura deixa de ser apenas uma entrega de exemplares e se torna prática compartilhada.',
      ['“A iniciativa” retoma o programa de leitura; “essa medida” retoma a estratégia descrita.','“Embora” introduz concessão; “portanto” introduz conclusão.'],
      'Ao interpretar pronomes e conectivos, volte à relação entre as frases, não apenas à palavra isolada.',
      [
        Q('A expressão “Essa medida” retoma principalmente',[
          'a exigência de planejamento do transporte',
          'o programa de leitura com empréstimos itinerantes e encontros',
          'a distância entre as comunidades',
          'a atuação exclusiva da secretaria',
          'a substituição das bibliotecas por escolas'
        ],1,'A expressão resume a medida apresentada anteriormente: o programa com circulação de livros e encontros, e não apenas a necessidade logística mencionada na oração concessiva.',
        ['Localize o antecedente e leia também a frase precedente.','Observe que “essa medida” é retomada para explicar seu efeito sobre as bibliotecas.','Escolha o referente que resume a política descrita, não um detalhe isolado.'],
        ['O planejamento é uma condição logística, não a medida completa.','O programa é a ação central retomada pelo demonstrativo.','A distância é uma condição do problema, não uma política.','O texto inclui professores e famílias, portanto não fala em atuação exclusiva.','O texto afirma que o programa não substitui bibliotecas.'],
        'A referenciação pode retomar uma ideia inteira, e não apenas o substantivo mais próximo.','Escolher a palavra mais próxima sem verificar a coerência semântica.',
        ['Volte à sequência de ações descritas antes de “Essa medida”.','Pergunte qual ação pode ampliar o alcance das bibliotecas.','Não confunda a ação com uma condição necessária para executá-la.'],'Coesão referencial','intermediario'),
        Q('No período “Embora o transporte dos livros exija planejamento, ele aproxima os acervos de comunidades distantes”, “Embora” estabelece',[
          'adição de duas ações equivalentes',
          'concessão: apresenta uma dificuldade sem anular o benefício afirmado',
          'conclusão definitiva',
          'condição necessária para que o transporte exista',
          'explicação de causa única'
        ],1,'A oração concessiva admite uma dificuldade — a necessidade de planejamento —, mas a oração principal mantém o argumento de que o transporte aproxima acervos.',
        ['Separe a oração introduzida por “Embora” da oração principal.','Observe se a dificuldade impede ou apenas qualifica a ação.','Identifique a relação de concessão.'],
        ['Não há soma de ações.','A dificuldade é reconhecida, mas não cancela o benefício.','A conclusão está marcada por “portanto” na frase seguinte.','Não se trata de hipótese condicional.','O período não apresenta causa única.'],
        'Concessão reconhece um obstáculo sem transformá-lo em impedimento absoluto.','Interpretar toda oração subordinada como causa ou condição.',
        ['Leia o que vem depois da vírgula: a afirmação principal permanece positiva.','A primeira oração reconhece uma ressalva.','Pense na equivalência aproximada de “apesar de”.'],'Relações lógico-discursivas','intermediario'),
        Q('A progressão temática do texto ocorre porque',[
          'cada frase abandona o tema e introduz assunto sem relação',
          'o programa é apresentado, qualificado por uma dificuldade e relacionado a seus efeitos comunitários',
          'a conclusão contradiz a descrição inicial',
          'o texto enumera apenas problemas sem propor relação',
          'os conectivos funcionam como ornamento sem função lógica'
        ],1,'O parágrafo progride do anúncio da política para sua operação, reconhece uma condição de execução e conclui com o efeito social da ação articulada.',
        ['Identifique o tema que se mantém: o programa de leitura.','Resuma a função de cada frase em uma sequência.','Veja como a última frase amplia o alcance da ideia inicial.'],
        ['O tema é mantido ao longo do parágrafo.','A alternativa descreve a progressão do argumento.','Não há contradição entre a proposta e seus efeitos.','O texto também descreve benefícios e articulação comunitária.','Os conectivos marcam relações reais de concessão e conclusão.'],
        'Coerência global depende da continuidade do tema e do avanço organizado das informações.','Confundir progressão temática com repetição literal de palavras.',
        ['Resuma o assunto de cada frase em poucas palavras.','Verifique se uma informação prepara a seguinte.','Procure a relação entre a proposta inicial e o efeito final.'],'Progressão temática e coerência','intermediario')
      ]),

    U('pt-generos-ironia','Gêneros, ironia e estratégia retórica','Crônica, humor, intencionalidade e intertextualidade',
      'Analisar gênero, voz enunciativa, ironia e efeitos de sentido em textos de circulação social.','FUVEST','Avançado',
      'Crônica autoral — A fila eficiente\n\nO painel eletrônico anunciou que o atendimento seria iniciado em instantes. A frase permaneceu acesa por quarenta minutos, sempre com a mesma pontualidade. Um senhor comentou que, ao menos, a promessa era estável. A atendente sorriu e explicou que o sistema estava atualizando a previsão. Na saída, todos receberam um folheto sobre eficiência. Guardei o meu: era o único serviço concluído dentro do prazo.',
      ['A ironia nasce do contraste entre a linguagem institucional de eficiência e a experiência de espera.','O narrador participa da situação e encerra com uma avaliação crítica.'],
      'Observe a distância entre a linguagem literal das personagens e o que a situação permite compreender.',
      [
        Q('O efeito irônico do encerramento decorre de',[
          'elogio literal à eficiência de todos os serviços',
          'contraste entre o folheto sobre eficiência e a única entrega realmente pontual',
          'mudança do narrador para uma voz onisciente',
          'ausência de crítica à organização do atendimento',
          'descrição objetiva de um procedimento técnico'
        ],1,'A frase final usa “eficiência” de modo irônico: o folheto é a única coisa concluída no prazo, enquanto o atendimento atrasou.',
        ['Releia a informação de que a promessa permaneceu por quarenta minutos.','Compare o tema do folheto com o serviço efetivamente concluído.','Explique como a última frase inverte a expectativa criada pela palavra “eficiência”.'],
        ['O contexto contradiz uma leitura de elogio literal.','É o contraste que produz a crítica humorística.','A voz do narrador permanece em primeira pessoa.','A crítica está implícita no encerramento.','O texto é uma crônica, não um relatório técnico.'],
        'Ironia depende do contraste entre expressão, situação e intenção comunicativa.','Interpretar isoladamente a palavra “eficiência” e ignorar o contexto.',
        ['Identifique qual serviço atrasou e qual item foi entregue no prazo.','Compare o conteúdo do folheto com o funcionamento real do atendimento.','A última frase usa “eficiência” em sentido crítico, não elogioso.'],'Ironia e intencionalidade','avancado'),
        Q('A construção do texto aproxima-se de uma crônica porque',[
          'apresenta uma situação cotidiana, uma voz narrativa particular e uma observação crítica',
          'organiza dados estatísticos em linguagem impessoal',
          'instrui o leitor a executar um procedimento',
          'defende uma tese científica com metodologia experimental',
          'registra uma sequência normativa de obrigações'
        ],0,'A crônica parte de uma cena cotidiana e utiliza a observação do narrador para produzir humor e reflexão sobre um comportamento social.',
        ['Observe o cenário: atendimento, espera, painel e folheto.','Identifique a presença de um narrador que interpreta a cena.','Considere a crítica construída por um episódio breve.'],
        ['A cena cotidiana e a observação subjetiva são características da crônica.','Não há levantamento de dados.','O texto não é um manual.','Não há hipótese científica nem experimento.','Não apresenta normas ou obrigações.'],
        'O gênero textual é identificado pelo conjunto de finalidade, organização e linguagem, não por uma palavra isolada.','Confundir qualquer texto que menciona uma instituição com notícia ou relatório.',
        ['Observe se o texto pretende informar oficialmente ou provocar reflexão a partir de uma cena.','A presença de um narrador e de humor ajuda a caracterizar o gênero.','Relacione a situação breve à crítica social implícita.'],'Gêneros textuais e finalidade','avancado'),
        Q('A fala “ao menos, a promessa era estável” produz humor porque',[
          'confirma que o atendimento foi rápido',
          'transforma a repetição do atraso em falsa qualidade, expondo a inadequação da promessa',
          'apresenta uma informação estatística precisa',
          'nega que exista um painel eletrônico',
          'antecipa a solução técnica do sistema'
        ],1,'O comentário elogia ironicamente a estabilidade de uma promessa que não se cumpre. O humor surge da inversão do valor positivo de “estável”.',
        ['Observe o que está sendo chamado de estável: a promessa repetida.','Compare essa estabilidade com a ausência de atendimento.','Identifique a avaliação crítica escondida sob o elogio aparente.'],
        ['O atendimento não é descrito como rápido.','A alternativa explica a inversão irônica.','Não há estatística.','O painel é mencionado explicitamente.','A fala não oferece solução técnica.'],
        'O humor pode surgir quando uma característica positiva é aplicada a uma situação que a desmente.','Ler uma fala irônica como avaliação literal.',
        ['O personagem não elogia o resultado do atendimento.','Pergunte por que a promessa se repete sem se cumprir.','A frase parece elogio, mas o contexto transforma esse elogio em crítica.'],'Humor e subentendido','avancado')
      ]),

    U('pt-leitura-multimodal','Leitura de tabelas, gráficos e dados','Textos multimodais e interpretação quantitativa',
      'Ler dados em tabela e gráfico, distinguir quantidade de interpretação e evitar conclusões que ultrapassem a amostra.','ENEM','Intermediário',
      'Situação-problema autoral — Preferência declarada de deslocamento\n\nUma escola fictícia consultou 100 estudantes sobre o meio de deslocamento mais frequente até a escola. Os números abaixo foram criados exclusivamente para este exercício. Cada estudante indicou apenas uma opção. O levantamento descreve respostas declaradas e não mede distância, duração do trajeto ou emissão de poluentes.',
      ['Como foram ouvidos 100 estudantes e cada um indicou uma opção, o número de respostas coincide com o percentual.','O levantamento não permite inferir tempo de viagem nem impacto ambiental.'],
      'Leia título, unidade, universo da pesquisa e observações antes de comparar valores.',
      [
        Q('A diferença entre as respostas “ônibus” e “a pé” é de',[
          '10 pontos percentuais','14 pontos percentuais','18 pontos percentuais','28 pontos percentuais','42 pontos percentuais'
        ],1,'A tabela registra 42 respostas para ônibus e 28 para deslocamento a pé. Como o total é 100, os valores correspondem a 42% e 28%; a diferença é 14 pontos percentuais.',
        ['Localize os dois valores na tabela.','Subtraia o menor percentual do maior: 42 − 28.','Expresse a diferença em pontos percentuais, pois compara duas proporções.'],
        ['10 não corresponde à diferença dos valores.','14 é a diferença correta entre 42 e 28.','18 é o valor de bicicleta, não a diferença solicitada.','28 é o percentual de respostas a pé.','42 é o percentual de ônibus.'],
        'Ao comparar duas porcentagens, diferença absoluta em pontos percentuais não é o mesmo que variação relativa.','Responder com o valor de uma categoria em vez da diferença.',
        ['Compare somente as categorias citadas no comando.','Use os valores de ônibus e de deslocamento a pé.','Subtraia as proporções; não some nem calcule uma porcentagem sobre a outra.'],'Leitura e comparação de dados','intermediario'),
        Q('Somadas as respostas “ônibus” e “a pé”, o resultado corresponde a',[
          '52%','60%','70%','72%','88%'
        ],2,'As categorias são mutuamente exclusivas e somam 42 + 28 = 70 respostas em um total de 100, isto é, 70%.',
        ['Some os valores das duas categorias.','Confira que o total de respostas é 100.','Converta 70 de 100 em 70%.'],
        ['52% não resulta da soma.','60% é uma soma incorreta.','70% é o total correto.','72% excede a soma dos valores informados.','88% inclui categorias não solicitadas.'],
        'Verifique se as categorias são exclusivas antes de somar percentuais.','Somar percentuais de eventos que poderiam se sobrepor; neste cenário, cada pessoa escolheu um meio.',
        ['As categorias foram declaradas como uma única escolha por estudante.','Some 42 e 28.','Como o total é 100, o número de respostas também indica o percentual.'],'Soma de proporções','intermediario'),
        Q('Qual afirmação é sustentada diretamente pelo levantamento?',[
          'Estudantes que usam ônibus levam mais tempo no trajeto',
          'O ônibus foi a opção mais frequentemente declarada entre as quatro categorias',
          'O uso de bicicleta reduz a emissão de poluentes em toda a cidade',
          'A maioria dos estudantes mora a menos de dois quilômetros',
          'A escola deve alterar seus horários de entrada'
        ],1,'A informação permite comparar frequências declaradas. Não há dados de tempo, distância, emissões ou políticas de horário.',
        ['Separe os dados efetivamente coletados dos resultados que não foram medidos.','Compare os valores das quatro categorias.','Escolha a afirmação limitada ao que a tabela registra.'],
        ['Não há medição do tempo de viagem.','O ônibus tem a maior frequência declarada: 42 respostas.','Não foram medidos impactos ambientais.','A distância não aparece no levantamento.','Uma decisão de horário exigiria outras informações.'],
        'Um gráfico ou tabela sustenta apenas conclusões compatíveis com as variáveis efetivamente observadas.','Extrapolar uma preferência declarada para fenômenos que não foram medidos.',
        ['Leia a nota metodológica abaixo do cenário.','Não confunda meio escolhido com tempo, distância ou impacto.','A resposta deve mencionar apenas frequência de escolha.'],'Limites de inferência em dados','avancado'),
        Q('Por que não se pode concluir, com esses dados, qual grupo percorre o trajeto mais rápido?',[
          'porque o gráfico não apresenta duração de viagem, que não foi medida',
          'porque a soma das porcentagens é superior a 100%',
          'porque não existem dados de ônibus',
          'porque cada participante escolheu mais de uma opção',
          'porque os percentuais não podem ser comparados'
        ],0,'O levantamento registra o meio de deslocamento, mas não mede duração. Uma variável não permite responder automaticamente sobre outra.',
        ['Identifique a variável registrada na tabela.','Identifique a variável solicitada pela conclusão: duração do trajeto.','Verifique se a duração foi coletada; o enunciado diz que não.'],
        ['É a limitação metodológica correta.','As categorias somam 100%.','Há 42 respostas para ônibus.','Cada estudante indicou apenas uma opção.','Os percentuais podem ser comparados para a variável que foi medida.'],
        'Não responda sobre uma variável ausente apenas porque existe uma variável relacionada.','Confundir associação intuitiva com evidência medida.',
        ['A tabela registra preferência, não tempo.','O comando pergunta sobre rapidez, que depende da duração.','Procure se existe uma medida em minutos; ela não foi coletada.'],'Validade de conclusões quantitativas','avancado')
      ],null,null,null,{
        title:'Tabela e gráfico — pesquisa hipotética com 100 estudantes',
        author:'Dados simulados e autorais, produzidos apenas para aprendizagem',
        body:'Distribuição de respostas sobre o meio de deslocamento mais frequente até uma escola fictícia. Cada participante escolheu uma única categoria.',
        sections:[
          {type:'table',caption:'Respostas declaradas (n = 100)',headers:['Meio de deslocamento','Respostas','Percentual'],rows:[['Ônibus','42','42%'],['A pé','28','28%'],['Bicicleta','18','18%'],['Carro','12','12%'],['Total','100','100%']]},
          {type:'chart',chartType:'bar',caption:'Frequência de respostas por meio de deslocamento',alt:'Gráfico de barras: ônibus 42, a pé 28, bicicleta 18, carro 12',data:[{label:'Ônibus',value:42},{label:'A pé',value:28},{label:'Bicicleta',value:18},{label:'Carro',value:12}]}
        ]
      }),

    U('pt-redacao-planejamento','Produção textual: tese, projeto e revisão','Planejamento, paragrafação e reescrita',
      'Planejar um texto argumentativo, delimitar uma tese, desenvolver razões e revisar coesão, coerência e adequação ao gênero.','ENEM','Avançado',
      'Proposta autoral — Horários e acesso a equipamentos culturais\n\nConsidere a seguinte situação hipotética: uma cidade mantém bibliotecas públicas, mas parte dos moradores trabalha ou estuda nos horários em que elas funcionam. O debate local discute ampliar horários, criar unidades móveis ou fortalecer ações em escolas e centros comunitários. A tarefa é defender uma proposta viável, reconhecer uma objeção e justificar como a medida pode ampliar o acesso.',
      ['Uma tese precisa responder ao recorte temático, não apenas repetir o tema.','A argumentação deve explicar por que a medida funciona e considerar limites de implementação.'],
      'Antes de escrever, defina o leitor, a finalidade, a tese e a função de cada parágrafo.',
      [
        Q('Qual tese responde melhor ao recorte e permite desenvolver uma argumentação?',[
          'A cultura é importante para todas as pessoas e deve ser valorizada',
          'A cidade deve combinar horários ampliados e ações itinerantes, priorizando regiões cujo horário atual dificulta o acesso',
          'Bibliotecas são locais com livros, mesas e outros materiais',
          'Algumas cidades possuem equipamentos culturais diferentes',
          'É impossível resolver qualquer dificuldade de acesso a bibliotecas'
        ],1,'A alternativa delimita uma proposta, indica instrumentos e aponta o critério de prioridade. Isso oferece direção argumentativa que pode ser sustentada e discutida.',
        ['Verifique se a frase responde ao problema específico apresentado.','Procure uma posição defendida, não apenas uma afirmação genérica ou definição.','Confira se há uma proposta que permita apresentar razões e reconhecer limites.'],
        ['É uma afirmação ampla, mas não define uma proposta para o recorte.','A tese é específica, discutível e oferece caminhos de desenvolvimento.','É uma definição, não uma posição argumentativa.','É uma observação descritiva sem defesa.','É uma generalização absoluta e não apresenta solução.'],
        'Uma tese produtiva é específica o suficiente para orientar os parágrafos e ampla o bastante para ser argumentada.','Confundir repertório introdutório com uma tese efetiva.',
        ['A proposta deve tratar do acesso em horários incompatíveis.','Procure uma posição que combine medida e critério de prioridade.','Evite frases genéricas que poderiam iniciar qualquer redação sobre cultura.'],'Formulação de tese','avancado'),
        Q('Qual organização de parágrafos produz progressão argumentativa mais clara?',[
          'Repetir a mesma tese em todos os parágrafos, sem acrescentar razões',
          'Apresentar a proposta, explicar o obstáculo de horário, desenvolver medidas e responder a uma objeção de viabilidade',
          'Começar pela conclusão, inserir exemplos desconectados e terminar com uma pergunta sem resposta',
          'Listar dados sem explicar como sustentam a posição',
          'Alternar assuntos sem relação com o problema'
        ],1,'A sequência parte da posição central, demonstra o problema, desenvolve razões e enfrenta uma objeção. Cada etapa acrescenta uma função ao argumento.',
        ['Identifique o que cada parágrafo deveria acrescentar ao raciocínio.','Procure uma sequência em que problema, proposta, justificativa e objeção se conectem.','Descarte opções que repetem ou acumulam informações sem explicá-las.'],
        ['A repetição sem desenvolvimento não gera progressão.','A sequência apresenta funções argumentativas complementares.','A pergunta final não resolve o projeto de texto.','Dados precisam ser interpretados e relacionados à tese.','A alternância sem conexão prejudica a coerência.'],
        'Progressão argumentativa exige que cada parágrafo acrescente uma razão, evidência ou resposta relevante.','Confundir quantidade de parágrafos com desenvolvimento de ideias.',
        ['Pense na função de cada parágrafo, não apenas na ordem das frases.','Um texto precisa desenvolver a tese e tratar uma objeção.','Escolha a sequência em que cada parte cumpre um papel diferente e conectado.'],'Projeto de texto e progressão','avancado'),
        Q('Ao revisar um parágrafo, qual procedimento melhor verifica a relação entre evidência e argumento?',[
          'Manter qualquer dado, desde que seja numérico',
          'Perguntar o que a evidência demonstra, conferir sua pertinência e explicar a ligação com a tese',
          'Substituir todos os conectivos por “portanto”',
          'Retirar a tese para deixar o texto neutro',
          'Aumentar o tamanho do parágrafo sem mudar o raciocínio'
        ],1,'A revisão argumentativa não se limita à presença de números. É necessário saber o que a evidência sustenta e explicitar a relação com a posição defendida.',
        ['Identifique a afirmação que o parágrafo pretende sustentar.','Examine se a evidência tem relação com essa afirmação.','Confira se o texto explica a ligação em vez de apenas colocar dado e conclusão lado a lado.'],
        ['Um número sem contexto pode não sustentar a afirmação.','A alternativa descreve uma verificação de pertinência e de raciocínio.','O uso uniforme de “portanto” distorce relações lógicas diferentes.','Um texto argumentativo precisa de posição central.','Aumentar extensão não corrige falha de argumento.'],
        'Uma evidência precisa ser interpretada e conectada à afirmação que pretende sustentar.','Tratar dado numérico como prova automática.',
        ['Pergunte qual afirmação o dado pretende apoiar.','Verifique se a fonte, a medida e o recorte são pertinentes.','A revisão deve explicitar a ponte lógica entre evidência e tese.'],'Revisão de argumentação','avancado')
      ],
      {
        title:'Produção textual — Acesso a equipamentos culturais',
        prompt:'Escreva um texto dissertativo-argumentativo sobre como ampliar o acesso da população a equipamentos culturais quando os horários de funcionamento não correspondem à rotina dos moradores. Delimite uma tese, desenvolva dois argumentos com explicações, reconheça e responda a uma objeção de viabilidade e conclua com uma proposta compatível com o gênero. Esta é uma atividade autoral de treino, não uma proposta oficial do ENEM.',
        rubric:['Delimita o problema e apresenta uma tese específica.','Desenvolve dois argumentos distintos, explicando como sustentam a tese.','Utiliza exemplos ou evidências pertinentes sem inventar dados.','Reconhece uma objeção plausível e responde a ela.','Mantém progressão temática, coesão e coerência.','Conclui de acordo com o gênero e a finalidade solicitados.']
      })
  ];

  const existing = new Set(bank.units.map(unit => unit.id));
  units.forEach(unit => {
    if (existing.has(unit.id)) throw new Error('Portuguese Forge duplicate unit: ' + unit.id);
    bank.units.push(unit);
    bank.byId[unit.id] = unit;
  });
  global.MindForgePortuguese = {
    units,
    counts: () => ({ units: units.length, questions: units.reduce((sum, unit) => sum + unit.q.length, 0) })
  };
})(window);
