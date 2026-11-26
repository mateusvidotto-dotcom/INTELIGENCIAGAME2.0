(function (global) {
  'use strict';
  const LEVELS = [
    {id:'A1',name:'Beginner',canDo:'Compreender expressões familiares e comunicar informações pessoais simples.',focus:'Frases básicas, apresentações, perguntas, rotina e instruções curtas.'},
    {id:'A2',name:'Elementary',canDo:'Resolver trocas simples de informação e descrever rotina, passado e necessidades imediatas.',focus:'Passado, comparações, quantificadores, pedidos, planos e mensagens práticas.'},
    {id:'B1',name:'Intermediate',canDo:'Compreender os pontos principais de textos claros e expressar experiências e opiniões conectadas.',focus:'Experiências, hipótese, causa e consequência, narrativa e argumentação.'},
    {id:'B2',name:'Upper-intermediate',canDo:'Compreender ideias principais de textos complexos e defender pontos de vista com fluência.',focus:'Nuance, voz passiva, modalização, inferência, registro e argumentação.'},
    {id:'C1',name:'Advanced',canDo:'Compreender textos longos e exigentes, reconhecer sentidos implícitos e usar a língua com flexibilidade.',focus:'Retórica, coesão sofisticada, nominalização, inversão, precisão e síntese.'},
    {id:'C2',name:'Proficient',canDo:'Compreender praticamente tudo e expressar distinções sutis com precisão e naturalidade.',focus:'Ironia, implicatura, idiomatismo, ambiguidade, estilo e síntese crítica.'}
  ];
  const q = (prompt, options, answer, concept, steps, why, trap, takeaway) => ({
    prompt, options, answer, concept, steps, why, trap, takeaway
  });
  const lessons = [
    {
      id:'a1-sentence-engine',level:'A1',skill:'Grammar',title:'Build a clear English sentence',
      objective:'Organizar sujeito, verbo e complemento; usar o verbo be em afirmações, perguntas e negativas.',
      explanation:'A ordem mais comum de uma frase afirmativa em inglês é Subject + Verb + Object/Complement. Em português, o sujeito pode ficar implícito; em inglês, normalmente ele precisa aparecer. O verbo be funciona como verbo principal em frases como “She is ready”, e também pode vir antes do sujeito em perguntas: “Is she ready?”',
      examples:['My sister studies science. — Minha irmã estuda ciências.','They are ready. — Eles estão prontos.','Are you tired? — Você está cansado?','He is not at home. — Ele não está em casa.'],
      passage:'Mini-dialogue\\nA: Are you new at this school?\\nB: Yes, I am. My name is Leo.\\nA: Is your brother here too?\\nB: No, he is at home.',
      vocab:[['subject','sujeito','The subject usually comes before the verb.'],['although','embora','Although it is short, the sentence is complete.'],['ready','pronto','Are you ready to begin?'],['usually','geralmente','I usually study after lunch.']],
      questions:[
        q('Choose the sentence with the usual English word order.',['Studies Ana English every day.','Ana studies English every day.','English Ana every day studies.','Every day English studies Ana.'],1,'Uma frase afirmativa neutra geralmente segue sujeito + verbo + complemento.',
          ['Identifique quem pratica a ação: Ana.','Localize o verbo: studies.','Coloque o complemento depois do verbo: English.','A expressão every day pode aparecer no fim.'],
          ['Falta um sujeito antes do verbo; a ordem não é neutra.','É a ordem adequada: Ana (sujeito) + studies (verbo) + English (complemento).','A sequência coloca o objeto antes do sujeito e do verbo sem contexto especial.','A ordem não expressa a estrutura afirmativa mais comum.'],
          'Traduzir palavra por palavra a ordem do português.','Antes de traduzir, encontre sujeito, verbo e complemento.'),
        q('Complete the question: “___ your friends at school today?”',['Is','Am','Are','Be'],2,'O verbo be concorda com o sujeito plural your friends; em pergunta, vem antes do sujeito.',
          ['Encontre o sujeito: your friends.','Ele está no plural, equivalente a they.','A forma correspondente é are.','Na pergunta, are aparece antes do sujeito.'],
          ['Is é usado com he, she, it e sujeitos singulares.','Am é usado com I.','Are concorda com you, we, they e plurais.','Be é a forma-base e não completa essa pergunta finita.'],
          'Escolher o verbo pela palavra mais próxima, ignorando o núcleo do sujeito.','Localize o sujeito inteiro antes de escolher am, is ou are.'),
        q('Which sentence is a correct negative form?',['She not is ready.','She does not is ready.','She is not ready.','She do not ready.'],2,'Quando be é o verbo principal, a negativa é formada colocando not depois dele.',
          ['Na frase afirmativa: She is ready.','Mantenha o verbo be conjugado: is.','Acrescente not depois de is: She is not ready.'],
          ['A posição de not está incorreta na forma neutra.','Does é auxiliar usado com verbos comuns no present simple, não com be nessa estrutura.','É a forma negativa correta.','Falta o verbo principal e do não combina com be aqui.'],
          'Usar do/does automaticamente em todas as negativas.','Diferencie frases com be de frases com outros verbos.'),
        q('A pergunta “Is your brother here too?” pressupõe que o falante quer saber se o irmão está…',['em casa','também presente ali','na escola ontem','trabalhando agora'],1,'A expressão here too significa “aqui também”; a pergunta investiga a presença do irmão no mesmo local.',
          ['Traduza here como “aqui”.','Too acrescenta a ideia de “também”.','A pergunta trata da presença no local atual.'],
          ['A resposta do diálogo diz que ele está em casa; isso não é o que a pergunta pressupõe.','É o sentido da expressão.','Yesterday não aparece.','Não há referência a trabalho.'],
          'Confundir a informação da resposta com o significado da pergunta.','Separe o que foi perguntado do que foi respondido.')
      ]
    },
    {
      id:'a1-articles-quantity',level:'A1',skill:'Grammar',title:'Articles and basic quantity',
      objective:'Escolher a, an, the, some e any de acordo com som, contexto e tipo de substantivo.',
      explanation:'A e an introduzem normalmente um substantivo contável singular ainda não identificado. A escolha depende do som inicial: an apple, a book, an hour, a university. The aponta para algo identificável no contexto. Some aparece frequentemente em afirmações; any é comum em perguntas e negativas, embora existam outros usos.',
      examples:['an apple; a university; an hour','I bought a notebook. The notebook is blue.','There is some milk.','We do not have any eggs.'],
      passage:'At the market\\nI need some bread, an orange and a bottle of water. The orange is for my brother. We do not need any coffee today.',
      vocab:[['countable','contável','An apple is a countable noun.'],['bottle','garrafa','A bottle of water, please.'],['enough','suficiente','We have enough food.'],['market','mercado','The market opens at eight.']],
      questions:[
        q('Choose the correct article: “She waited for ___ hour.”',['a','an','the','no article'],1,'Hour começa com som vocálico porque o h é mudo; por isso, usa-se an.',
          ['A escolha depende do som inicial, não apenas da letra.','Em hour, o h não é pronunciado.','O primeiro som é vocálico.','Use an hour quando o referente não foi especificado antes.'],
          ['A ocorre antes de som consonantal.','É a forma correta.','The exige um referente identificável.','A frase precisa de artigo nesse uso singular contável.'],
          'Escolher pelo primeiro caractere escrito, não pela pronúncia.','Aprenda a regra pelo som: an hour, mas a university.'),
        q('Complete: “There are not ___ chairs in this room.”',['some','any','an','much'],1,'Any é a escolha comum em frases negativas com substantivo contável plural.',
          ['Chairs é plural e contável.','A frase é negativa: are not.','Use any: There are not any chairs.'],
          ['Some costuma aparecer em afirmações e em ofertas/pedidos específicos.','É a escolha natural nesta negativa.','An só acompanha substantivo singular com som vocálico.','Much acompanha substantivos incontáveis.'],
          'Memorizar some=afirmação e any=pergunta/negação como regra sem contexto.','Considere se o substantivo é contável ou incontável e se a frase é afirmativa ou negativa.'),
        q('After “I bought a notebook”, which sentence refers to that same, now identified notebook?',['I bought notebook.','The notebook is blue.','An notebook is blue.','Some notebook is blue.'],1,'Depois da primeira menção, the identifica o objeto já conhecido no discurso.',
          ['A primeira frase introduz um notebook.','O leitor agora sabe qual notebook está em foco.','Use the para retomar o referente específico.'],
          ['Falta artigo para esse singular contável.','É a retomada correta do objeto já mencionado.','An não combina com o som inicial de notebook.','Some não é usado dessa forma com singular contável.'],
          'Repetir a/an mesmo quando o objeto já foi identificado.','Pense na sequência: primeira menção a/an; retomada específica the.'),
        q('Which phrase is grammatically natural?',['much apples','many water','a few minutes','an information'],2,'A few é usado com substantivos contáveis plurais; minutes é contável.',
          ['Apples é plural contável, então many seria adequado.','Water é incontável; much water seria adequado.','Minutes é plural contável.','A few minutes significa “alguns minutos”.'],
          ['Much não acompanha normalmente substantivos contáveis plurais.','Many water erra porque water é incontável.','É a combinação correta.','Information é incontável e não recebe an nesse uso.'],
          'Traduzir “muito/muitos” sem classificar o substantivo.','Aprenda substantivos em conjunto com seu comportamento gramatical.'),
      ]
    },
    {
      id:'a1-reading-routine',level:'A1',skill:'Reading',title:'Read for key facts: a daily routine',
      objective:'Localizar informações explícitas, reconhecer sequência e distinguir início, duração e frequência.',
      explanation:'Na leitura A1, primeiro procure a situação geral. Depois localize nomes, horários, lugares, ações e marcadores de frequência. Não confunda starts (começa), finishes (termina) e usually (geralmente). A resposta deve ser sustentada por uma frase do texto.',
      examples:['Skim: leia rapidamente para descobrir o assunto.','Scan: procure uma informação específica, como horário ou nome.','Use pistas do contexto antes de traduzir cada palavra.'],
      passage:'A day at the community library\\nMia works at a small community library. She arrives at 8:45 and opens the doors at nine. In the morning, she helps children find books. After lunch, she organizes returned books and answers emails. She usually finishes work at three, but on Fridays she stays until five because the library hosts a reading club.',
      vocab:[['arrive','chegar','Mia arrives before nine.'],['returned','devolvidos','Returned books go on this shelf.'],['usually','geralmente','She usually finishes at three.'],['hosts','recebe / organiza','The library hosts a reading club.']],
      questions:[
        q('What time does Mia open the library?',['At 8:45.','At nine.','At three.','At five.'],1,'O texto distingue a chegada (8:45) da abertura das portas (nine).',
          ['Localize a frase “opens the doors at nine”.','Não confunda arrives com opens.','A resposta deve indicar o horário de abertura.'],
          ['8:45 é o horário de chegada.','É o horário em que abre as portas.','Three é o horário em que normalmente termina o trabalho.','Five é o horário especial de sexta-feira.'],
          'Confundir duas ações próximas no texto.','Sublinhe o verbo relacionado exatamente ao que a pergunta solicita.'),
        q('What does Mia do after lunch?',['She helps children find books.','She opens the doors.','She organizes returned books and answers emails.','She goes home.'],2,'After lunch organiza a sequência temporal: organizar livros devolvidos e responder e-mails.',
          ['Encontre o marcador after lunch.','Leia a ação que vem imediatamente depois dele.','Relacione organize returned books e answer emails à alternativa.'],
          ['Essa atividade acontece in the morning.','Abrir as portas acontece no início do dia.','É o que o texto afirma depois do almoço.','Ela costuma terminar às três ou às cinco; o texto não diz que vai para casa logo após o almoço.'],
          'Responder com uma ação verdadeira, mas localizada em outro momento do texto.','Use marcadores temporais para localizar a evidência correta.'),
        q('Why does Mia stay until five on Fridays?',['Because she has a reading club.','Because the library hosts a reading club.','Because she arrives late.','Because she answers emails all day.'],1,'Because introduz a causa explicitamente apresentada no texto.',
          ['Localize “but on Fridays she stays until five”.','Continue até a oração com because.','A causa é a realização de um clube de leitura na biblioteca.'],
          ['O texto não diz que Mia tem um clube particular.','É a causa expressa no texto.','O texto afirma que ela chega às 8:45.','Responder e-mails é uma tarefa do período após o almoço, não a razão apresentada para ficar até as cinco.'],
          'Escolher uma atividade do texto em vez da causa explicitamente conectada.','Quando a pergunta usa why, procure because ou outra relação causal.'),
        q('Which statement is supported by the text?',['Mia finishes at five every day.','The library opens at 8:45.','Mia helps children in the morning.','The reading club happens every day.'],2,'A alternativa correta é sustentada diretamente por uma frase do texto.',
          ['Compare cada alternativa com a informação explícita.','Mia usually finishes at three, with a Friday exception.','She helps children find books in the morning.'],
          ['Falso: cinco é o horário especial de sexta-feira.','Falso: ela chega às 8:45 e abre às nove.','Verdadeiro: é uma informação explícita.','O clube é citado apenas para sexta-feira, não todos os dias.'],
          'Transformar uma exceção em regra geral.','Preste atenção a usually, but e on Fridays.')
      ]
    },

    {
      id:'a2-past-narrative',level:'A2',skill:'Grammar',title:'Past simple and past continuous',
      objective:'Distinguir evento concluído de ação em andamento no passado e organizar uma narrativa curta.',
      explanation:'Past Simple apresenta um evento concluído: “The phone rang”. Past Continuous descreve uma ação em andamento em certo momento: “I was studying”. Uma estrutura frequente é when + Past Simple para o evento que interrompe uma ação em andamento: “I was studying when the phone rang”.',
      examples:['I was walking home when it started to rain.','They visited the museum yesterday.','At eight, we were having dinner.'],
      passage:'Yesterday afternoon, Noah was cycling home when he saw a dog near the road. He stopped, called the number on its collar and waited until the owner arrived.',
      vocab:[['while','enquanto','While I was reading, she called.'],['suddenly','de repente','Suddenly, the lights went out.'],['owner','dono(a)','The owner arrived ten minutes later.'],['collar','coleira','The dog had a phone number on its collar.']],
      questions:[
        q('Complete: “I ___ dinner when the lights went out.”',['cooked','was cooking','am cooking','have cooked'],1,'A ação de jantar estava em andamento quando ocorreu outro evento pontual.',
          ['Identifique a ação em progresso: dinner.','A interrupção é lights went out (Past Simple).','Use Past Continuous para o contexto em andamento: was cooking.'],
          ['Cooked apresenta a ação como evento concluído, sem destacar a continuidade.','É a forma adequada para a ação em andamento.','Am cooking é presente contínuo.','Have cooked é Present Perfect e não combina com a sequência temporal indicada.'],
          'Usar dois eventos no Past Simple mesmo quando um descreve o cenário em progresso.','Pergunte: qual ação estava acontecendo quando a outra ocorreu?'),
        q('Which sentence correctly describes a completed event yesterday?',['She has visited the museum yesterday.','She visits the museum yesterday.','She visited the museum yesterday.','She was visit the museum yesterday.'],2,'Um marcador de tempo passado concluído como yesterday combina com Past Simple.',
          ['Yesterday situa a ação em um tempo passado definido.','Use a forma passada de visit: visited.','A estrutura completa é She visited the museum yesterday.'],
          ['Present Perfect não combina normalmente com yesterday como tempo passado encerrado.','Visits é presente simples.','É o Past Simple correto.','Was deve ser seguido de verbo em -ing no contínuo.'],
          'Combinar Present Perfect com marcadores de tempo passado encerrado.','Yesterday, last week e in 2022 geralmente pedem Past Simple.'),
        q('In the passage, what happened while Noah was cycling?',['The owner arrived first.','He saw a dog near the road.','He was calling the number all afternoon.','The dog disappeared.'],1,'A estrutura narrativa distingue a ação em andamento (was cycling) do evento percebido (saw).',
          ['Localize “was cycling home when”.','Leia o evento após when.','O evento foi ver um cachorro perto da estrada.'],
          ['O dono chegou depois que Noah parou e ligou.','É o evento indicado pelo texto.','O texto diz que ele chamou o número; não que passou a tarde fazendo isso.','O desaparecimento não é mencionado.'],
          'Confundir a ação de fundo com o acontecimento que a interrompe.','When frequentemente introduz o evento pontual na narrativa.'),
        q('Choose the best connector: “___ I was waiting, the bus finally arrived.”',['While','Although','Because','Unless'],0,'While introduz uma ação em andamento que fornece o contexto temporal.',
          ['A oração “I was waiting” descreve duração.','A chegada do ônibus é o evento concluído.','While conecta ações simultâneas/uma ação em progresso e outra pontual.'],
          ['É o conector correto.','Although expressa concessão, não a relação temporal pretendida.','Because expressa causa.','Unless expressa condição negativa.'],
          'Escolher conectivos apenas por familiaridade.','Classifique a relação entre as duas orações antes de selecionar o conector.')
      ]
    },
    {
      id:'a2-modals-comparison',level:'A2',skill:'Grammar',title:'Advice, obligation and comparison',
      objective:'Usar should, must, have to e comparativos em situações cotidianas.',
      explanation:'Should oferece conselho; must expressa obrigação forte ou necessidade; have to costuma expressar obrigação determinada por circunstâncias ou regras. Comparativos com adjetivos curtos geralmente usam -er (cheaper), enquanto adjetivos longos usam more (more comfortable).',
      examples:['You should check the timetable.','Passengers have to show their tickets.','This route is cheaper than the other one.'],
      passage:'Travel advice\\nThe train is faster than the bus, but it is more expensive. If you want to save money, you should take the bus. Passengers have to buy a ticket before boarding.',
      vocab:[['cheaper','mais barato','The bus is cheaper than the train.'],['boarding','embarque','Boarding starts at six.'],['advice','conselho','My advice is to leave early.'],['crowded','lotado','The train is crowded in the morning.']],
      questions:[
        q('You look exhausted. You ___ get some rest.',['should','mustn’t','have','are'],0,'Should é usado para recomendar uma ação.',
          ['A frase expressa conselho, não uma lei ou proibição.','Depois de should, use o verbo na forma base.','A estrutura correta é should get.'],
          ['É o modal de conselho adequado.','Mustn’t expressa proibição.','Have isolado não forma essa recomendação.','Are exigiria outra estrutura, como are going to.'],
          'Tratar should e must como equivalentes em intensidade.','Use should para recomendação; reserve must para obrigação forte.'),
        q('According to the passage, which statement is true?',['The bus is faster and more expensive.','The train is slower than the bus.','The train is faster but costs more.','The bus is the most expensive option.'],2,'A relação de contraste é marcada por faster than e more expensive.',
          ['Encontre a frase inicial do texto.','Associe faster ao trem e more expensive ao trem.','Mantenha as duas informações na mesma alternativa.'],
          ['Inverte as informações do texto.','O texto diz que o trem é mais rápido.','É a comparação exata do texto.','O texto diz que o ônibus é mais barato.'],
          'Ler o comparativo certo, mas atribuí-lo ao meio de transporte errado.','Marque sujeito e característica de cada comparação.'),
        q('Complete: “Passengers ___ buy a ticket before boarding.”',['should to','have to','must to','has to'],1,'Have to expressa obrigação e é seguido pelo verbo base sem to adicional.',
          ['O aviso descreve uma exigência para passageiros.','Use have to com sujeito plural passengers.','Depois de have to, use buy.'],
          ['Should to é incorreto; should não recebe to antes do verbo.','É a forma adequada.','Must é seguido diretamente do verbo base, sem to.','Has to é usado com he/she/it, não passengers.'],
          'Adicionar to depois de must ou should.','Should/must + verbo base; have to + verbo base.'),
        q('Which sentence makes a correct comparison?',['This bag is more cheap than that one.','This bag is cheaper than that one.','This bag is cheapest than that one.','This bag cheaper that one.'],1,'Cheap é adjetivo curto e normalmente forma o comparativo com -er.',
          ['Identifique o adjetivo: cheap.','Forme o comparativo: cheaper.','Use than para introduzir o segundo termo.'],
          ['More cheap não é a forma comparativa neutra padrão.','É a forma correta.','Cheapest é superlativo, não comparativo.','Falta o verbo e o conector than.'],
          'Usar more com todo adjetivo.','Aprenda os padrões comparativos e as formas irregulares.')
      ]
    },
    {
      id:'a2-practical-email',level:'A2',skill:'Reading',title:'Read a practical email',
      objective:'Identificar objetivo, detalhes e ação solicitada em mensagens funcionais.',
      explanation:'E-mails práticos costumam apresentar motivo, detalhes e pedido. Leia o assunto, identifique o que a pessoa quer e procure datas, horários e condições. Uma inferência deve ser baseada em pistas do texto, não em suposições.',
      examples:['I am writing to ask about…','Could you please confirm…?','I look forward to hearing from you.'],
      passage:'Subject: Saturday workshop\\nHello,\\nI registered for the photography workshop on Saturday, but I have not received the confirmation email. Could you please check whether my place is reserved? I can arrive fifteen minutes early if needed.\\nThank you,\\nDaniel',
      vocab:[['registered','inscreveu-se','I registered for the course.'],['confirmation','confirmação','Please send a confirmation.'],['reserved','reservado','Your seat is reserved.'],['if needed','se necessário','I can help if needed.']],
      questions:[
        q('Why is Daniel writing?',['To cancel the workshop.','To ask whether his place is reserved.','To change the workshop date.','To complain about the photographer.'],1,'O objetivo comunicativo aparece no pedido: verificar se a vaga está reservada.',
          ['Leia a frase Could you please check…?','Identifique o objeto do pedido: whether my place is reserved.','Diferencie confirmar vaga de cancelar inscrição.'],
          ['O texto não solicita cancelamento.','É o propósito do e-mail.','Não há pedido de mudança de data.','Não há reclamação sobre o instrutor.'],
          'Escolher um assunto relacionado ao tema, mas não ao objetivo comunicativo.','Pergunte: o que o remetente quer que o destinatário faça?'),
        q('What problem has Daniel experienced?',['He has not received a confirmation email.','He has lost his camera.','He cannot arrive on Saturday.','He paid for the wrong course.'],0,'A informação explícita é que o e-mail de confirmação ainda não chegou.',
          ['Localize “I have not received”.','O objeto da frase é the confirmation email.','Essa é a dificuldade relatada.'],
          ['É o problema declarado.','Câmera não é mencionada.','Ele diz que pode chegar mais cedo.','Pagamento e curso errado não aparecem.'],
          'Inferir problemas não mencionados pelo texto.','Responda com evidência explícita antes de fazer qualquer inferência.'),
        q('What does “if needed” mean in this email?',['because it is impossible','only on Sundays','if it is necessary','although he refuses'],2,'If needed equivale a “se for necessário”.',
          ['Observe a frase: I can arrive fifteen minutes early if needed.','O trecho indica uma condição.','O sentido é que ele pode chegar cedo caso isso seja necessário.'],
          ['Because expressaria causa.','Não há referência a domingos.','É o significado correto.','Although indica concessão e refuses contradiz a disposição do remetente.'],
          'Traduzir uma expressão fixa literalmente sem observar a função.','Aprenda expressões com exemplos de uso completos.'),
        q('Which tone best describes Daniel’s email?',['Aggressive and insulting.','Polite and practical.','Sarcastic and humorous.','Uninterested and careless.'],1,'Fórmulas como Could you please e Thank you constroem um tom educado e objetivo.',
          ['Observe a forma de tratamento e o pedido.','O remetente agradece e oferece flexibilidade.','O objetivo é resolver um problema prático.'],
          ['Não há insultos nem agressividade.','É a descrição adequada.','Não há ironia ou humor sarcástico.','O remetente demonstra interesse em confirmar a vaga.'],
          'Julgar o tom pelo assunto do problema, em vez das escolhas linguísticas.','Analise vocabulário, modalização e fórmulas de cortesia.')
      ]
    },

    {
      id:'b1-perfect-experience',level:'B1',skill:'Grammar',title:'Present Perfect and Past Simple',
      objective:'Distinguir experiência ligada ao presente de evento passado situado em tempo concluído.',
      explanation:'Present Perfect (have/has + past participle) liga uma experiência ou resultado passado ao presente, sem fixar necessariamente quando ocorreu. Past Simple apresenta um evento em um tempo passado concluído: yesterday, last year, in 2022. Compare: “I have visited London” e “I visited London in 2022”.',
      examples:['I have read three books this month.','She went to Canada in 2021.','Have you ever tried sushi?'],
      passage:'A short interview\\nInterviewer: Have you ever worked abroad?\\nMaya: Yes, I have. I worked in Dublin for six months in 2023. I have kept in touch with my colleagues since then.',
      vocab:[['ever','alguma vez','Have you ever travelled alone?'],['since','desde','I have lived here since 2020.'],['colleague','colega de trabalho','My colleagues are helpful.'],['experience','experiência','It was a valuable experience.']],
      questions:[
        q('Choose the correct sentence.',['I have seen that film yesterday.','I saw that film yesterday.','I see that film yesterday.','I have saw that film yesterday.'],1,'Yesterday é um marcador de tempo passado encerrado e pede Past Simple.',
          ['Identifique o tempo indicado: yesterday.','Escolha o passado simples de see: saw.','A forma correta é I saw that film yesterday.'],
          ['Present Perfect não combina normalmente com yesterday nesse uso.','É a forma correta.','See está no presente.','Depois de have, exige-se particípio: seen, não saw.'],
          'Usar have/has porque a frase fala de uma experiência, mesmo com tempo passado definido.','O marcador temporal é decisivo: yesterday → Past Simple.'),
        q('In the interview, why does Maya use “I have kept in touch”?',['The contact began and remains relevant now.','She is describing one finished action at a known time.','She has never contacted them.','The action will happen next year.'],0,'Since then conecta a relação passada ao presente; Present Perfect enfatiza continuidade/resultado atual.',
          ['Observe since then.','A expressão cobre o período desde 2023 até agora.','Have kept indica contato mantido até o presente.'],
          ['É a interpretação correta.','Não há um momento concluído especificado para o contato.','O texto afirma que ela manteve contato.','Não é futuro.'],
          'Tratar Present Perfect como passado simples sem relação com o presente.','Procure pistas como since, for, already, yet e ever.'),
        q('Complete: “We ___ here for two years.”',['live','lived','have lived','are live'],2,'For two years indica duração iniciada no passado e ainda válida no presente.',
          ['A duração começou no passado.','A frase não indica que a situação terminou.','Use Present Perfect: have lived.'],
          ['Present Simple não expressa bem a duração iniciada no passado neste contexto.','Past Simple sugeriria período concluído.','É a forma apropriada.','Are live é gramaticalmente incorreto.'],
          'Usar Past Simple com for sem verificar se o período continua.','Pergunte se a situação ainda é verdadeira.'),
        q('Which question asks about life experience without specifying when?',['Did you travel to Japan in 2022?','Have you ever travelled to Japan?','Were you travelling yesterday?','Do you travel to Japan last year?'],1,'Have you ever…? pergunta sobre experiência de vida sem determinar uma data específica.',
          ['Observe que a pergunta não traz um momento passado definido.','Ever amplia a pergunta para qualquer momento da vida até agora.','Use Present Perfect.'],
          ['A pergunta especifica 2022 e usa Past Simple.','É a pergunta adequada para experiência.','Yesterday exigiria um evento passado situado; além disso, o foco é diferente.','Do you travel não combina com last year.'],
          'Achar que todas as perguntas sobre passado exigem did.','Experiência de vida até agora frequentemente usa Have you ever…?')
      ]
    },
    {
      id:'b1-conditionals-links',level:'B1',skill:'Grammar',title:'Conditionals and logical connectors',
      objective:'Usar first/second conditional e conectores para expressar consequência, hipótese e contraste.',
      explanation:'First Conditional descreve uma condição possível no futuro: If + Present Simple, will + base verb. Second Conditional apresenta hipótese mais distante ou imaginária: If + Past Simple, would + base verb. Conectores como although, however e therefore indicam concessão/contraste e consequência.',
      examples:['If it rains, we will stay home.','If I had more time, I would learn another language.','Although it was difficult, she continued.'],
      passage:'Planning a project\\nIf the team finishes the survey this week, it will analyse the results next Monday. However, if the response rate is too low, the researchers would need to collect more data before drawing conclusions.',
      vocab:[['survey','pesquisa / levantamento','We completed a short survey.'],['response rate','taxa de resposta','The response rate was low.'],['however','contudo','The idea is useful; however, it is expensive.'],['draw a conclusion','tirar uma conclusão','Do not draw a conclusion too early.']],
      questions:[
        q('Complete: “If she studies regularly, she ___ more confident.”',['would feel','felt','will feel','feels yesterday'],2,'First Conditional usa Present Simple na condição e will + verbo base na consequência possível.',
          ['A condição é possível: if she studies.','Use Present Simple depois de if.','Na consequência futura, use will feel.'],
          ['Would feel pertence normalmente ao Second Conditional.','Felt é passado simples.','É a forma correta.','A expressão yesterday é incompatível com o futuro condicional.'],
          'Usar will imediatamente depois de if em uma condição real comum.','No First Conditional: if + present, will + base verb.'),
        q('Which sentence describes an imaginary situation?',['If I had more time, I would learn Japanese.','If I have time, I will call you.','If water reaches 100°C at sea level, it boils.','If she arrives, tell me.'],0,'Second Conditional apresenta situação imaginária ou pouco provável: if + Past Simple, would + base verb.',
          ['Compare a condição com uma possibilidade real imediata.','Had more time apresenta hipótese distante do presente.','Would learn completa o resultado hipotético.'],
          ['É a forma hipotética.','First Conditional: possibilidade real.','Zero Conditional: fato geral.','Imperative condicional, não hipótese imaginária.'],
          'Confundir passado formal do Second Conditional com passado cronológico.','O Second Conditional pode falar de uma situação presente imaginária.'),
        q('The connector “however” in the passage introduces…',['a result','a contrast or qualification','a time sequence','a cause'],1,'However introduz contraste ou ressalva em relação ao que veio antes.',
          ['A primeira frase apresenta um plano.','A segunda começa com uma limitação possível.','O conector marca contraste/qualificação.'],
          ['Therefore seria típico de resultado.','É a função correta.','Then/afterwards indicariam sequência temporal.','Because indicaria causa.'],
          'Escolher um conector só pela tradução aproximada.','Leia as duas ideias e identifique a relação lógica entre elas.'),
        q('What is the most careful conclusion about the project?',['The team must publish results even with too few responses.','A low response rate may require more data before conclusions are drawn.','The survey is already complete and proves the hypothesis.','The researchers should ignore limitations.'],1,'O texto condiciona a conclusão à qualidade da amostra; uma resposta baixa pode exigir dados adicionais.',
          ['Identifique a condição “if the response rate is too low”.','Leia a consequência: collect more data.','A recomendação é não concluir antes de avaliar os dados.'],
          ['O texto não manda publicar independentemente da qualidade dos dados.','É a inferência coerente.','Não há prova final apresentada.','O texto enfatiza a limitação, não que seja ignorada.'],
          'Transformar uma condição metodológica em certeza absoluta.','Preserve o grau de certeza do texto: may, would need e if são importantes.')
      ]
    },
    {
      id:'b1-reading-claim-evidence',level:'B1',skill:'Reading',title:'Separate claims, reasons and evidence',
      objective:'Identificar tese, argumento, evidência e inferência em um texto opinativo.',
      explanation:'Um texto argumentativo pode apresentar uma claim (afirmação), reasons (razões) e evidence (evidências). Um exemplo ilustra; um dado apoia; uma opinião revela a posição do autor. Não trate correlação como causa sem evidência suficiente.',
      examples:['Claim: Public libraries remain important.','Reason: They provide access to resources.','Evidence: A survey reports usage patterns.'],
      passage:'Why local libraries still matter\\nDigital services have made information easier to access, but they have not removed every barrier. A local library can provide internet access, quiet study space and help with information skills. In a recent community survey, many respondents said they used the library to access services they could not easily use at home. This does not prove that libraries solve digital exclusion on their own, but it suggests that they remain an important part of a wider response.',
      vocab:[['barrier','barreira','Cost can be a barrier to access.'],['respondent','entrevistado / respondente','Each respondent completed a survey.'],['exclusion','exclusão','Digital exclusion affects access.'],['wider','mais amplo','This issue needs a wider response.']],
      questions:[
        q('What is the writer’s main claim?',['Digital services have solved every access problem.','Local libraries still play an important role.','Libraries should replace the internet.','Surveys always prove causation.'],1,'A tese é que bibliotecas continuam importantes, mesmo com a expansão dos serviços digitais.',
          ['Observe o título e a última frase.','O autor reconhece o avanço digital, mas aponta barreiras persistentes.','A conclusão sustenta a relevância das bibliotecas.'],
          ['A primeira frase rejeita a ideia de que todos os obstáculos desapareceram.','É a tese central.','O texto não sugere substituir a internet.','A ressalva final evita dizer que a pesquisa prova causalidade.'],
          'Confundir uma informação de contexto com a tese defendida.','Procure a posição que organiza todos os argumentos.'),
        q('Why does the writer mention the community survey?',['To show that libraries are used for practical access needs.','To prove that every respondent is unemployed.','To replace the argument with a personal story.','To demonstrate that digital services do not exist.'],0,'A pesquisa oferece evidência empírica de que a biblioteca atende necessidades concretas de acesso.',
          ['A survey registra respostas de membros da comunidade.','Os respondentes descrevem serviços que não conseguem usar facilmente em casa.','O dado reforça o argumento sobre utilidade prática.'],
          ['É a função do dado.','Nada informa sobre emprego.','O dado complementa a argumentação.','O próprio texto reconhece a existência de serviços digitais.'],
          'Atribuir ao dado uma conclusão que ele não mede.','Pergunte: qual afirmação específica esta evidência apoia?'),
        q('The phrase “on their own” means…',['without help or support from anything else','in the past','at the same time','for free'],0,'On their own significa isoladamente, sem apoio de outros recursos ou medidas.',
          ['Leia a estrutura: libraries solve digital exclusion on their own.','O autor diz que elas não resolvem todo o problema sozinhas.','A expressão limita a extensão da afirmação.'],
          ['É o sentido correto.','A expressão não tem referência temporal.','At the same time é outra expressão.','For free significa gratuitamente.'],
          'Traduzir uma expressão idiomática por cada palavra separada.','Aprenda chunks (blocos de linguagem) no contexto.'),
        q('Which inference is best supported?',['Libraries are useless because information is online.','Libraries can complement digital services by reducing some access barriers.','Every community has identical needs.','The survey proves libraries are the only solution.'],1,'A conclusão preserva o limite indicado: bibliotecas ajudam, mas fazem parte de uma resposta mais ampla.',
          ['Combine os serviços oferecidos pelas bibliotecas com a ressalva final.','O texto não diz que bibliotecas substituem todos os serviços.','A inferência adequada é de complementaridade.'],
          ['Contraria o argumento.','É a inferência mais equilibrada.','O texto não afirma igualdade de necessidades.','O texto rejeita explicitamente uma conclusão tão forte.'],
          'Transformar “contribui” em “resolve tudo”.','Mantenha a força da afirmação proporcional à evidência.')
      ]
    },

    {
      id:'b2-passive-reporting',level:'B2',skill:'Grammar',title:'Passive voice and reporting language',
      objective:'Escolher voz passiva e verbos de relato para destacar processo, resultado ou fonte.',
      explanation:'A voz passiva coloca o foco no objeto ou resultado: “The samples were analysed”. Reporting verbs (suggest, claim, report, indicate) ajudam a atribuir uma afirmação à fonte. Em escrita acadêmica, expressões como appears to, may indicate e is likely to evitam certeza maior do que a evidência permite.',
      examples:['The samples were analysed by the team.','The report suggests that the trend is changing.','The results may indicate a weak association.'],
      passage:'A report on urban trees\\nThe samples were collected in three neighbourhoods and were analysed by an independent team. The report suggests that shaded streets may be associated with lower surface temperatures. The authors caution that other factors were not fully controlled.',
      vocab:[['suggest','sugerir / indicar','The results suggest a possible link.'],['caution','alertar / advertir','The authors caution readers.'],['surface','superfície','Surface temperature can vary.'],['controlled','controlado','Not all variables were controlled.']],
      questions:[
        q('Complete the passive sentence: “The samples ___ by the researchers yesterday.”',['were analysed','analysed by','were analysing by','was analysed'],0,'The samples são objeto da ação; a voz passiva usa be + past participle e concorda no plural.',
          ['O sujeito da frase é the samples.','A amostra recebe a ação, não a executa.','Past Simple passive plural: were analysed.'],
          ['É a forma correta: were + past participle, concordando com samples no plural.','Analysed by não possui o auxiliar necessário para formar uma passiva finita.','Were analysing exigiria uma ação em progresso e não se encaixa no enunciado.','Was não concorda com o sujeito plural samples.'],
          'Misturar o agente da ação com o sujeito gramatical.','Na passiva, o objeto da ativa vira sujeito e recebe be + particípio.'),
        q('Why does the report use “may be associated with” rather than “causes”?',['To express certainty about a proven cause.','To avoid claiming causation when the evidence supports only a possible association.','To say that the study collected no data.','To describe a completed action in the past.'],1,'May be associated with modaliza o grau de certeza e não transforma correlação em causalidade.',
          ['Observe may: ele reduz a certeza.','Associated with indica uma relação observada.','Causes afirmaria causalidade direta, que o texto não estabeleceu.'],
          ['A expressão evita certeza excessiva, não a afirma.','É a razão adequada.','O texto descreve coleta e análise de amostras.','A expressão não é um tempo passado.'],
          'Substituir linguagem cautelosa por uma afirmação causal forte.','Use a força verbal compatível com o desenho do estudo.'),
        q('Which sentence correctly reports the source’s position?',['The report suggests that shaded streets may be cooler.','The report proves every tree prevents heat.','The authors deny that temperatures were measured.','The report was suggesting by the team.'],0,'Suggests atribui a interpretação ao relatório, e may be preserva a cautela.',
          ['A fonte apresenta uma possível associação.','Use reporting verb no presente para resumir a conclusão.','Mantenha o modal may para não exagerar a evidência.'],
          ['É a paráfrase mais fiel.','Proves/every exagera o alcance.','O texto diz que houve coleta e análise.','A construção passiva está incorreta.'],
          'Parafrasear uma fonte aumentando a certeza da afirmação.','Em resumo acadêmico, preserve limitações e modalizadores.'),
      ]
    },
    {
      id:'b2-modals-deduction',level:'B2',skill:'Grammar',title:'Modal verbs for deduction and nuance',
      objective:'Expressar dedução, possibilidade, obrigação e crítica retrospectiva com modais.',
      explanation:'Must have + particípio expressa dedução forte sobre o passado; might have/could have indicam possibilidade; can’t have expressa impossibilidade provável. Should have + particípio frequentemente indica uma ação que teria sido melhor ou esperada, mas não ocorreu.',
      examples:['She must have forgotten the meeting.','They might have taken the earlier train.','You should have checked the figures.'],
      passage:'A delayed report\\nThe report is late. The analyst must have underestimated the time needed to verify the figures. She might have asked for help earlier, but she wanted to finish the work independently.',
      vocab:[['underestimate','subestimar','Do not underestimate the task.'],['verify','verificar','Verify the figures before publishing.'],['independently','de forma independente','She worked independently.'],['deadline','prazo','The deadline is tomorrow.']],
      questions:[
        q('The report is late and the analyst misjudged the workload. She ___ the time required.',['must have underestimated','must underestimate yesterday','can have underestimated','should to underestimate'],0,'Must have + past participle expressa dedução forte sobre uma situação passada.',
          ['A frase trata de uma conclusão sobre o passado.','Use must have + particípio.','Underestimate é regular: underestimated.'],
          ['É a estrutura correta.','A ordem e o tempo verbal estão incorretos.','Can have não é a forma comum para dedução afirmativa nesse contexto.','Should to é gramaticalmente incorreto.'],
          'Confundir must have (dedução passada) com must + verbo (obrigação presente/futura).','Depois de modal + have, use o particípio passado.'),
        q('“She might have asked for help” suggests that asking for help…',['certainly happened','was possible, but is not presented as certain','is impossible now and in the past','is a legal obligation'],1,'Might have indica possibilidade passada sem certeza.',
          ['Observe might, que reduz certeza.','A forma have asked aponta para passado.','O texto não confirma que ela pediu ajuda.'],
          ['Might não comunica certeza.','É o significado correto.','Não é uma impossibilidade.','Não há obrigação legal no texto.'],
          'Ler might como will ou must.','Organize os modais em uma escala de certeza e função.'),
        q('Which sentence expresses regret or criticism about a past decision?',['You should check the figures now.','You should have checked the figures earlier.','You must check the figures tomorrow.','You might check the figures if you want.'],1,'Should have + particípio expressa que uma ação anterior teria sido aconselhável, mas não ocorreu ou não foi feita.',
          ['A expressão earlier localiza a ação no passado.','Should have checked avalia retrospectivamente a decisão.','Isso pode comunicar crítica ou arrependimento.'],
          ['É recomendação atual.','É a forma retrospectiva adequada.','É obrigação futura.','É possibilidade/opção, não crítica passada.'],
          'Usar should + base verb quando o enunciado pede avaliação de algo que já passou.','Should have + particípio aponta para uma alternativa melhor no passado.'),
        q('Which paraphrase keeps the level of certainty? “The analyst might have asked for help.”',['The analyst definitely asked for help.','It is possible that the analyst asked for help.','The analyst was forbidden to ask for help.','The analyst will ask for help.'],1,'Paráfrases adequadas mantêm o grau de certeza e a referência temporal do modal original.',
          ['Might comunica possibilidade.','Have asked aponta para o passado.','A paráfrase deve preservar ambos: possibilidade + passado.'],
          ['Definitely aumenta a certeza.','É a paráfrase fiel.','Forbidden introduz proibição inexistente.','Will muda para futuro.'],
          'Parafrasear mantendo o tema, mas mudando a certeza ou o tempo.','Preserve significado, modalidade e referência temporal.')
      ]
    },
    {
      id:'b2-research-reading',level:'B2',skill:'Reading',title:'Read research claims critically',
      objective:'Distinguir associação, causalidade, limitação metodológica e conclusão proporcional.',
      explanation:'Textos acadêmicos usam linguagem de cautela porque resultados dependem de amostra, método, controles e contexto. Association não prova causation. Uma conclusão responsável indica o que os dados apoiam e o que ainda não permitem afirmar.',
      examples:['The findings are consistent with…','The study does not establish causation.','Further research is needed to determine…'],
      passage:'Feedback and retention\\nA study followed two groups of learners for eight weeks. The group that received regular feedback showed higher retention scores at the end of the period. However, the groups were not randomly assigned, and the researchers note that motivation may have differed between them. The findings are consistent with a benefit of feedback, but they do not establish that feedback alone caused the difference.',
      vocab:[['retention','retenção','Retention was measured after eight weeks.'],['randomly assigned','designados aleatoriamente','Participants were randomly assigned.'],['consistent with','compatível com','The evidence is consistent with this explanation.'],['alone','por si só','The method alone cannot explain the result.']],
      questions:[
        q('What did the study observe?',['Both groups had identical retention scores.','The group receiving regular feedback had higher retention scores.','Feedback was proven to be the only cause.','The study lasted eight months.'],1,'O resultado observado é maior retenção no grupo com feedback regular.',
          ['Localize a frase “showed higher retention scores”.','Identifique qual grupo recebeu a intervenção.','Não transforme a observação em prova causal.'],
          ['O texto afirma diferença de resultados.','É a observação correta.','O texto diz explicitamente que não estabeleceu que feedback alone caused the difference.','A duração foi oito semanas.'],
          'Confundir resultado observado com explicação causal comprovada.','Separe resultado, interpretação e causalidade.'),
        q('Why do the authors mention that the groups were not randomly assigned?',['To show a possible limitation in the comparison.','To prove that motivation was identical.','To say the study had no participants.','To demonstrate that feedback was harmful.'],0,'A ausência de alocação aleatória pode permitir diferenças prévias entre os grupos, como motivação.',
          ['Random assignment ajuda a equilibrar fatores entre grupos.','Sem randomização, outras diferenças podem explicar parte do resultado.','A ressalva limita a força da inferência causal.'],
          ['É a função metodológica da informação.','O texto diz que motivation may have differed.','Há dois grupos de participantes.','Não há conclusão de dano.'],
          'Ignorar limitações porque o resultado parece convincente.','Pergunte quais variáveis alternativas podem explicar o resultado.'),
        q('Which conclusion is most defensible?',['Feedback alone caused the improvement in all learners.','The study provides evidence consistent with a benefit, but causal certainty is limited.','The study proves that motivation has no effect.','No conclusion of any kind can be drawn.'],1,'A conclusão proporcional reconhece o padrão observado e a limitação do desenho de pesquisa.',
          ['Considere a diferença de retenção.','Considere a falta de randomização.','Formule conclusão que preserve evidência e incerteza.'],
          ['Exagera certeza e generaliza para all learners.','É a conclusão mais equilibrada.','A motivação pode ter diferido; não foi descartada.','A evidência permite uma conclusão limitada, não nenhuma.'],
          'Ir de uma limitação metodológica para ceticismo absoluto ou certeza absoluta.','Conclusões científicas devem ser proporcionais à força do método.'),
        q('In this passage, “consistent with” is closest in meaning to…',['in conflict with','compatible with','identical to','unrelated to'],1,'Consistent with significa compatível com, não uma prova definitiva de identidade ou causalidade.',
          ['Leia a frase sobre os achados.','Os resultados são compatíveis com um benefício do feedback.','A expressão é cautelosa.'],
          ['In conflict with é o oposto.','É o sentido correto.','Identical to é forte demais.','Unrelated to contradiz a frase.'],
          'Achar que “consistent with” significa “proves”.','Aprenda expressões acadêmicas pelo grau de certeza que carregam.')
      ]
    },

    {
      id:'c1-inversion-register',level:'C1',skill:'Grammar',title:'Inversion and emphasis in formal English',
      objective:'Reconhecer inversão após expressões negativas e estruturas clivadas de ênfase.',
      explanation:'Em registros formais, certas expressões negativas no início da frase provocam inversão entre auxiliar e sujeito: “Never have I seen…”; “Only after the meeting did we understand…”. Cleft sentences também dão foco: “What matters is the evidence.” Essas estruturas são marcadas; não devem ser usadas em toda frase.',
      examples:['Rarely do researchers make such a claim.','Only after reviewing the data did we notice the error.','What matters is how the evidence was collected.'],
      passage:'A formal review\\nOnly after the second analysis did the committee recognise the limitation. Rarely had the original report acknowledged such uncertainty. What mattered most was not the size of the claim, but the quality of the evidence.',
      vocab:[['acknowledge','reconhecer / admitir','The report acknowledges a limitation.'],['rarely','raramente','Rarely do we see such a pattern.'],['limitation','limitação','The study has a clear limitation.'],['emphasis','ênfase','The structure adds emphasis.']],
      questions:[
        q('Choose the correct formal inversion.',['Never I have seen such evidence.','Never have I seen such evidence.','Never did I have seen such evidence.','Never seen I have such evidence.'],1,'Quando Never inicia a oração com sentido negativo, o auxiliar vem antes do sujeito.',
          ['Identifique Never como advérbio negativo inicial.','O tempo é Present Perfect: have seen.','Inverta auxiliar e sujeito: Never have I seen…'],
          ['Falta a inversão do auxiliar.','É a forma correta.','Did não pode coexistir com have seen nessa estrutura.','A ordem está incorreta.'],
          'Inverter o verbo principal em vez do auxiliar.','Em inversão negativa, localize o auxiliar e coloque-o antes do sujeito.'),
        q('Complete: “Only after the meeting ___ the problem.”',['we understood','did we understand','we did understood','understood we'],1,'Only after no início da oração provoca inversão; com did, o verbo principal volta à forma base.',
          ['Only after the meeting introduz uma expressão restritiva inicial.','O tempo é Past Simple.','Use did + sujeito + understand.'],
          ['Não há inversão.','É a forma adequada: did we understand.','Depois de did, use understand, não understood.','A ordem não corresponde à construção padrão.'],
          'Manter a flexão de passado no verbo principal depois de did.','Did carrega o passado; o verbo principal fica na forma base.'),
        q('What is the function of “What mattered most was…”?',['To ask a direct question.','To place emphasis on the following idea.','To introduce a condition.','To report an unfinished action.'],1,'A cleft-like structure destaca o elemento que o autor considera central.',
          ['Observe What mattered most.','A estrutura não busca uma resposta interrogativa.','Ela anuncia a informação que receberá destaque.'],
          ['Não é uma pergunta direta.','É a função de ênfase.','Não há condição.','Não é um tempo progressivo.'],
          'Confundir a forma interrogativa de what com uma pergunta real.','Analise a função discursiva, não apenas o formato da primeira palavra.'),
        q('Which version is appropriate for a formal report?',['The results are kind of weird.','The findings appear to indicate a potential discrepancy.','The data is super strange.','The numbers are, like, off.'],1,'Um relatório formal prefere léxico preciso e modalização explícita.',
          ['Identifique o gênero: formal report.','Evite coloquialismos vagos como kind of, super e like.','Use findings, appear to indicate e potential discrepancy para expressar cautela.'],
          ['É coloquial e imprecisa.','É a versão mais adequada ao registro formal.','É informal e avaliativa.','É coloquial e vaga.'],
          'Achar que palavras longas bastam para tornar um texto acadêmico.','Formalidade é precisão e adequação, não ornamentação.')
      ]
    },
    {
      id:'c1-hedging-cohesion',level:'C1',skill:'Grammar',title:'Hedging, cohesion and academic stance',
      objective:'Modalizar afirmações, escolher conectores de concessão e organizar progressão acadêmica.',
      explanation:'Hedging é o uso de recursos linguísticos que calibram a força de uma afirmação: may, tends to, appears to, arguably, to some extent. Nominalisation transforma processos em nomes (analyse → analysis), podendo compactar textos acadêmicos. Conectores como nevertheless, whereas e consequently organizam relações lógicas diferentes.',
      examples:['The results may suggest a shift.','The interpretation remains tentative.','Whereas the first group improved, the second remained stable.'],
      passage:'A cautious conclusion\\nThe intervention appears to have improved participation, although the evidence remains preliminary. The increase may partly reflect the novelty of the activity. Further observation is therefore required before the method is recommended more widely.',
      vocab:[['preliminary','preliminar','These are preliminary findings.'],['tentative','provisório / cauteloso','A tentative conclusion is appropriate.'],['whereas','ao passo que','The first result improved, whereas the second did not.'],['nevertheless','mesmo assim / contudo','The sample was small; nevertheless, it offers useful clues.']],
      questions:[
        q('Which sentence uses the most appropriate hedging for preliminary evidence?',['The intervention unquestionably proves success.','The intervention may have contributed to the improvement.','The intervention always causes improvement.','There is no possible relationship.'],1,'May have contributed expressa possibilidade sem afirmar causalidade definitiva.',
          ['O texto classifica a evidência como preliminar.','A afirmação precisa ser cautelosa.','May have contributed expressa contribuição possível, não certeza absoluta.'],
          ['Unquestionably e proves exageram a certeza.','É uma formulação calibrada.','Always generaliza sem base.','A alternativa nega qualquer relação, o que também ultrapassa a evidência.'],
          'Confundir cautela metodológica com ausência total de evidência.','Ajuste a certeza à qualidade dos dados.'),
        q('Which connector best completes the sentence? “The sample was relatively small; ___, the pattern deserves further study.”',['whereas','nevertheless','because','unless'],1,'Nevertheless apresenta uma ressalva seguida de uma ideia que se mantém apesar dela.',
          ['A primeira oração apresenta uma limitação.','A segunda afirma que o padrão ainda merece estudo.','A relação é concessiva: apesar do tamanho da amostra, vale investigar.'],
          ['Whereas compara duas orações.','É o conector de concessão adequado.','Because introduz causa.','Unless introduz condição negativa.'],
          'Usar um conector de causa quando o texto expressa contraste.','Nomeie a relação lógica antes de escolher o conector.'),
        q('Which option is the clearest nominalisation of “The researchers analysed the results”?',['The researchers were analytical results.','The analysis of the results was carried out by the researchers.','The researchers analysing results.','The results analysed the researchers.'],1,'Analysis é o substantivo derivado de analyse e permite compactar o processo em uma construção nominal.',
          ['Identifique o verbo central: analysed.','O nome correspondente é analysis.','Reorganize a frase preservando agente e objeto.'],
          ['A construção é semanticamente e gramaticalmente inadequada.','É a nominalização correta, embora mais passiva/nominal.','É um fragmento sem verbo finito.','Inverte agente e objeto.'],
          'Transformar verbos em nomes e esquecer as relações semânticas originais.','Ao nominalizar, preserve quem executa a ação e sobre o que ela recai.'),
        q('What is the author’s position in the passage?',['The intervention is proven effective in every context.','The evidence is promising but not yet sufficient for a broad recommendation.','The intervention should be abandoned immediately.','The novelty effect has been ruled out.'],1,'O texto reconhece um resultado promissor, mas destaca limitações e necessidade de observação adicional.',
          ['Localize appears to have improved participation.','Leia a ressalva although evidence remains preliminary.','Leia a recomendação final: further observation is required.'],
          ['A alternativa exagera o alcance e a certeza.','É a síntese proporcional.','O texto não recomenda abandono imediato.','O texto diz que o efeito da novidade pode explicar parte do resultado.'],
          'Ignorar modalizadores e ressalvas ao resumir uma posição.','Uma síntese acadêmica deve preservar as qualificações do autor.')
      ]
    },
    {
      id:'c1-editorial-reading',level:'C1',skill:'Reading',title:'Read implied meaning in an editorial',
      objective:'Interpret concessões, pressupostos, retórica e limites de uma argumentação complexa.',
      explanation:'Em textos avançados, a tese pode aparecer distribuída por concessões e ressalvas. Observe verbos de atitude, pressupostos, escolhas retóricas e o que o autor deliberadamente não afirma. Uma interpretação forte conecta várias pistas, em vez de depender de uma palavra isolada.',
      examples:['Admittedly… introduces a concession.','This is not to say that… limits a possible misreading.','The author’s qualification narrows the claim.'],
      passage:'The promise of green streets\\nFew would dispute that trees make urban streets more pleasant. Yet the argument for urban greenery should not rest on aesthetics alone. Shade can reduce heat exposure, while vegetation may support biodiversity and improve the experience of public space. Admittedly, planting trees is not a substitute for housing policy, reliable transport or adequate healthcare. This is not to say that greenery is a minor concern; rather, it should be treated as one component of a broader commitment to liveable cities.',
      vocab:[['aesthetics','estética','The debate goes beyond aesthetics.'],['exposure','exposição','Shade can reduce heat exposure.'],['substitute','substituto','Trees are not a substitute for transport policy.'],['liveable','habitável / agradável para viver','A liveable city supports different residents.']],
      questions:[
        q('What is the central claim of the editorial?',['Urban greenery is irrelevant compared with housing.','Urban greenery matters, but should be part of a broader urban policy.','Trees alone can solve urban inequality.','Aesthetics is the only reason to plant trees.'],1,'A conclusão defende vegetação urbana como componente relevante, mas não como solução isolada.',
          ['Observe a última frase, marcada por rather.','Relacione a ressalva sobre moradia, transporte e saúde.','A posição é integrada: greenery importa dentro de uma política urbana ampla.'],
          ['O texto não diz que greenery é irrelevante.','É a tese equilibrada.','A ressalva rejeita soluções isoladas.','O texto diz explicitamente that the argument should not rest on aesthetics alone.'],
          'Ler uma concessão como se fosse a conclusão do autor.','A posição final costuma integrar a concessão e a ressalva.'),
        q('Why does the author write “This is not to say that greenery is a minor concern”?',['To withdraw the argument entirely.','To prevent readers from interpreting the concession as dismissal.','To claim that healthcare is unimportant.','To introduce a new unrelated topic.'],1,'A frase limita uma possível interpretação equivocada: reconhecer outras prioridades não significa considerar árvores irrelevantes.',
          ['A frase anterior diz que árvores não substituem outras políticas.','O autor antecipa uma leitura excessiva dessa ressalva.','A construção corrige essa interpretação: não é uma preocupação menor.'],
          ['O autor não abandona o argumento.','É a função retórica da frase.','O texto lista saúde como dimensão necessária.','O tópico continua sendo política urbana.'],
          'Ignorar frases metadiscursivas que orientam a leitura do argumento.','Observe expressões que antecipam e corrigem possíveis objeções.'),
        q('The word “Admittedly” signals…',['a concession','a definition','a chronology','a numerical result'],0,'Admittedly reconhece um ponto válido antes de restringir ou qualificar a tese.',
          ['Leia a oração após Admittedly.','Ela admite que arborização não substitui políticas fundamentais.','Essa admissão é uma concessão argumentativa.'],
          ['É o sentido correto.','Não introduz uma definição.','Não organiza cronologia.','Não apresenta número.'],
          'Confundir concessão com concordância total.','Conceder um ponto não significa abandonar a tese principal.'),
        q('Which interpretation goes beyond what the text supports?',['Trees can help reduce heat exposure.','Urban greenery can improve public space.','Tree planting alone can replace housing and healthcare policy.','A liveable city requires several kinds of public commitment.'],2,'O texto afirma explicitamente que o plantio de árvores não substitui políticas de moradia, transporte e saúde.',
          ['Compare cada afirmação com o texto.','Procure a que contradiz a ressalva explícita.','A alternativa C transforma uma medida complementar em substituição total.'],
          ['Está alinhada ao trecho sobre shade.','O texto menciona a experiência do espaço público.','Contradiz a afirmação expressa no texto.','É compatível com a conclusão ampla.'],
          'Concluir mais do que o texto permite.','Procure a alternativa que extrapola ou inverte uma ressalva.')
      ]
    },

    {
      id:'c2-irony-implicature',level:'C2',skill:'Pragmatics',title:'Irony, understatement and implied meaning',
      objective:'Interpretar sentido implícito, eufemismo e ironia a partir do contexto e do tom.',
      explanation:'Em níveis avançados, o significado não está apenas nas palavras literais. Understatement minimiza algo de modo deliberado; irony pode dizer o contrário do que se pretende comunicar; implicature é uma conclusão contextual não expressa diretamente. O contexto, a situação e a relação entre interlocutores são essenciais.',
      examples:['“That was a slight delay” after a five-hour wait may be understatement.','“Brilliant idea” can be sincere or ironic, depending on context.','“It is getting late” may indirectly suggest leaving.'],
      passage:'After the server failed for the third time, the project manager looked at the blank screen and said, “Well, that is mildly inconvenient.” Nobody laughed. The meeting had already been delayed by four hours.',
      vocab:[['understatement','eufemismo / minimização','Calling a disaster “a minor problem” may be understatement.'],['implicature','implicatura / sentido implícito','The implicature depends on context.'],['mildly','levemente','The result was mildly surprising.'],['blunt','direto / brusco','His criticism was unusually blunt.']],
      questions:[
        q('The phrase “mildly inconvenient” is most likely an example of…',['literal understatement that minimises a serious disruption','technical terminology','a neutral measurement of server performance','a formal apology'],0,'A expressão minimiza ironicamente uma falha séria após quatro horas de atraso.',
          ['Considere o contexto: a terceira falha do servidor e quatro horas perdidas.','Compare a gravidade com a expressão mildly inconvenient.','A discrepância sugere understatement e ironia.'],
          ['É a interpretação contextual adequada.','Não é termo técnico de informática.','Não há medida objetiva de desempenho.','Não é um pedido de desculpas.'],
          'Interpretar a frase isoladamente, sem levar em conta a desproporção com o contexto.','Em pragmática, compare o enunciado literal com a situação real.'),
        q('Why did nobody laugh?',['They did not understand the English vocabulary.','The remark expressed frustration indirectly rather than a genuine joke.','The server had started working perfectly.','The meeting had ended early.'],1,'A frase usa humor seco ou ironia, mas a situação provavelmente não foi percebida como brincadeira leve.',
          ['Leia a frase como reação a uma falha repetida.','Observe que o custo real foi grande.','A ausência de risos sugere que o comentário comunicou frustração, não uma piada bem recebida.'],
          ['Não há evidência de dificuldade de vocabulário.','É a inferência mais plausível.','O servidor falhou novamente.','A reunião estava atrasada, não encerrada cedo.'],
          'Tratar ironia como humor sempre bem-sucedido.','A intenção pragmática e a recepção social podem ser diferentes.'),
        q('Which response would best preserve the understated tone?',['This is the worst catastrophe in human history.','A rather unfortunate turn of events, I must say.','The server is a machine.','I refuse to continue speaking.'],1,'A resposta mantém o tom contido e avaliativo, sem exagerar para uma hipérbole extrema.',
          ['Identifique o registro do comentário original: seco e minimizador.','Busque uma resposta que preserve a contenção.','Rather unfortunate turn of events tem formalidade e understatement.'],
          ['É hipérbole dramática, não understatement.','É a opção que preserva o tom.','É uma afirmação literal e desconectada do comentário.','É uma recusa, não uma resposta equivalente.'],
          'Confundir linguagem sofisticada com registro adequado.','Considere o efeito pragmático, não só o vocabulário.'),
        q('The manager’s remark most strongly implies that…',['the delay was insignificant','the problem was serious, and the speaker was expressing irritation indirectly','the team had planned the delay','the server failure was expected and welcome'],1,'A implicatura é que a falha foi relevante e frustrante, apesar da minimização verbal.',
          ['A expressão literal minimiza a situação.','O contexto contradiz essa minimização.','A leitura implícita é frustração comunicada indiretamente.'],
          ['A situação indica o contrário.','É a implicatura mais forte.','Não há evidência de planejamento.','A falha não foi bem-vinda.'],
          'Confundir o significado literal com a intenção implícita.','Considere o que o falante espera que o ouvinte infira.')
      ]
    },
    {
      id:'c2-lexical-precision',level:'C2',skill:'Vocabulary',title:'Precision, collocation and register',
      objective:'Escolher colocações naturais, distinguir sinônimos próximos e adequar o registro.',
      explanation:'Domínio avançado envolve saber que palavras combinam naturalmente e em quais contextos. Collocations são combinações convencionais (pose a question, reach a conclusion, conduct research). Sinônimos próximos podem diferir em força, registro, conotação e padrão gramatical.',
      examples:['conduct research (not usually make research)','raise an objection','draw a distinction','a compelling argument'],
      passage:'Academic editing\\nThe editor asked the author to substantiate the claim, clarify the scope of the analysis and avoid overstating the implications. The final paragraph should draw a distinction between what the data demonstrate and what remains speculative.',
      vocab:[['substantiate','fundamentar com evidências','Substantiate a claim with data.'],['scope','escopo / abrangência','Clarify the scope of the study.'],['speculative','especulativo','The conclusion remains speculative.'],['draw a distinction','estabelecer uma distinção','Draw a distinction between evidence and opinion.']],
      questions:[
        q('Choose the natural collocation.',['make research','do a conclusion','conduct research','take an evidence'],2,'Conduct research é uma colocação convencional; os outros pares são combinações não naturais nesse contexto.',
          ['Identifique o substantivo central research.','Em registro acadêmico, o verbo convencional é conduct.','A expressão significa realizar pesquisa.'],
          ['Make research é uma tradução literal pouco natural.','Do a conclusion não é uma colocação padrão.','É a combinação idiomática correta.','Evidence é normalmente incontável e não se usa take an evidence.'],
          'Traduzir literalmente collocations do português.','Aprenda palavras em blocos e frases, não apenas isoladamente.'),
        q('In the passage, “substantiate the claim” means…',['make the claim more emotional','support the claim with evidence','remove the claim without review','repeat the claim several times'],1,'Substantiate significa fundamentar ou apoiar uma afirmação com evidências.',
          ['A palavra aparece em contexto de edição acadêmica.','O editor pede que a afirmação tenha base demonstrável.','O sentido é apoiar a claim com evidence.'],
          ['Não significa torná-la emocional.','É a definição apropriada.','Não significa apagar.','Repetição não prova uma afirmação.'],
          'Confundir frequência de uma afirmação com sustentação evidencial.','Uma claim se fortalece por razões e evidências relevantes.'),
        q('Which word best completes the sentence? “The conclusion is plausible, but still ___ because the sample is small.”',['speculative','mandatory','inevitable','transparent'],0,'Speculative indica que algo ainda depende de suposição ou evidência insuficiente.',
          ['O texto apresenta uma conclusão plausível, mas limitada.','A amostra pequena reduz a certeza.','Speculative expressa essa cautela.'],
          ['É a palavra adequada.','Mandatory significa obrigatório.','Inevitable significa inevitável e exagera a certeza.','Transparent não descreve o grau de evidência.'],
          'Escolher uma palavra positiva apenas porque a frase contém plausible.','Observe o contraste introduzido por but.'),
        q('Which paraphrase best preserves the meaning of “draw a distinction between evidence and opinion”?',['Confuse evidence with opinion.','Explain how evidence and opinion differ.','Remove every opinion from a discussion.','Repeat the same evidence twice.'],1,'Draw a distinction significa estabelecer ou explicar uma diferença entre duas categorias.',
          ['Identifique a estrutura draw a distinction between X and Y.','O objetivo é separar conceitualmente evidence e opinion.','A paráfrase deve manter a ideia de diferença.'],
          ['É o contrário do sentido.','É a paráfrase correta.','Não significa eliminar toda opinião.','Repetir não é distinguir.'],
          'Traduzir draw literalmente como desenhar.','Aprenda verbos e substantivos em expressões fixas.')
      ]
    },
    {
      id:'c2-critical-synthesis',level:'C2',skill:'Reading',title:'Synthesize competing arguments',
      objective:'Comparar perspectivas, reconhecer limites e formular uma síntese sem apagar divergências.',
      explanation:'Síntese crítica não é simplesmente resumir dois textos. É identificar a tese de cada um, pontos comuns, divergências reais, pressupostos e limites da evidência. Uma boa síntese mantém as diferenças e formula uma conclusão proporcional, sem criar uma falsa equivalência.',
      examples:['Both accounts agree that…','They diverge on whether…','The evidence supports a narrower conclusion…'],
      passage:'Two views on artificial intelligence in education\\nView A: Automated tools can provide immediate feedback and make practice more accessible, especially where teacher time is limited.\\nView B: Feedback quality depends on context. Automated systems may miss a learner’s intention, reinforce errors or reward surface-level answers.\\nA balanced assessment need not treat these positions as mutually exclusive: access and speed are benefits, but they do not remove the need for human judgement and transparent evaluation.',
      vocab:[['mutually exclusive','mutuamente excludentes','The two explanations are not mutually exclusive.'],['surface-level','superficial','Surface-level answers may hide misunderstanding.'],['transparent','transparente','Evaluation criteria should be transparent.'],['judgement','julgamento / discernimento','Human judgement remains important.']],
      questions:[
        q('What do the two views primarily disagree about?',['Whether education exists.','The benefits and limitations of automated feedback.','Whether learners should practise.','Whether teachers use time.'],1,'As posições reconhecem possibilidades, mas diferem no peso atribuído à qualidade e aos riscos do feedback automatizado.',
          ['Resuma View A: rapidez e acesso.','Resuma View B: contexto, erros e superficialidade.','A divergência está no equilíbrio entre benefício e limitação.'],
          ['O tema é educação, não sua existência.','É o foco da divergência.','Nenhuma visão rejeita a prática.','O tempo docente aparece como contexto, não como questão central.'],
          'Interpretar duas perspectivas como completamente opostas quando compartilham pressupostos.','Procure o ponto preciso em que os argumentos divergem.'),
        q('Why does the final paragraph say the views are not “mutually exclusive”?',['Because both statements must be false.','Because access and speed can be benefits while human judgement remains necessary.','Because automated tools always replace teachers.','Because the two views discuss unrelated topics.'],1,'A síntese integra as contribuições compatíveis: eficiência é útil, mas não elimina julgamento humano.',
          ['Observe “need not treat these positions as mutually exclusive”.','A frase seguinte combina benefícios e limites.','As posições podem ser parcialmente verdadeiras ao mesmo tempo.'],
          ['Não há indicação de que ambas sejam falsas.','É o motivo expresso na síntese.','O texto rejeita substituição completa.','As duas visões tratam do feedback automatizado.'],
          'Supor que síntese significa escolher um lado e descartar o outro.','Integre pontos compatíveis sem apagar a divergência real.'),
        q('Which conclusion is most balanced?',['Automated feedback is always accurate.','Automated feedback is useless.','Automated feedback can increase access, but its quality and oversight matter.','Human judgement should never be used.'],2,'A conclusão proporcional reconhece benefícios e condições de uso responsável.',
          ['Identifique o benefício de access/speed.','Identifique riscos de context and error.','Combine as duas perspectivas sem exagero.'],
          ['Always accurate é absoluto e contraria os limites.','Useless ignora benefícios reconhecidos.','É a síntese mais fiel.','O texto defende a necessidade de julgamento humano.'],
          'Transformar uma conclusão condicional em um extremo absoluto.','A boa síntese preserva condições, limites e evidências.'),
        q('What does the phrase “reward surface-level answers” imply?',['The system may favour answers that look correct without showing deep understanding.','The system gives prizes for studying outside.','The system always identifies deep reasoning.','The system prevents learners from writing.'],0,'A expressão critica respostas que parecem corretas superficialmente, mas não demonstram compreensão profunda.',
          ['Surface-level significa superficial.','Reward indica favorecer ou recompensar.','A implicatura é que o sistema pode valorizar aparência de acerto.'],
          ['É o sentido contextual.','Não há referência a prêmios físicos nem ao ambiente externo.','A frase alerta para o risco oposto.','Nada diz que a escrita é impedida.'],
          'Interpretar uma expressão crítica literalmente.','Considere a conotação de surface-level em contextos acadêmicos.')
      ]
    }
  ];

  const portugueseSupport = {
    'a1-sentence-engine':'Em inglês, a frase afirmativa normalmente precisa mostrar quem faz a ação: sujeito + verbo + complemento. O verbo be aparece em frases de estado/identificação e muda conforme o sujeito: I am, she is, they are. Para perguntar, o be vai antes do sujeito; para negar, coloque not depois dele.',
    'a1-articles-quantity':'A e an introduzem um substantivo contável singular ainda não identificado. Escolha pelo som inicial: an hour, a university. The retoma algo específico já conhecido. Some/any dependem do contexto e do tipo de substantivo; water é incontável, chairs é contável plural.',
    'a1-reading-routine':'Leia primeiro para descobrir o assunto. Depois procure a informação pedida, como horário, nome ou ação. Diferencie verbos próximos: arrive (chegar), open (abrir), start (começar), finish (terminar). Não confunda uma exceção com uma regra geral.',
    'a2-past-narrative':'Past Simple apresenta o acontecimento concluído. Past Continuous descreve o que estava acontecendo em determinado momento. Exemplo: I was studying when the phone rang. Estudar estava em andamento; o telefone tocou como evento pontual.',
    'a2-modals-comparison':'Should é conselho; must/have to indicam obrigação ou necessidade. Comparativos com adjetivos curtos normalmente usam -er (cheaper); os longos geralmente usam more (more comfortable). Use than para introduzir o segundo elemento da comparação.',
    'a2-practical-email':'Um e-mail funcional deve deixar claro por que você escreve, o que precisa e quais informações está solicitando. Could you please…? é uma forma educada de pedir. Leia a mensagem procurando propósito, problema e ação desejada.',
    'b1-perfect-experience':'Present Perfect (have/has + particípio) conecta uma experiência ou resultado passado ao presente, sem indicar necessariamente quando ocorreu. Past Simple é usado com tempo passado concluído e definido, como yesterday ou in 2022. Pergunte se o período ainda está aberto ou se já terminou.',
    'b1-conditionals-links':'First Conditional: if + Present Simple, will + verbo base; descreve uma condição futura possível. Second Conditional: if + Past Simple, would + verbo base; descreve hipótese mais distante ou imaginária. However/although indicam contraste; therefore indica consequência.',
    'b1-reading-claim-evidence':'Separe a afirmação principal (claim), as razões e as evidências. Um exemplo pode ilustrar, mas não necessariamente provar. Uma associação entre dois fatores não demonstra automaticamente que um causou o outro. Mantenha a conclusão proporcional ao que o texto apresenta.',
    'b2-passive-reporting':'Na voz passiva, o foco passa para quem recebe a ação: be + particípio passado (The samples were analysed). Verbos como suggest, report e indicate atribuem a conclusão à fonte. Modalizadores como may e appears to evitam afirmar mais do que os dados permitem.',
    'b2-modals-deduction':'Must have + particípio expressa uma dedução forte sobre o passado; might have/could have indicam possibilidade; can’t have indica impossibilidade provável. Should have + particípio costuma apontar algo que teria sido melhor fazer, mas não foi feito.',
    'b2-research-reading':'Leia primeiro o resultado observado; depois procure limitações de método, amostra e variáveis alternativas. Associação não é o mesmo que causalidade. Uma boa conclusão reconhece o que os dados apoiam e o que ainda não permitem afirmar.',
    'c1-inversion-register':'Em registro formal, expressões negativas no início da frase podem provocar inversão entre auxiliar e sujeito: Never have I seen… / Only after the meeting did we understand… Cleft structures como What matters is… destacam a informação seguinte.',
    'c1-hedging-cohesion':'Hedging é a linguagem que calibra a certeza: may, appears to, tends to, arguably. Nominalisation transforma verbos em substantivos (analyse → analysis). Conectores como nevertheless e whereas expressam relações diferentes; escolha pelo vínculo lógico, não por tradução aproximada.',
    'c1-editorial-reading':'Em textos avançados, a tese pode aparecer distribuída por concessões, ressalvas e correções de possíveis interpretações. Admittedly concede um ponto; this is not to say… evita uma leitura exagerada. Combine várias pistas e não conclua mais do que o texto permite.',
    'c2-irony-implicature':'O significado pode ir além das palavras literais. Understatement minimiza deliberadamente algo; ironia pode comunicar uma crítica por contraste; implicature é uma conclusão que o leitor infere pelo contexto. Compare a frase com a situação e com a reação dos interlocutores.',
    'c2-lexical-precision':'Domínio avançado exige aprender combinações naturais: conduct research, reach a conclusion, draw a distinction. Sinônimos podem diferir em conotação, registro e gramática. Aprenda a palavra em uma frase completa, com a preposição e o substantivo que normalmente a acompanham.',
    'c2-critical-synthesis':'Síntese crítica não é escolher um lado e apagar o outro. Identifique a tese de cada perspectiva, os pontos em comum, a divergência real e os limites das evidências. Conclua preservando as ressalvas e evitando falsos extremos.'
  };

  const listening = [
    {id:'listen-a1',level:'A1',title:'At the information desk',goal:'Captar nomes, horários e instruções simples.',script:'Hello. The museum opens at ten in the morning. The last tour starts at four thirty. Please buy your ticket at the front desk. Children under twelve enter for free.',prompt:'What time does the last tour start?',options:['At ten.','At twelve.','At four thirty.','At five.'],answer:2,concept:'A escuta pede um horário específico. A informação aparece na frase “The last tour starts at four thirty”.',steps:['Ouça primeiro o assunto geral: horário e ingresso do museu.','Procure a expressão last tour starts.','Diferencie o horário de abertura (ten) do início do último passeio (four thirty).'],why:['Ten é o horário em que o museu abre.','Twelve aparece na condição de idade das crianças, não como horário.','É o horário exato do último passeio.','Five não é citado como horário de início.'],trap:'Escolher o horário mais repetido ou o primeiro número ouvido. ',takeaway:'Em listening, identifique a palavra-chave da pergunta antes de ouvir novamente.'},
    {id:'listen-a2',level:'A2',title:'Changing a reservation',goal:'Entender motivo, alternativa e informação prática.',script:'Good afternoon. I booked a table for six at seven o’clock, but one person cannot come. Could we change the reservation to five people? The time is still seven, and we would prefer a table near the window.',prompt:'What does the speaker want to change?',options:['The time.','The number of people.','The restaurant.','The day.'],answer:1,concept:'O falante mantém o horário e solicita alteração na quantidade de pessoas.',steps:['Identifique o pedido: change the reservation to five people.','Observe a ressalva: the time is still seven.','Conclua que a mudança é no número de pessoas.'],why:['O horário permanece às sete.','É a alteração solicitada.','Não há pedido para trocar de restaurante.','O dia não é mencionado como problema.'],trap:'Ouvir “change the reservation” e presumir que a mudança é de horário.',takeaway:'Escute também as correções e ressalvas depois do pedido principal.'},
    {id:'listen-b1',level:'B1',title:'A project update',goal:'Seguir sequência, resultado e próximo passo.',script:'We completed the interviews last week. Most participants supported the proposal, although several asked for clearer instructions. We are revising the document now and plan to send the final version on Friday.',prompt:'What is the team doing now?',options:['Conducting the interviews.','Publishing the final report.','Revising the document.','Cancelling the proposal.'],answer:2,concept:'Now indica a atividade em andamento no momento da fala.',steps:['Separe ações passadas: completed the interviews.','Identifique a ação com now: revising the document.','Não confunda o plano futuro de sexta-feira com a tarefa atual.'],why:['As entrevistas foram concluídas na semana passada.','O envio da versão final está planejado para sexta-feira.','É a ação em andamento.','Não há cancelamento.'],trap:'Misturar o que já aconteceu, o que ocorre agora e o que ainda será feito.',takeaway:'Anote mentalmente timeline: past → now → next.'},
    {id:'listen-b2',level:'B2',title:'A research briefing',goal:'Reconhecer uma ressalva metodológica e a conclusão proporcional.',script:'The pilot produced encouraging results. Participants completed the tasks more quickly, and satisfaction ratings were higher. However, the sample was small and consisted mostly of volunteers who were already familiar with the platform. We should therefore interpret the findings cautiously.',prompt:'Why should the findings be interpreted cautiously?',options:['The tasks were never completed.','The sample was small and may not represent all users.','Satisfaction ratings were unavailable.','The platform was not used.'],answer:1,concept:'A ressalva é metodológica: amostra pequena e voluntários familiarizados com a plataforma limitam a generalização.',steps:['Ouça o contraste introduzido por however.','Identifique as duas limitações: sample was small e volunteers already familiar.','Relacione isso ao cuidado para generalizar os resultados.'],why:['O briefing diz que os participantes completaram tarefas mais rapidamente.','É a razão apresentada.','As avaliações de satisfação foram mais altas.','Os voluntários conheciam a plataforma.'],trap:'Concentrar-se nos resultados positivos e ignorar a ressalva que muda a interpretação.',takeaway:'Em listening avançado, dê atenção especial a however, although, nevertheless e therefore.'},
    {id:'listen-c1',level:'C1',title:'A qualified policy recommendation',goal:'Inferir a posição do falante e distinguir recomendação de certeza.',script:'The evidence points towards a modest improvement, but it would be premature to recommend the policy nationally. A longer evaluation, ideally involving schools with different resources, would help determine whether the effect is robust across contexts.',prompt:'What is the speaker’s position?',options:['The policy should be adopted nationally immediately.','The policy has no measurable effect.','The evidence is promising but further evaluation is needed before national adoption.','The evaluation should include only well-resourced schools.'],answer:2,concept:'O falante reconhece um sinal positivo, mas considera prematura uma adoção nacional sem avaliação mais ampla.',steps:['Identifique a concessão: evidence points towards a modest improvement.','Observe a restrição: premature to recommend nationally.','Leia a recomendação de avaliação mais longa e em escolas diversas.'],why:['Contradiz a expressão premature.','O falante reconhece melhoria modesta.','É a síntese proporcional.','O falante pede escolas com recursos diferentes, não apenas as bem equipadas.'],trap:'Transformar uma evidência promissora em recomendação definitiva.',takeaway:'Reconheça o grau de compromisso do falante: tentative, modest, premature, robust.'},
    {id:'listen-c2',level:'C2',title:'Diplomatic disagreement',goal:'Interpretar discordância indireta e ironia leve.',script:'I can see why the proposal is attractive, particularly on paper. In practice, though, the implementation plan appears to assume that every department will change its procedures overnight. That seems rather optimistic. I would be more convinced by a phased approach with clear measures of progress.',prompt:'What is the speaker implying about the implementation plan?',options:['It is realistic and ready to be used.','It underestimates the difficulty of organisational change.','It is too cautious and slow.','It has already been implemented successfully.'],answer:1,concept:'A crítica é indireta: “rather optimistic” sugere que a proposta subestima a dificuldade real de implementação.',steps:['Observe a concessão inicial: I can see why the proposal is attractive.','Depois, identifique a objeção prática: overnight.','Interprete rather optimistic como ceticismo diplomático.','A alternativa phased approach explicita a solução preferida.'],why:['O falante apresenta objeções práticas.','É a implicatura central.','O falante propõe implementação por fases, não rejeita cautela.','Não há implementação concluída.'],trap:'Interpretar expressões polidas como concordância literal.',takeaway:'No C2, a intenção pode estar na combinação de concessão, contraste e understatement.'}
  ];

  const speaking = [
    {level:'A1',title:'Introduce yourself clearly',prompt:'Speak for 30–45 seconds. Introduce yourself, say where you live, what you study, one routine and one interest.',goal:'Produzir frases simples, completas e compreensíveis.',model:'Hello, my name is Alex. I live in Brazil. I am a student. I usually study in the afternoon. I enjoy reading and playing chess.',rubric:['Use subject + verb in complete sentences.','Use am/is/are correctly.','Pronounce names, places and routine verbs clearly.','Speak slowly enough to be understood.']},
    {level:'A2',title:'Compare two choices',prompt:'Speak for 45–60 seconds. Compare two ways of studying, travelling or spending free time. Give at least two comparisons and explain your preference.',goal:'Usar comparativos e conectores simples para justificar uma preferência.',model:'Studying in the morning is quieter than studying at night. However, I feel more focused after lunch. I prefer the morning because I can work without interruptions.',rubric:['Use at least two correct comparatives.','Explain a preference with because, but or however.','Organise the answer into an opening, comparison and conclusion.','Avoid translating word for word from Portuguese.']},
    {level:'B1',title:'Tell a meaningful experience',prompt:'Speak for 60–90 seconds. Describe a project, book, lesson or activity. Explain what happened, what you learned and what you would change.',goal:'Conectar experiência, sequência temporal e reflexão pessoal.',model:'I have worked on a group project this year. We planned the tasks carefully, but we underestimated the time needed for testing. I learned that clear responsibilities make teamwork more effective.',rubric:['Use past forms consistently.','Connect events with time and cause markers.','Explain what was learned, not only what happened.','Use a clear beginning, development and conclusion.']},
    {level:'B2',title:'Defend a position and address a counterargument',prompt:'Speak for 90 seconds. Discuss whether schools should limit notifications during study periods. Present a position, two reasons, one counterargument and a qualified conclusion.',goal:'Sustentar opinião, desenvolver razões e responder a um contraponto.',model:'Schools should consider notification limits because interruptions can fragment attention. Nevertheless, a total ban may be impractical. A reasonable policy would protect focused study while allowing urgent communication.',rubric:['State a clear position.','Develop two distinct reasons.','Address a counterargument fairly.','Use modalisation and connectors precisely.']},
    {level:'C1',title:'Evaluate evidence and qualify a conclusion',prompt:'Speak for 90–120 seconds. Choose a claim about technology, education or science. Explain what evidence would support it, identify one methodological limitation and formulate a careful conclusion.',goal:'Distinguir evidência, interpretação e causalidade com precisão.',model:'The available evidence appears to support a limited association. However, without a representative sample and a plausible causal design, a broader conclusion would be premature.',rubric:['Distinguish evidence from interpretation.','Identify a meaningful limitation.','Qualify the conclusion without becoming vague.','Maintain a clear and consistent formal register.']},
    {level:'C2',title:'Synthesize opposing perspectives',prompt:'Speak for two minutes. Present two reasonable positions on a complex issue, identify their genuine disagreement and conclude without caricaturing either side.',goal:'Demonstrar nuance, flexibilidade, precisão lexical e controle retórico.',model:'Both positions recognise the value of innovation, yet they assign different weight to uncertainty. A defensible conclusion should distinguish reversible experimentation from decisions with irreversible consequences.',rubric:['Represent both positions accurately.','Identify the real point of disagreement.','Use nuance rather than absolute claims.','Conclude with precision and consistent register.']}
  ];

  const writing = [
    {level:'A1',title:'A short personal profile',prompt:'Write 5–7 sentences introducing yourself. Include your name, location, studies, a daily routine and one interest.',goal:'Produzir frases básicas com be, present simple e vocabulário familiar.',checklist:['I used complete sentences.','I used am/is/are correctly.','I used present simple for routines.','I checked subject–verb agreement.']},
    {level:'A2',title:'A practical email',prompt:'Write an email (80–100 words) asking a school, club or organisation for information. Explain why you are writing, ask two clear questions and close politely.',goal:'Organizar uma mensagem funcional com propósito, perguntas e cortesia.',checklist:['The purpose is clear in the first lines.','I asked two specific questions.','I used polite requests such as Could you…?','I included an appropriate greeting and closing.']},
    {level:'B1',title:'An experience that changed your approach',prompt:'Write 120–150 words about a project or experience. Explain what happened, one difficulty, what you learned and what you would do differently.',goal:'Construir narrativa conectada e reflexão pessoal.',checklist:['I used past tenses consistently.','I included sequence and cause connectors.','I explained the lesson learned.','I avoided repeating the same simple verbs.']},
    {level:'B2',title:'Opinion essay with a counterargument',prompt:'Write 180–220 words discussing whether schools should limit smartphone notifications during lessons and study periods. Develop two reasons, address a counterargument and conclude with a qualified recommendation.',goal:'Argumentar com estrutura, exemplos e contraponto.',checklist:['My thesis directly answers the question.','I developed two distinct reasons.','I represented a counterargument fairly.','My conclusion follows from the evidence and qualifications.']},
    {level:'C1',title:'A critical response to research',prompt:'Write 220–260 words evaluating a claim that a new learning tool improves academic performance. Discuss evidence quality, possible confounding factors and what further study would be needed.',goal:'Escrever análise crítica com modalização e precisão metodológica.',checklist:['I distinguished correlation from causation.','I discussed sample/method limitations.','I used cautious academic language.','My conclusion is proportional to the evidence.']},
    {level:'C2',title:'Synthesis of competing arguments',prompt:'Write 250–300 words synthesising two perspectives on the use of AI in education: access and personalised feedback versus risks of bias, dependence and superficial assessment. Identify common ground and a genuine disagreement.',goal:'Sintetizar perspectivas sem caricatura, preservando nuances.',checklist:['I represented both positions fairly.','I identified their shared assumptions.','I identified a genuine point of disagreement.','I concluded with nuance and lexical precision.']}
  ];

  const methods = [
    {time:'5 min',title:'Retrieve before reviewing',description:'Tente lembrar palavras e regras sem olhar. Só depois confira o material e corrija lacunas.',action:'Feche o texto e explique em inglês três ideias que você lembra.'},
    {time:'8 min',title:'Read or listen for meaning',description:'Faça uma primeira leitura/escuta para entender a ideia geral; depois procure detalhes e evidências.',action:'Responda: What is the main idea? What detail supports it?'},
    {time:'7 min',title:'Practise one language pattern',description:'Resolva questões de gramática em contexto e explique por que as outras alternativas não funcionam.',action:'Crie duas frases próprias usando a estrutura estudada.'},
    {time:'5 min',title:'Speak and shadow',description:'Ouça uma frase, repita imitando ritmo e agrupamento de palavras; depois fale sem ler.',action:'Grave 30 segundos e compare clareza, ritmo e completude.'},
    {time:'5 min',title:'Write and revise',description:'Escreva um pequeno resumo ou opinião. Reescreva uma frase para deixá-la mais clara e precisa.',action:'Use uma palavra nova e um conector estudado hoje.'}
  ];

  const KEY='mfo:english:v2', OLD_KEY='mindforge.english.mastery.v1';
  const defaultState=()=>({version:1,completed:{},attempts:[],listening:{},speaking:{},writing:{},vocab:{},daily:{}});
  function safeTree(x,d,b){d=d||0;b=b||{n:0};b.n++;if(d>16||b.n>20000)return false;if(x===null||['string','boolean'].includes(typeof x))return true;if(typeof x==='number')return Number.isFinite(x);if(Array.isArray(x))return x.length<=10000&&x.every(v=>safeTree(v,d+1,b));if(!x||typeof x!=='object'||(Object.getPrototypeOf(x)!==Object.prototype&&Object.getPrototypeOf(x)!==null))return false;return Object.keys(x).every(k=>!['__proto__','constructor','prototype'].includes(k)&&k.length<=160&&safeTree(x[k],d+1,b));}
  function sanitize(value){if(!value||typeof value!=='object'||Array.isArray(value)||value.version!==1||!value.completed||typeof value.completed!=='object'||Array.isArray(value.completed)||!Array.isArray(value.attempts)||!value.listening||typeof value.listening!=='object'||Array.isArray(value.listening)||!value.speaking||typeof value.speaking!=='object'||Array.isArray(value.speaking)||!value.writing||typeof value.writing!=='object'||Array.isArray(value.writing)||!value.vocab||typeof value.vocab!=='object'||Array.isArray(value.vocab)||!value.daily||typeof value.daily!=='object'||Array.isArray(value.daily))return null;try{const text=JSON.stringify(value);if(text.length>1500000)return null;const copy=JSON.parse(text);if(!safeTree(copy,0,{n:0})||copy.attempts.length>5000)return null;return Object.assign(defaultState(),copy);}catch(error){return null;}}
  function read(){try{const current=global.localStorage.getItem(KEY),legacy=current===null?global.localStorage.getItem(OLD_KEY):null,raw=current===null?legacy:current;if(!raw)return defaultState();const clean=sanitize(JSON.parse(raw));if(!clean)return defaultState();if(current===null&&legacy!==null){try{global.localStorage.setItem(KEY,JSON.stringify(clean));}catch(error){}}return clean;}catch(error){return defaultState();}}
  function save(state){const clean=sanitize(state);if(!clean)return false;try{global.localStorage.setItem(KEY,JSON.stringify(clean));return true;}catch(error){return false;}}
  const esc=value=>String(value==null?'':value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const stateVars={tab:'overview',level:'All',skill:'All',activeLesson:null,questionIndex:0,selected:null,answered:false,flashIndex:0,flashRevealed:false,mediaRecorder:null,mediaStream:null,mediaChunks:[],mediaUrl:null,recognition:null,ttsRate:0.9,ttsVoice:'en-US'};
  function allVocabulary(){return lessons.flatMap(lesson=>lesson.vocab.map((item,index)=>({id:lesson.id+'-'+index,level:lesson.level,unit:lesson.title,word:item[0],meaning:item[1],example:item[2]})));}
  function progressSummary(){
    const s=read(),vocab=allVocabulary(),due=vocab.filter(item=>!s.vocab[item.id]||!s.vocab[item.id].nextAt||new Date(s.vocab[item.id].nextAt).getTime()<=Date.now()).length;
    return {completed:Object.keys(s.completed).filter(id=>s.completed[id]).length,totalLessons:lessons.length,attempts:s.attempts.length,accuracy:s.attempts.length?Math.round(s.attempts.filter(x=>x.correct).length/s.attempts.length*100):null,due,listen:Object.values(s.listening).filter(x=>x&&x.done).length,speak:Object.values(s.speaking).filter(x=>x&&x.done).length};
  }
  function levelCard(level){
    const total=lessons.filter(x=>x.level===level.id),s=read(),done=total.filter(x=>s.completed[x.id]).length;
    return '<article class="ef-level-card"><div class="ef-level-top"><span>'+level.id+'</span><div><b>'+level.name+'</b><small>'+done+'/'+total.length+' units completed</small></div></div><p>'+esc(level.canDo)+'</p><small>'+esc(level.focus)+'</small><button class="ef-text-button" data-ef-level="'+level.id+'">Study this level →</button></article>';
  }
  function renderOverview(){
    const p=progressSummary();
    return '<section class="ef-hero"><div class="eyebrow">LANGUAGE MASTERY · CEFR</div><h1>English Forge</h1><p>Build English through grammar, vocabulary, reading, listening, speaking and writing. Study for understanding, then retrieve and use what you learned.</p><div class="ef-hero-metrics"><div><strong>'+p.completed+'/'+p.totalLessons+'</strong><span>units completed</span></div><div><strong>'+p.due+'</strong><span>cards due</span></div><div><strong>'+p.attempts+'</strong><span>practice attempts</span></div><div><strong>'+(p.accuracy===null?'—':p.accuracy+'%')+'</strong><span>observed accuracy</span></div></div></section>'+
      '<section class="ef-section"><div class="ef-heading"><div><h2>Six levels of proficiency</h2><p>Choose a level by the tasks you can perform, not by how many rules you have memorised.</p></div><a href="https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors" target="_blank" rel="noopener noreferrer">Official CEFR descriptors ↗</a></div><div class="ef-level-grid">'+LEVELS.map(levelCard).join('')+'</div></section>'+
      '<section class="ef-section"><div class="ef-heading"><div><h2>Train all the skills</h2><p>Do not let English become only grammar exercises.</p></div></div><div class="ef-skill-grid">'+[['Reading','BookOpen','Understand ideas, details, structure and implied meaning.'],['Listening','Headphones','Listen once for gist, again for evidence and detail.'],['Speaking','Mic','Produce language, record yourself and self-assess.'],['Writing','PenLine','Plan, draft, revise and improve accuracy.'],['Grammar','Braces','Notice forms in context and use them in new sentences.'],['Vocabulary','Layers','Learn meaning, pronunciation, collocation and usage.']].map(x=>'<button class="ef-skill-card" data-ef-skill="'+x[0].toLowerCase()+'"><b>'+esc(x[0])+'</b><span>'+esc(x[2])+'</span><i>Open practice →</i></button>').join('')+'</div></section>'+
      '<section class="ef-section"><div class="ef-heading"><div><h2>Your 30-minute study routine</h2><p>Tick each activity as you complete it. The plan resets each day.</p></div></div>'+renderDailyPlan()+'</section>'+
      '<section class="ef-section"><div class="ef-heading"><div><h2>Learning principles</h2><p>Practice methods that make you retrieve and use language, not just recognise it.</p></div></div><div class="ef-method-grid">'+methods.map(x=>'<article class="ef-method-card"><span>'+x.time+'</span><b>'+esc(x.title)+'</b><p>'+esc(x.description)+'</p><small>'+esc(x.action)+'</small></article>').join('')+'</div></section>';
  }
  function renderDailyPlan(){
    const s=read(),today=new Date().toISOString().slice(0,10);
    if(!s.daily||s.daily.date!==today){s.daily={date:today,done:{}};save(s);}
    return '<div class="ef-daily-list">'+methods.map((m,i)=>'<label class="ef-daily-item"><input type="checkbox" data-ef-daily="'+i+'" '+(s.daily.done[i]?'checked':'')+'><span><b>'+m.time+' · '+esc(m.title)+'</b><small>'+esc(m.action)+'</small></span></label>').join('')+'</div><div class="ef-daily-progress">'+methods.filter((m,i)=>s.daily.done[i]).length+' of 5 activities completed today</div>';
  }
  function tabBar(){
    const tabs=[['overview','Overview'],['lessons','Lessons'],['vocabulary','Vocabulary'],['listening','Listening'],['speaking','Speaking'],['writing','Writing'],['review','Error review'],['method','How to learn']];
    return '<div class="ef-tabs">'+tabs.map(x=>'<button class="ef-tab '+(stateVars.tab===x[0]?'active':'')+'" data-ef-tab="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>';
  }
  function filteredLessons(){
    return lessons.filter(l=>(stateVars.level==='All'||l.level===stateVars.level)&&(stateVars.skill==='All'||l.skill.toLowerCase()===stateVars.skill.toLowerCase()));
  }
  function renderLessons(){
    const list=filteredLessons(),s=read();
    return '<div class="ef-filter-row"><label>CEFR level <select id="ef-level-filter"><option value="All">All levels</option>'+LEVELS.map(x=>'<option value="'+x.id+'" '+(stateVars.level===x.id?'selected':'')+'>'+x.id+' · '+x.name+'</option>').join('')+'</select></label><label>Skill <select id="ef-skill-filter"><option value="All">All skills</option>'+['Grammar','Reading','Vocabulary','Pragmatics'].map(x=>'<option '+(stateVars.skill===x?'selected':'')+'>'+x+'</option>').join('')+'</select></label><span class="ef-small">'+list.length+' units · '+list.reduce((n,x)=>n+x.questions.length,0)+' questions</span></div>'+
      '<div class="ef-unit-grid">'+list.map(l=>'<article class="ef-unit-card"><div class="ef-unit-tags"><span>'+l.level+'</span><span>'+esc(l.skill)+'</span><span>'+l.questions.length+' questions</span></div><h3>'+esc(l.title)+'</h3><p>'+esc(l.objective)+'</p><div class="ef-unit-bottom"><span>'+(s.completed[l.id]?'✓ Completed':'Not completed')+'</span><button data-ef-open="'+l.id+'">Open unit →</button></div></article>').join('')+'</div>';
  }
  function renderVocabulary(){
    const s=read(),cards=allVocabulary(),due=cards.filter(item=>!s.vocab[item.id]||!s.vocab[item.id].nextAt||new Date(s.vocab[item.id].nextAt).getTime()<=Date.now());
    if(!due.length)return '<div class="ef-empty"><h3>No vocabulary due right now</h3><p>Come back tomorrow, or open a level to review vocabulary in context.</p></div>';
    const item=due[stateVars.flashIndex%due.length],status=s.vocab[item.id];
    return '<section class="ef-vocab-panel"><div class="ef-vocab-head"><div><div class="eyebrow">ACTIVE RECALL · SPACED REVIEW</div><h2>'+esc(item.level)+' · '+esc(item.unit)+'</h2></div><span>'+Math.min(stateVars.flashIndex+1,due.length)+' / '+due.length+' due</span></div><div class="ef-flashcard"><span class="ef-card-level">'+esc(item.level)+'</span><h1>'+esc(item.word)+'</h1><p>Try to recall the meaning and create your own sentence before revealing the answer.</p><button class="btn primary" id="ef-reveal-vocab" '+(stateVars.flashRevealed?'hidden':'')+'>Reveal meaning</button>'+(stateVars.flashRevealed?'<div class="ef-vocab-answer"><h3>'+esc(item.meaning)+'</h3><p>'+esc(item.example)+'</p></div><div class="ef-rating-row"><span>How well did you recall it?</span><button data-ef-rate="again">Again</button><button data-ef-rate="hard">Hard</button><button data-ef-rate="good">Good</button><button data-ef-rate="easy">Easy</button></div>':'')+'</div><p class="ef-small">Review intervals are a practical local heuristic, not a certified optimum. Cards return according to your self-rating.</p></section>';
  }
  function renderListening(){
    const s=read();
    return '<div class="ef-activity-grid">'+listening.map((a,i)=>'<article class="ef-activity-card"><div class="ef-unit-tags"><span>'+a.level+'</span><span>'+(s.listening[a.id]?'✓ Completed':'Listening task')+'</span></div><h3>'+esc(a.title)+'</h3><p>'+esc(a.goal)+'</p><button data-ef-listen="'+a.id+'">Open listening →</button></article>').join('')+'</div>';
  }
  function renderSpeaking(){
    const s=read();
    return '<div class="ef-activity-grid">'+speaking.map((a,i)=>'<article class="ef-activity-card"><div class="ef-unit-tags"><span>'+a.level+'</span><span>'+(s.speaking[a.level]&&s.speaking[a.level].done?'✓ Practised':'Speaking task')+'</span></div><h3>'+esc(a.title)+'</h3><p>'+esc(a.goal)+'</p><button data-ef-speaking="'+a.level+'">Open speaking task →</button></article>').join('')+'</div>';
  }
  function renderWriting(){
    const s=read();
    return '<div class="ef-activity-grid">'+writing.map(a=>'<article class="ef-activity-card"><div class="ef-unit-tags"><span>'+a.level+'</span><span>'+(s.writing[a.level]&&s.writing[a.level].trim()?'Draft saved':'Writing task')+'</span></div><h3>'+esc(a.title)+'</h3><p>'+esc(a.goal)+'</p><button data-ef-writing="'+a.level+'">Open writing task →</button></article>').join('')+'</div>';
  }
  function renderReview(){
    const s=read(),errors=s.attempts.filter(a=>!a.correct).slice(-30).reverse();
    return errors.length?'<div class="ef-error-list">'+errors.map(a=>'<article class="ef-error-item"><div class="ef-unit-tags"><span>'+a.level+'</span><span>'+esc(a.unitTitle)+'</span></div><p>'+esc(a.prompt)+'</p><small>Your answer: '+esc(a.selectedText)+' · Correct: '+esc(a.correctText)+'</small>'+(a.activity==='listening'?'<button data-ef-listen="'+a.unitId+'">Repeat listening →</button>':'<button data-ef-open="'+a.unitId+'">Revisit this unit →</button>')+'</article>').join('')+'</div>':'<div class="ef-empty"><h3>No errors recorded yet</h3><p>When you miss an answer, it appears here with a link back to its lesson. Keep practising.</p></div>';
  }
  function renderMethod(){
    return '<div class="ef-method-long">'+
      '<article><h3>1. Retrieval before rereading</h3><p>Close the explanation and try to produce a word, rule or summary from memory. Then check and correct it. Recognising a correct answer is easier than retrieving it unaided.</p><p><b>Try:</b> after reading a passage, summarise it aloud in English without looking.</p></article>'+
      '<article><h3>2. Spaced review</h3><p>Return to vocabulary and grammar after an interval rather than repeating everything in one sitting. The flashcards use a simple schedule that adapts to your self-rating.</p><p><b>Try:</b> review due words, not the entire list every day.</p></article>'+
      '<article><h3>3. Input with a purpose</h3><p>Read or listen once for the main idea. On the second pass, look for details, connectors, reference words and the evidence that supports an answer.</p><p><b>Try:</b> listen without a transcript first; reveal it only after answering.</p></article>'+
      '<article><h3>4. Output and feedback</h3><p>Use the new language in a sentence, a short recording or a paragraph. Compare your production with the model and rewrite one weak part.</p><p><b>Try:</b> record a 45-second answer, listen to it, then record a clearer second version.</p></article>'+
      '<article><h3>5. Interleave skills</h3><p>Combine reading, listening, grammar, speaking and writing over the week. Real communication requires switching between skills and choosing language from context.</p><p><b>Try:</b> read a short text, explain it aloud and write a three-sentence summary.</p></article>'+
      '<article><h3>6. Learn vocabulary as chunks</h3><p>Do not memorise only isolated translations. Record meaning, pronunciation, collocation, grammar pattern and a useful example.</p><p><b>Try:</b> learn “make a decision” as one phrase, not only the word decision.</p></article></div>'+
      '<div class="ef-sources"><b>Frameworks and evidence used in this learning design</b><a target="_blank" rel="noopener noreferrer" href="https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors">Council of Europe · CEFR descriptors</a><a target="_blank" rel="noopener noreferrer" href="https://learnenglish.britishcouncil.org/getting-started">British Council · Learning routines and skills</a><a target="_blank" rel="noopener noreferrer" href="https://doi.org/10.1126/science.1152408">Karpicke & Roediger (2008) · Retrieval practice</a><a target="_blank" rel="noopener noreferrer" href="https://www.psychologicalscience.org/journals/pspi/1529100612453266/">Dunlosky et al. (2013) · Effective learning techniques</a></div>';
  }
  function render(){
    const root=doc().getElementById('s-english');if(!root)return;
    const title=stateVars.tab==='overview'?'English Forge':({lessons:'Lessons',vocabulary:'Vocabulary review',listening:'Listening laboratory',speaking:'Speaking studio',writing:'Writing workshop',review:'My English error notebook',method:'How to learn English well'}[stateVars.tab]||'English Forge');
    root.innerHTML='<div class="ef-page">'+(stateVars.tab==='overview'?renderOverview():'<div class="eyebrow">ENGLISH FORGE · A1 → C2</div><h1 class="ef-page-title">'+title+'</h1><p class="ef-intro">Use English actively. Try first, inspect the explanation, and revisit what is not secure yet.</p>')+tabBar()+
      (stateVars.tab==='overview'?'':stateVars.tab==='lessons'?renderLessons():stateVars.tab==='vocabulary'?renderVocabulary():stateVars.tab==='listening'?renderListening():stateVars.tab==='speaking'?renderSpeaking():stateVars.tab==='writing'?renderWriting():stateVars.tab==='review'?renderReview():renderMethod())+'</div>';
  }
  function openLesson(id){
    const lesson=lessons.find(x=>x.id===id);if(!lesson)return;
    stateVars.activeLesson=id;stateVars.questionIndex=0;stateVars.selected=null;stateVars.answered=false;
    renderLesson();
  }
  function renderLesson(){
    const root=doc().getElementById('s-english'),lesson=lessons.find(x=>x.id===stateVars.activeLesson);if(!root||!lesson)return;
    const qn=lesson.questions.length,done=read().completed[lesson.id];
    root.innerHTML='<div class="ef-page"><button class="btn" data-ef-back>← English Forge</button><div class="ef-unit-tags"><span>'+lesson.level+'</span><span>'+esc(lesson.skill)+'</span><span>'+qn+' questions</span><span>'+(done?'✓ Completed':'In progress')+'</span></div><h1 class="ef-page-title">'+esc(lesson.title)+'</h1><p class="ef-intro">'+esc(lesson.objective)+'</p>'+
      '<section class="ef-content-panel"><h2>Understand the language</h2><p>'+esc(lesson.explanation)+'</p><details class="ef-pt-support"><summary>Need a Portuguese explanation? · Abrir apoio em português</summary><p>'+esc(portugueseSupport[lesson.id]||'Tente primeiro compreender a explicação em inglês. Depois, use os exemplos e o Tutor IA para esclarecer a dúvida.')+'</p></details><h3>Examples</h3><ul>'+lesson.examples.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section>'+
      (lesson.passage?'<section class="ef-reading-panel"><div class="eyebrow">READING / CONTEXT</div><pre>'+esc(lesson.passage)+'</pre></section>':'')+
      '<section class="ef-content-panel"><h3>Useful vocabulary</h3><div class="ef-word-grid">'+lesson.vocab.map(v=>'<div><b>'+esc(v[0])+'</b><span>'+esc(v[1])+'</span><small>'+esc(v[2])+'</small></div>').join('')+'</div></section>'+
      '<section class="ef-practice-panel"><div class="ef-practice-top"><div><div class="eyebrow">ACTIVE PRACTICE</div><h2>Question '+(stateVars.questionIndex+1)+' of '+qn+'</h2></div><span>'+lesson.level+'</span></div><div class="ef-progress"><i style="width:'+((stateVars.questionIndex+1)/qn*100)+'%"></i></div>'+renderQuestion(lesson.questions[stateVars.questionIndex],lesson.level,lesson.title,false)+'</section>'+
      '<section class="ef-content-panel"><h3>Make it your own</h3><p>Write one original sentence or a short example using today’s target language. Avoid copying the model.</p><textarea id="ef-own-example" maxlength="1200" placeholder="Write your own example in English...">'+esc(read().writing['example-'+lesson.id]||'')+'</textarea><button class="btn" id="ef-save-example">Save my example</button><span class="ef-small" id="ef-example-status"></span></section>'+
      '</div>';
  }
  function renderQuestion(item,level,unitTitle,standalone){
    const i=stateVars.questionIndex,answered=stateVars.answered,selected=stateVars.selected,letter=n=>String.fromCharCode(65+n);
    return '<div class="ef-question"><h3>'+esc(item.prompt)+'</h3><div class="ef-options">'+item.options.map((o,n)=>'<button class="ef-option '+(selected===n?'selected':'')+(answered&&n===item.answer?' correct':'')+(answered&&selected===n&&selected!==item.answer?' wrong':'')+'" data-ef-answer="'+n+'" '+(answered?'disabled':'')+'><b>'+letter(n)+'.</b> '+esc(o)+'</button>').join('')+'</div>'+
      (answered?feedbackMarkup(item,selected,level,unitTitle):'<button class="btn primary" id="ef-check-answer" '+(selected===null?'disabled':'')+'>Check answer</button>')+
      (answered?(standalone?'<button class="btn primary" id="ef-listen-finish">Back to listening tasks →</button>':'<button class="btn primary" id="ef-next-question">'+(i===lessons.find(x=>x.id===stateVars.activeLesson).questions.length-1?'Finish unit':'Next question →')+'</button>'):'')+
      '</div>';
  }
  function feedbackMarkup(item,selected,level,unitTitle){
    const letter=n=>String.fromCharCode(65+n);
    return '<section class="ef-feedback-box"><div class="ef-feedback-status '+(selected===item.answer?'correct':'wrong')+'">'+(selected===item.answer?'✓ Correct. ':'✕ Not quite. ')+'Your answer: '+letter(selected)+'. Correct answer: '+letter(item.answer)+'.</div>'+
      '<div><h4>1 · Concept</h4><p>'+esc(item.concept)+'</p></div><div><h4>2 · How to solve it</h4><ol>'+item.steps.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol></div>'+
      '<div><h4>3 · Every option explained</h4><div class="ef-why-grid">'+item.options.map((option,n)=>'<article class="'+(n===item.answer?'is-right':n===selected?'is-your-choice':'')+'"><b>'+(n===item.answer?'✓ Correct · ':n===selected?'Your choice · ':'Option · ')+letter(n)+'. '+esc(option)+'</b><p>'+esc(item.why[n])+'</p></article>').join('')+'</div></div>'+
      '<div><h4>4 · Common trap</h4><p>'+esc(item.trap)+'</p></div><div class="ef-takeaway"><b>Transfer this learning:</b> '+esc(item.takeaway)+'</div>'+
      '<button class="btn" id="ef-ask-ai">Ask the AI tutor for a deeper explanation ↗</button></section>';
  }
  function checkAnswer(){
    const lesson=lessons.find(x=>x.id===stateVars.activeLesson);if(!lesson)return;
    const item=lesson.questions[stateVars.questionIndex];if(stateVars.selected===null)return;
    stateVars.answered=true;
    const correct=stateVars.selected===item.answer,s=read();
    s.attempts.push({unitId:lesson.id,unitTitle:lesson.title,level:lesson.level,prompt:item.prompt,selectedText:item.options[stateVars.selected],correctText:item.options[item.answer],correct,at:new Date().toISOString()});
    save(s);renderLesson();
  }
  function nextQuestion(){
    const lesson=lessons.find(x=>x.id===stateVars.activeLesson);if(!lesson)return;
    if(stateVars.questionIndex>=lesson.questions.length-1){
      const s=read(),attempts=s.attempts.filter(x=>x.unitId===lesson.id).slice(-lesson.questions.length),score=attempts.filter(x=>x.correct).length;
      s.completed[lesson.id]={done:true,score,total:lesson.questions.length,at:new Date().toISOString()};save(s);
      stateVars.activeLesson=null;stateVars.tab='lessons';render();
    }else{stateVars.questionIndex++;stateVars.selected=null;stateVars.answered=false;renderLesson();}
  }
  function openListening(id){
    const item=listening.find(x=>x.id===id);if(!item)return;
    stateVars.activeLesson=null;stateVars.activeSpeaking=null;stateVars.activeWriting=null;stateVars.activeListening=id;stateVars.selected=null;stateVars.answered=false;renderListeningTask();
  }
  function renderListeningTask(){
    const item=listening.find(x=>x.id===stateVars.activeListening),root=doc().getElementById('s-english');if(!item||!root)return;
    const s=read(),done=s.listening[item.id]&&s.listening[item.id].done;
    const question=q(item.prompt,item.options,item.answer,item.concept,item.steps,item.why,item.trap,item.takeaway);
    root.innerHTML='<div class="ef-page"><button class="btn" data-ef-back>← Listening</button><div class="ef-unit-tags"><span>'+item.level+'</span><span>Listening comprehension</span><span>'+(done?'✓ Completed':'New practice')+'</span></div><h1 class="ef-page-title">'+esc(item.title)+'</h1><p class="ef-intro">'+esc(item.goal)+'</p><section class="ef-content-panel"><div class="eyebrow">LISTEN FIRST · DO NOT READ THE SCRIPT</div><p>Listen once for the main idea. Listen again for the detail that answers the question. The voice is synthesised by your browser and is not a recording of a native speaker.</p><div class="ef-audio-controls"><label>Accent<select id="ef-voice"><option value="en-US">English — United States</option><option value="en-GB">English — United Kingdom</option></select></label><button class="btn primary" id="ef-play">▶ Play</button><button class="btn" id="ef-play-slow">Play slowly</button><button class="btn" id="ef-stop-audio">Stop</button></div><button class="ef-text-button" id="ef-show-script">Reveal transcript</button><pre class="ef-script" id="ef-script" hidden>'+esc(item.script)+'</pre></section><section class="ef-practice-panel"><div class="eyebrow">COMPREHENSION CHECK</div><h2>Answer the question</h2>'+renderQuestion(question,item.level,item.title,true)+'</section></div>';
  }
  function speakText(text,rate,lang){
    if(!global.speechSynthesis||!global.SpeechSynthesisUtterance)return false;
    global.speechSynthesis.cancel();
    const utterance=new global.SpeechSynthesisUtterance(text);utterance.lang=lang||stateVars.ttsVoice;utterance.rate=rate||stateVars.ttsRate;
    const voices=global.speechSynthesis.getVoices?global.speechSynthesis.getVoices():[];
    const preferred=voices.find(v=>v.lang.toLowerCase()===utterance.lang.toLowerCase())||voices.find(v=>v.lang.toLowerCase().startsWith(utterance.lang.slice(0,2)));
    if(preferred)utterance.voice=preferred;
    global.speechSynthesis.speak(utterance);return true;
  }
  function checkListening(){
    const item=listening.find(x=>x.id===stateVars.activeListening);if(!item)return;
    const question=q(item.prompt,item.options,item.answer,item.concept,item.steps,item.why,item.trap,item.takeaway);
    checkGeneric(question,item.level,item.title,'listening');
  }
  function checkGeneric(item,level,title,kind){
    if(stateVars.selected===null)return;
    stateVars.answered=true;
    const correct=stateVars.selected===item.answer,s=read();
    s.attempts.push({unitId:stateVars.activeListening||'listen',unitTitle:title,level,prompt:item.prompt,selectedText:item.options[stateVars.selected],correctText:item.options[item.answer],correct,activity:kind,at:new Date().toISOString()});
    if(kind==='listening'&&correct)s.listening[stateVars.activeListening]={done:true,at:new Date().toISOString()};
    save(s);renderListeningTask();
  }
  function openSpeaking(level){
    const item=speaking.find(x=>x.level===level);if(!item)return;
    stateVars.activeSpeaking=level;renderSpeakingTask();
  }
  function renderSpeakingTask(){
    const item=speaking.find(x=>x.level===stateVars.activeSpeaking),root=doc().getElementById('s-english');if(!item||!root)return;
    const s=read(),saved=s.speaking[item.level]||{};
    root.innerHTML='<div class="ef-page"><button class="btn" data-ef-back>← Speaking</button><div class="ef-unit-tags"><span>'+item.level+'</span><span>Speaking production</span></div><h1 class="ef-page-title">'+esc(item.title)+'</h1><p class="ef-intro">'+esc(item.goal)+'</p><section class="ef-content-panel"><h2>Your speaking challenge</h2><p>'+esc(item.prompt)+'</p><details class="ef-model"><summary>Reveal a model after your own attempt</summary><p>'+esc(item.model)+'</p><button class="btn" id="ef-model-audio">Listen to model</button></details><label class="ef-field-label" for="ef-speaking-transcript">Your notes or speech transcript</label><textarea id="ef-speaking-transcript" rows="5" maxlength="3000" placeholder="Write what you said, or outline your answer...">'+esc(saved.transcript||'')+'</textarea><div class="ef-audio-controls"><button class="btn primary" id="ef-record">● Start local recording</button><button class="btn" id="ef-stop-record" disabled>Stop</button><button class="btn" id="ef-play-record" disabled>Play recording</button><button class="btn" id="ef-download-record" disabled>Download audio</button><button class="btn" id="ef-recognise">Transcribe speech (if supported)</button></div><audio id="ef-record-audio" controls hidden></audio><p class="ef-small" id="ef-speaking-status">Microphone permission is requested only after you click record. Audio stays in this browser session; it is not sent to a server.</p></section><section class="ef-content-panel"><h3>Self-assessment rubric</h3><p>Mark only the criteria your recording or transcript actually meets.</p><div class="ef-rubric">'+item.rubric.map((x,i)=>'<label><input type="checkbox" data-ef-rubric="'+i+'" '+((saved.criteria||[]).includes(i)?'checked':'')+'><span>'+esc(x)+'</span></label>').join('')+'</div><button class="btn primary" id="ef-save-speaking">Save practice</button></section></div>';
  }
  async function startRecording(){
    const status=doc().getElementById('ef-speaking-status');
    if(!global.navigator?.mediaDevices?.getUserMedia||!global.MediaRecorder){status.textContent='Recording is not supported in this browser. You can still use the transcript and self-assessment.';return;}
    try{
      stateVars.mediaStream=await global.navigator.mediaDevices.getUserMedia({audio:true});stateVars.mediaChunks=[];
      stateVars.mediaRecorder=new global.MediaRecorder(stateVars.mediaStream);
      stateVars.mediaRecorder.ondataavailable=e=>{if(e.data&&e.data.size)stateVars.mediaChunks.push(e.data);};
      stateVars.mediaRecorder.onstop=()=>{
        const blob=new Blob(stateVars.mediaChunks,{type:stateVars.mediaRecorder.mimeType||'audio/webm'});
        if(stateVars.mediaUrl)global.URL.revokeObjectURL(stateVars.mediaUrl);
        stateVars.mediaUrl=global.URL.createObjectURL(blob);
        const audio=doc().getElementById('ef-record-audio');audio.src=stateVars.mediaUrl;audio.hidden=false;
        ['ef-play-record','ef-download-record'].forEach(id=>doc().getElementById(id).disabled=false);
        stateVars.mediaStream?.getTracks().forEach(t=>t.stop());stateVars.mediaStream=null;
        status.textContent='Recording ready. Listen to it and repeat once with one improvement in mind.';
      };
      stateVars.mediaRecorder.start();doc().getElementById('ef-record').disabled=true;doc().getElementById('ef-stop-record').disabled=false;status.textContent='Recording… speak in English, then press Stop.';
    }catch(error){status.textContent='Microphone access failed. Check browser permission and use HTTPS or localhost.';}
  }
  function stopRecording(){
    if(stateVars.mediaRecorder&&stateVars.mediaRecorder.state!=='inactive')stateVars.mediaRecorder.stop();
    const a=doc().getElementById('ef-record');if(a)a.disabled=false;
    const b=doc().getElementById('ef-stop-record');if(b)b.disabled=true;
  }
  function startRecognition(){
    const Recognition=global.SpeechRecognition||global.webkitSpeechRecognition, status=doc().getElementById('ef-speaking-status');
    if(!Recognition){status.textContent='Speech recognition is not supported here. Type your transcript instead.';return;}
    const recognition=new Recognition();stateVars.recognition=recognition;recognition.lang=stateVars.ttsVoice;recognition.interimResults=false;recognition.maxAlternatives=1;
    recognition.onresult=e=>{const field=doc().getElementById('ef-speaking-transcript');field.value=(field.value?field.value+' ':'')+e.results[0][0].transcript;status.textContent='Transcript received. Review possible recognition mistakes.';};
    recognition.onerror=()=>{status.textContent='Recognition did not complete. You can type your transcript.';};
    recognition.onend=()=>{stateVars.recognition=null;};
    try{recognition.start();status.textContent='Listening to your speech…';}catch(error){status.textContent='Could not start speech recognition.';}
  }
  function saveSpeaking(){
    const item=speaking.find(x=>x.level===stateVars.activeSpeaking),transcript=doc().getElementById('ef-speaking-transcript').value.trim();
    const criteria=[...doc().querySelectorAll('[data-ef-rubric]:checked')].map(x=>Number(x.dataset.efRubric));
    if(transcript.length<20&&!stateVars.mediaUrl){doc().getElementById('ef-speaking-status').textContent='Record your answer or write a transcript with at least 20 characters.';return;}
    if(criteria.length<2){doc().getElementById('ef-speaking-status').textContent='Mark at least two criteria that your answer meets.';return;}
    const s=read();s.speaking[item.level]={done:true,transcript,criteria,at:new Date().toISOString()};save(s);renderSpeakingTask();doc().getElementById('ef-speaking-status').textContent='Practice saved. Next time, repeat the task and improve one criterion.';
  }
  function openWriting(level){
    stateVars.activeWriting=level;renderWritingTask();
  }
  function renderWritingTask(){
    const item=writing.find(x=>x.level===stateVars.activeWriting),root=doc().getElementById('s-english');if(!item||!root)return;
    const s=read(),saved=s.writing[item.level]||'';
    root.innerHTML='<div class="ef-page"><button class="btn" data-ef-back>← Writing</button><div class="ef-unit-tags"><span>'+item.level+'</span><span>Writing production</span></div><h1 class="ef-page-title">'+esc(item.title)+'</h1><p class="ef-intro">'+esc(item.goal)+'</p><section class="ef-content-panel"><h2>Writing prompt</h2><p>'+esc(item.prompt)+'</p><div class="ef-rubric">'+item.checklist.map(x=>'<label><input type="checkbox"><span>'+esc(x)+'</span></label>').join('')+'</div><label class="ef-field-label" for="ef-writing-text">Your draft</label><textarea id="ef-writing-text" rows="12" maxlength="10000" placeholder="Write your answer in English...">'+esc(saved)+'</textarea><div class="ef-writing-metrics"><span id="ef-word-count">0 words</span><span id="ef-writing-status">Saved on this device</span></div><div class="ef-audio-controls"><button class="btn" id="ef-save-writing">Save draft</button><button class="btn primary" id="ef-writing-ai">Ask AI tutor to review</button></div></section></div>';
    updateWordCount();
  }
  function updateWordCount(){
    const field=doc().getElementById('ef-writing-text'),target=doc().getElementById('ef-word-count');if(!field||!target)return;
    const n=field.value.trim()?field.value.trim().split(/\s+/).length:0;target.textContent=n+' words';
  }
  function saveWriting(){
    const item=writing.find(x=>x.level===stateVars.activeWriting);const text=doc().getElementById('ef-writing-text').value;
    const s=read();s.writing[item.level]=text;save(s);doc().getElementById('ef-writing-status').textContent='Draft saved locally.';
  }
  function sendWritingToAI(){
    saveWriting();
    const item=writing.find(x=>x.level===stateVars.activeWriting),text=doc().getElementById('ef-writing-text').value.trim();
    if(!text){doc().getElementById('ef-writing-status').textContent='Write a draft first.';return;}
    const nav=doc().querySelector('[data-nav="ai"]');if(nav)nav.click();
    const field=doc().getElementById('ai-question'),area=doc().getElementById('ai-area');
    if(area)area.value='Inglês';
    if(field)field.value='Act as an English writing tutor at CEFR '+item.level+'. Review my draft against the task below. Explain corrections without rewriting everything for me. Identify grammar, vocabulary, register, cohesion and task achievement. Show a corrected version of my most important sentences, explain why, and give me a short revision task. Do not invent an official exam score.\\n\\nTask: '+item.prompt+'\\n\\nMy draft:\\n'+text;
  }
  function rateFlashcard(rating){
    const s=read(),cards=allVocabulary(),due=cards.filter(item=>!s.vocab[item.id]||!s.vocab[item.id].nextAt||new Date(s.vocab[item.id].nextAt).getTime()<=Date.now());
    const item=due[stateVars.flashIndex%due.length];if(!item)return;
    const old=s.vocab[item.id]||{interval:0,reps:0};
    const intervals={again:1,hard:2,good:4,easy:7};
    let days=intervals[rating];
    if(rating==='good'&&old.reps>0)days=Math.min(30,Math.max(4,Math.round((old.interval||2)*1.8)));
    if(rating==='easy'&&old.reps>0)days=Math.min(45,Math.max(7,Math.round((old.interval||2)*2.6)));
    if(rating==='again')old.reps=0;else old.reps=(old.reps||0)+1;
    const next=new Date();next.setDate(next.getDate()+days);
    s.vocab[item.id]={interval:days,reps:old.reps,nextAt:next.toISOString(),lastRating:rating};save(s);
    stateVars.flashIndex=0;stateVars.flashRevealed=false;render();
  }
  function handleClick(event){
    const target=event.target.closest('[data-ef-tab],[data-ef-skill],[data-ef-level],[data-ef-open],[data-ef-answer],[data-ef-listen],[data-ef-speaking],[data-ef-writing],[data-ef-rate],[data-ef-daily],[data-ef-action],#ef-reveal-vocab,#ef-check-answer,#ef-next-question,#ef-save-example,#ef-play,#ef-play-slow,#ef-stop-audio,#ef-show-script,#ef-check-listen,#ef-model-audio,#ef-record,#ef-stop-record,#ef-play-record,#ef-download-record,#ef-recognise,#ef-listen-finish,#ef-save-speaking,#ef-save-writing,#ef-writing-ai,#ef-ask-ai,[data-ef-back]');
    if(!target)return;
    if(target.matches('[data-ef-tab]')){stateVars.tab=target.dataset.efTab;stateVars.activeLesson=null;stateVars.activeListening=null;render();}
    else if(target.matches('[data-ef-skill]')){const skill=target.dataset.efSkill;if(skill==='reading'||skill==='grammar'){stateVars.tab='lessons';stateVars.skill=skill==='reading'?'Reading':'Grammar';}else if(['listening','speaking','writing','vocabulary'].includes(skill)){stateVars.tab=skill;stateVars.skill='All';}render();}
    else if(target.matches('[data-ef-level]')){stateVars.tab='lessons';stateVars.level=target.dataset.efLevel;stateVars.skill='All';render();}
    else if(target.matches('[data-ef-open]'))openLesson(target.dataset.efOpen);
    else if(target.matches('[data-ef-back]')){stateVars.activeLesson=null;stateVars.activeListening=null;stateVars.activeSpeaking=null;stateVars.activeWriting=null;render();}
    else if(target.matches('[data-ef-answer]')){if(stateVars.answered)return;stateVars.selected=Number(target.dataset.efAnswer);if(stateVars.activeLesson)renderLesson();else if(stateVars.activeListening)renderListeningTask();}
    else if(target.id==='ef-check-answer'){if(stateVars.activeLesson)checkAnswer();else if(stateVars.activeListening)checkListening();}
    else if(target.id==='ef-next-question'){if(stateVars.activeLesson)nextQuestion();}else if(target.id==='ef-listen-finish'){stateVars.activeListening=null;stateVars.tab='listening';render();}
    else if(target.id==='ef-reveal-vocab'){stateVars.flashRevealed=true;render();}
    else if(target.matches('[data-ef-rate]'))rateFlashcard(target.dataset.efRate);
    else if(target.matches('[data-ef-listen]'))openListening(target.dataset.efListen);
    else if(target.matches('[data-ef-speaking]'))openSpeaking(target.dataset.efSpeaking);
    else if(target.matches('[data-ef-writing]'))openWriting(target.dataset.efWriting);
    else if(target.id==='ef-play'||target.id==='ef-play-slow'){const item=listening.find(x=>x.id===stateVars.activeListening);if(item)speakText(item.script,target.id==='ef-play-slow'?0.72:0.92,doc().getElementById('ef-voice')?.value||'en-US');}
    else if(target.id==='ef-stop-audio'){global.speechSynthesis?.cancel();}
    else if(target.id==='ef-show-script'){const node=doc().getElementById('ef-script');if(node)node.hidden=!node.hidden;}
    else if(target.matches('[data-ef-check-listen]'))checkListening();
    else if(target.id==='ef-model-audio'){const item=speaking.find(x=>x.level===stateVars.activeSpeaking);if(item)speakText(item.model,0.88,stateVars.ttsVoice);}
    else if(target.id==='ef-record')startRecording();
    else if(target.id==='ef-stop-record')stopRecording();
    else if(target.id==='ef-play-record'){const audio=doc().getElementById('ef-record-audio');audio?.play().catch(()=>{});}
    else if(target.id==='ef-download-record'){if(stateVars.mediaUrl){const a=doc().createElement('a');a.href=stateVars.mediaUrl;a.download='english-forge-speaking.webm';a.click();}}
    else if(target.id==='ef-recognise')startRecognition();
    else if(target.id==='ef-save-speaking')saveSpeaking();
    else if(target.id==='ef-save-writing')saveWriting();
    else if(target.id==='ef-writing-ai')sendWritingToAI();
    else if(target.id==='ef-ask-ai')sendQuestionToAI();
    else if(target.id==='ef-save-example'){const lesson=lessons.find(x=>x.id===stateVars.activeLesson),field=doc().getElementById('ef-own-example');if(lesson&&field){const s=read();s.writing['example-'+lesson.id]=field.value;save(s);doc().getElementById('ef-example-status').textContent='Example saved locally.';}}
    else if(target.hasAttribute('data-ef-daily')){const s=read(),today=new Date().toISOString().slice(0,10);if(!s.daily||s.daily.date!==today)s.daily={date:today,done:{}};s.daily.done[target.dataset.efDaily]=target.checked;save(s);render();}
  }
  function sendQuestionToAI(){
    const lesson=lessons.find(x=>x.id===stateVars.activeLesson);if(!lesson)return;
    const item=lesson.questions[stateVars.questionIndex],nav=doc().querySelector('[data-nav="ai"]');if(nav)nav.click();
    const area=doc().getElementById('ai-area'),field=doc().getElementById('ai-question');if(area)area.value='Inglês';
    if(field)field.value='Teach me this CEFR '+lesson.level+' English question in depth. Question: '+item.prompt+'\\nOptions: '+item.options.map((x,i)=>String.fromCharCode(65+i)+') '+x).join('\\n')+'\\nCorrect answer: '+item.options[item.answer]+'. Explain the grammar or reading concept, the solution steps, each wrong option, the common trap, and give me three new examples at the same level. Keep the explanation bilingual when useful.';
  }
  function handleChange(event){
    if(event.target.id==='ef-level-filter'){stateVars.level=event.target.value;render();}
    if(event.target.id==='ef-skill-filter'){stateVars.skill=event.target.value;render();}
    if(event.target.hasAttribute('data-ef-rubric')){}
  }
  function handleInput(event){
    if(event.target.id==='ef-writing-text')updateWordCount();
  }
  function init(){
    if(!doc()||doc().__englishForgeBound)return;
    doc().__englishForgeBound=true;
    doc().addEventListener('click',handleClick);
    doc().addEventListener('change',handleChange);
    doc().addEventListener('input',handleInput);
  }
  function doc(){return global.document||null;}
  function exportProgress(){return read();}
  function validateProgress(value){return !!sanitize(value);}
  function importProgress(value){const clean=sanitize(value);if(!clean||!save(clean))return false;global.speechSynthesis?.cancel();stateVars.activeLesson=null;stateVars.activeListening=null;stateVars.activeSpeaking=null;stateVars.activeWriting=null;stateVars.selected=null;stateVars.answered=false;render();return true;}
  function resetProgress(){if(!save(defaultState()))return false;try{global.localStorage.removeItem(OLD_KEY);}catch(error){}global.speechSynthesis?.cancel();stateVars.activeLesson=null;stateVars.activeListening=null;stateVars.activeSpeaking=null;stateVars.activeWriting=null;stateVars.selected=null;stateVars.answered=false;render();return true;}
  const api={render,init,exportProgress,importProgress,validateProgress,resetProgress,levels:LEVELS,lessons,counts:()=>({levels:LEVELS.length,units:lessons.length,questions:lessons.reduce((n,x)=>n+x.questions.length,0),listening:listening.length,speaking:speaking.length,writing:writing.length,vocabulary:allVocabulary().length})};
  global.MindForgeEnglish=api;
  init();
})(window);