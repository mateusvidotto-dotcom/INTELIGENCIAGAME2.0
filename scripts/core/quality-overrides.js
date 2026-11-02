(function (global) {
  'use strict';
  const MF = global.MindForge;

  // Distratores curatoriais: cada conjunto preserva o índice e o sentido do gabarito,
  // substitui alternativas fracas e, quando necessário, reescreve a correta para
  // reduzir pistas de comprimento. A ordem visível é embaralhada a cada sessão.
  const distractors = {
    logic: {
      'logic-005': ['Alguns pesquisadores também tocam violão.', 'Todos os pesquisadores também tocam violão.', 'Pesquisadores e músicos necessariamente são grupos sem sobreposição.'],
      'logic-010': ['A chave fica em A, pois a etiqueta de A é falsa e as outras duas são verdadeiras.', 'A chave fica em C, pois as etiquetas A e C seriam verdadeiras nessa hipótese.', 'Nenhuma localização satisfaz o requisito de exatamente duas etiquetas verdadeiras.'],
      'logic-014': ['O time teve duas vitórias, além dos três empates informados.', 'O time teve quatro vitórias, pois 12 pontos seria o total mais próximo.', 'Os dados são incompatíveis com a regra de pontuação apresentada.']
    },
    strategy: {
      'strategy-001': ['Reler todos os tópicos na ordem e usar a familiaridade do texto como sinal de domínio.', 'Distribuir o tempo igualmente entre assuntos, mesmo quando as necessidades são diferentes.', 'Revisar somente o tópico mais difícil, sem verificar se os erros podem ser corrigidos no tempo disponível.'],
      'strategy-002': ['Definir os critérios depois de conhecer qual proposta tem mais apoio na equipe.', 'Comparar somente o custo financeiro e deixar os objetivos implícitos.', 'Atribuir o mesmo peso a todos os critérios antes de avaliar se possuem a mesma importância.'],
      'strategy-003': ['Preferir a explicação que combina com a expectativa inicial e procurar exemplos que a confirmem.', 'Reunir mais dados do mesmo tipo, mesmo que as duas hipóteses façam as mesmas previsões.', 'Escolher a hipótese mais simples sem verificar se ela distingue os resultados possíveis.'],
      'strategy-004': ['Corrigir o número e seguir adiante sem registrar a mudança nem conferir sua origem.', 'Suspender toda a decisão até que cada parte do relatório seja verificada novamente.', 'Tratar a inconsistência como prova de que o autor não é confiável em nenhum aspecto.'],
      'strategy-005': ['Começar pela etapa mais interessante, mesmo que ela dependa de tarefas ainda não feitas.', 'Planejar todas as etapas em detalhes antes de executar qualquer passo pequeno.', 'Alternar entre várias partes da tarefa sempre que uma delas exigir esforço.'],
      'strategy-006': ['Investigar até eliminar a incerteza, mesmo que a decisão perca sua utilidade pelo atraso.', 'Agir imediatamente sempre que houver uma opção plausível, independentemente do impacto do erro.', 'Escolher a alternativa com mais dados disponíveis, mesmo que sejam pouco relevantes para a decisão.'],
      'strategy-007': ['Pedir uma votação anônima depois de apresentar somente os argumentos de quem lidera a discussão.', 'Permitir objeções apenas depois que a equipe já tiver se comprometido publicamente com a proposta.', 'Tratar a quantidade de repetições de um argumento como evidência de sua força.'],
      'strategy-008': ['Manter a estratégia original e aumentar apenas o esforço aplicado ao problema novo.', 'Substituir toda a estratégia por uma completamente diferente antes de identificar a causa da falha.', 'Comparar o resultado novo apenas com o melhor resultado antigo, sem considerar as condições da tarefa.'],
      'strategy-009': ['Ordenar os riscos apenas pela probabilidade e avaliar o dano depois de iniciar o trabalho.', 'Priorizar somente o dano potencial, tratando riscos raros e comuns da mesma maneira.', 'Corrigir primeiro o erro de menor custo, mesmo que não altere o risco geral do sistema.'],
      'strategy-010': ['Aumentar o investimento inicial para tornar mais caro reconsiderar a hipótese.', 'Monitorar o resultado final, mas definir os sinais de alerta somente depois de observar o desfecho.', 'Preparar uma alternativa sem indicar em que evidências seria razoável acioná-la.'],
      'strategy-011': ['Usar o benefício imediato como critério principal e tratar os efeitos futuros como difíceis de estimar.', 'Escolher o objetivo de longo prazo por princípio, independentemente dos compromissos imediatos.', 'Converter os dois objetivos em uma única medida, ocultando os conflitos entre eles.'],
      'strategy-012': ['Manter o plano e reinterpretar os novos dados como uma exceção sem testar essa hipótese.', 'Mudar imediatamente todas as partes do plano, sem estimar o custo de transição.', 'Descartar a decisão inteira, inclusive componentes que não dependiam da premissa refutada.'],
      'strategy-013': ['Escolher a ferramenta mais conhecida antes de estabelecer como o teste será avaliado.', 'Comparar as ferramentas apenas por uma demonstração favorável escolhida depois do teste.', 'Adotar a ferramenta com mais recursos, ainda que o teste indique pouca utilidade para o objetivo.'],
      'strategy-014': ['Estimar a probabilidade exata de cada falha a partir da imaginação da equipe.', 'Usar as causas imaginadas para cancelar automaticamente o projeto sem verificar os riscos.', 'Registrar as falhas possíveis, mas não associá-las a sinais de alerta ou medidas preventivas.'],
      'strategy-015': ['Distribuir o esforço igualmente pelas tarefas, mesmo que uma dependência impeça o avanço.', 'Acelerar uma tarefa independente porque é possível concluí-la rapidamente.', 'Reduzir o prazo de todas as tarefas sem verificar qual delas controla o término do projeto.'],
      'strategy-016': ['Esperar por qualquer dado adicional, mesmo que não possa alterar a escolha entre as opções.', 'Escolher hoje e usar a informação de amanhã apenas para justificar a decisão já tomada.', 'Adiar a decisão sem estabelecer qual informação será observada nem quando ela estará disponível.'],
      'strategy-017': ['Preservar todas as funcionalidades previstas e aceitar que o prazo e o orçamento sejam ultrapassados.', 'Reduzir o orçamento linearmente em todas as tarefas, independentemente do benefício de cada uma.', 'Medir o avanço pelo número de itens concluídos, mesmo quando a qualidade final é o objetivo central.'],
      'strategy-018': ['Acrescentar mais casas decimais ao indicador principal e manter a mesma regra de recompensa.', 'Auditar apenas os casos que pioram a métrica, sem procurar possíveis efeitos adversos.', 'Substituir o indicador por outro único que também possa ser otimizado sem atingir o objetivo real.'],
      'strategy-019': ['Priorizar a tarefa mais curta, ainda que não tenha prazo próximo nem desbloqueie outras tarefas.', 'Ordenar tarefas só pelo prazo nominal, ignorando consequências de atraso e dependências.', 'Começar pelas três tarefas ao mesmo tempo para evitar decidir qual delas vem primeiro.'],
      'strategy-020': ['Abandonar a hipótese assim que houver três resultados desfavoráveis, independentemente da qualidade dos testes.', 'Manter a hipótese até que exista prova definitiva contra ela, mesmo com evidência acumulada em contrário.', 'Alterar os critérios após cada resultado para preservar a conclusão preferida.']
    },
    interdisciplinary: {
      'inter-001': ['Comparar a planta mais alta de cada grupo e concluir a partir desses dois casos.', 'Usar grupos de tamanhos iguais, mas permitir que recebam quantidades diferentes de água e adubo.', 'Repetir a medição sem registrar as condições em que as plantas foram cultivadas.'],
      'inter-002': ['Preferir a fonte mais próxima temporalmente sem verificar sua independência nem seu objetivo.', 'Tomar a concordância entre duas fontes como prova conclusiva mesmo se uma copiar a outra.', 'Dar prioridade à fonte que confirma a interpretação já adotada pelo pesquisador.'],
      'inter-003': ['Tratar a intenção teológica do texto como se fosse uma descrição moderna e neutra do evento.', 'Usar uma semelhança arqueológica geral como comprovação direta de cada detalhe narrativo.', 'Separar texto e história, mas não explicitar os passos inferenciais que ligam um ao outro.'],
      'inter-004': ['Comparar os percentuais diretamente, mesmo quando os grupos têm tamanhos diferentes.', 'Usar o denominador correto, mas ignorar se os períodos e definições das medidas coincidem.', 'Aceitar o número publicado e verificar a metodologia somente se o resultado parecer surpreendente.'],
      'inter-005': ['Ajustar o modelo até reproduzir perfeitamente os dados do grupo novo, sem reservar dados de avaliação.', 'Usar a média geral como única métrica e assumir que diferenças entre grupos são ruído.', 'Recalibrar o limiar com poucos casos e presumir que isso elimina o viés de representação.'],
      'inter-006': ['Escolher a regra que produz o próximo número desejado e tratá-la como se fosse a única possível.', 'Aumentar o número de termos observados e assumir que a regra fica única sem critérios adicionais.', 'Preferir a fórmula mais complexa porque ela consegue ajustar todos os termos conhecidos.'],
      'inter-007': ['Definir a ação moral a partir do resultado científico mais provável, sem discutir quem recebe os custos.', 'Escolher os valores éticos primeiro e ignorar previsões científicas que contrariem a opção favorita.', 'Tratar qualquer compromisso de valor como uma falha que impede a decisão.'],
      'inter-008': ['Aplicar a definição contemporânea da palavra e considerar o significado histórico secundário.', 'Usar apenas um dicionário moderno, sem examinar exemplos do mesmo período e gênero.', 'Evitar qualquer aplicação atual por considerar impossível compreender textos antigos.'],
      'inter-009': ['Tratar uma análise adicional como confirmação independente, embora use os mesmos dados.', 'Aceitar o resultado se o valor estatístico ultrapassar um limiar, sem examinar o número de análises.', 'Buscar uma nova amostra somente se ela produzir o mesmo resultado da primeira.'],
      'inter-010': ['Dar prioridade automática à fonte mais antiga, sem considerar gênero ou proximidade do evento.', 'Considerar diferenças de finalidade textual irrelevantes para interpretar o relato.', 'Exigir que evidências externas confirmem cada detalhe antes de avaliar o que o texto pretende comunicar.'],
      'inter-011': ['Comparar somente as médias antes e depois, mesmo que composição e condições da turma tenham mudado.', 'Atribuir a mudança à rotina porque ela ocorreu primeiro, sem grupo ou série de comparação.', 'Desconsiderar a variação individual e analisar apenas o aluno com maior melhora.'],
      'inter-012': ['Aplicar a lei atual por analogia, sem reconstruir a função social da lei antiga.', 'Usar o contexto histórico como único critério e ignorar o sentido das palavras no texto.', 'Assumir que semelhanças entre duas situações tornam idênticas suas obrigações morais e legais.'],
      'inter-013': ['Comparar o consumo total sem ajustá-lo ao tamanho e às características das populações.', 'Dividir o total pela área territorial, mesmo que a pergunta seja sobre consumo individual.', 'Somar as médias das regiões e usar o total como se representasse uma pessoa típica.'],
      'inter-014': ['Alterar vários parâmetros ao mesmo tempo e atribuir toda diferença ao alimento disponível.', 'Aumentar a resolução numérica do modelo e assumir que isso compensa as suposições simplificadoras.', 'Calibrar o modelo com o mesmo cenário e tratar a reprodução desse cenário como validação geral.'],
      'inter-015': ['Considerar conformidade técnica suficiente se a maioria dos participantes conclui a tarefa.', 'Tratar a acessibilidade como melhoria opcional depois do lançamento, sem avaliar barreiras atuais.', 'Medir apenas compatibilidade com leitores de tela e ignorar teclado, contraste e compreensão.'],
      'inter-016': ['Escolher a opção com a maior consequência mensurável sem discutir como os benefícios e custos são distribuídos.', 'Usar a popularidade de um valor moral como substituto de uma análise de consequências.', 'Tratar qualquer conflito de valores como algo que dados adicionais necessariamente eliminarão.'],
      'inter-017': ['Aceitar a interpretação se a imagem for de alta resolução e vier acompanhada de uma legenda técnica.', 'Procurar apenas uma fonte independente que concorde, sem comparar explicações alternativas.', 'Rejeitar a hipótese antes de consultar especialistas porque afirmações extraordinárias são sempre falsas.'],
      'inter-018': ['Tratar significância estatística como prova de que o efeito é grande o bastante para mudar a prática.', 'Ignorar o tamanho do efeito e decidir apenas pela quantidade de participantes.', 'Considerar o efeito irrelevante sem analisar custos, benefícios ou contexto de aplicação.'],
      'inter-019': ['Implantar o sistema se a média global supera o modelo anterior, adiando a análise dos subgrupos.', 'Comparar subgrupos somente depois de agregar os resultados para escolher a métrica mais favorável.', 'Remover variáveis do conjunto de dados sem analisar se isso reduz a representação do grupo.'],
      'inter-020': ['Comparar traduções ou resumos sem identificar precisamente quais afirmações parecem incompatíveis.', 'Resolver a diferença apenas pela reputação geral de uma das fontes, sem examinar a afirmação específica.', 'Tratar qualquer divergência como irreconciliável antes de conferir cronologia, gênero e escopo.']
    },
    critical: {
      'critical-001': ['O calor explica necessariamente todos os casos, sem que seja preciso investigar outros fatores.', 'A associação demonstra causalidade, desde que as duas medidas tenham subido no mesmo período.', 'As variáveis não podem ter relação alguma se uma terceira variável também as influencia.'],
      'critical-002': ['A crítica troca a análise das razões por uma avaliação pessoal da autora.', 'A afirmação confunde a qualidade da pessoa com a validade da tese discutida.', 'A conclusão depende de uma característica pessoal que não refuta as evidências.'],
      'critical-003': ['A amostra é representativa porque os conhecidos do autor pertencem à mesma sociedade.', 'A conclusão vale para o país se nenhum conhecido do autor deixou de usar o aplicativo.', 'O argumento é forte porque o autor observou diretamente as pessoas citadas.'],
      'critical-004': ['A proposta foi resumida fielmente, mas a conclusão rejeita suas consequências práticas.', 'O argumento recorre a dados quantitativos que contradizem diretamente a proposta.', 'A crítica é uma concessão: aceita a redução de uso e discute seus limites.'],
      'critical-005': ['É uma generalização apressada que usa poucos casos para avaliar uma população.', 'É uma falsa causa porque toda conclusão sobre educação depende de experimento.', 'É um apelo à autoridade: a pessoa invoca um especialista para encerrar a discussão.'],
      'critical-006': ['Um grupo voluntário sem comparação, desde que os participantes relatem satisfação elevada.', 'Uma comparação antes/depois sem registrar outras mudanças ocorridas no mesmo período.', 'Uma amostra grande sem descrição de seleção, medida de resultado ou incerteza.'],
      'critical-007': ['Viés de disponibilidade', 'Efeito de ancoragem', 'Regressão à média'],
      'critical-008': ['A conclusão é verdadeira apenas porque a palavra “mamífero” aparece nas duas premissas.', 'A forma é inválida porque a segunda premissa não contém uma porcentagem.', 'A conclusão é indutiva, pois depende de observações repetidas de cada baleia.'],
      'critical-009': ['A conclusão é uma refutação válida de toda a área, desde que a previsão tenha falhado.', 'O erro em uma previsão mostra que a fonte não possui conhecimento relevante em nenhum assunto.', 'A crítica testa a evidência da afirmação específica, em vez de avaliar a pessoa.'],
      'critical-010': ['Buscar um resumo que repita a afirmação e usá-lo como confirmação independente.', 'Rejeitar a alegação sem buscar a origem, usando a ausência de link como prova de falsidade.', 'Usar a quantidade de compartilhamentos como estimativa da qualidade do método.'],
      'critical-011': ['Todas as premissas precisam ser verdadeiras.', 'A forma do argumento é necessariamente inválida.', 'A validade garante premissas verdadeiras.'],
      'critical-012': ['Somente a sensibilidade, pois a especificidade e a prevalência deixam de importar após um positivo.', 'A proporção de resultados positivos na amostra, sem considerar a taxa-base da condição.', 'A repetição do mesmo teste até que o resultado positivo se torne mais provável.'],
      'critical-013': ['O autor pode provar a conclusão apenas repetindo a mesma afirmação em palavras diferentes.', 'A circularidade desapareceria se a mesma premissa fosse apresentada com mais confiança.', 'O raciocínio é indutivo porque considera a reputação do autor como dado independente.'],
      'critical-014': ['Escolher o estudo com o resultado mais forte sem comparar os métodos utilizados.', 'Considerar que resultados diferentes se anulam e não permitem qualquer inferência.', 'Dar prioridade automática ao estudo mais recente, mesmo que a amostra seja menos adequada.'],
      'critical-015': ['O relato parcial pode enviesar a percepção, embora os resultados apresentados sejam autênticos.', 'A apresentação seletiva demonstra que todos os resultados não publicados foram negativos.', 'A seleção não é relevante se cada resultado publicado tiver um valor estatístico pequeno.'],
      'critical-016': ['Um argumento indutivo é dedutivamente inválido e por isso não acrescenta evidência.', 'Se premissas verdadeiras tornam a conclusão provável, ela é necessariamente verdadeira.', 'A força de um argumento depende apenas de a conclusão parecer intuitiva ao leitor.'],
      'critical-017': ['A mudança temporal basta, desde que a empresa tenha medido produtividade antes e depois.', 'A alegação deve ser rejeitada porque políticas nunca causam alterações de produtividade.', 'Uma testemunha favorável à política é evidência causal suficiente sem comparação adicional.'],
      'critical-018': ['A hipótese é falsa sempre que o autor não conhece um estudo que a comprove.', 'A falta de evidência conhecida equivale a evidência conclusiva de ausência em qualquer área.', 'Uma hipótese deve ser aceita até que seja demonstrada falsa por um único experimento.'],
      'critical-019': ['Verificar se a conclusão parece provável diante das crenças mais comuns.', 'Contar quantas premissas apoiam a conclusão e comparar esse número com as objeções.', 'Examinar se quem argumenta possui experiência pessoal com o assunto.'],
      'critical-020': ['Aceitar a afirmação pela reputação geral da fonte, sem conferir sua competência no tema específico.', 'Rejeitar toda publicação da fonte porque uma frase está fora da especialidade principal.', 'Avaliar apenas se a afirmação coincide com a opinião de outros seguidores da fonte.']
    },
    bible: {
      'bible-006': ['Saulo é preso em Damasco e enviado imediatamente a Roma pelas autoridades locais.', 'Saulo recebe a comissão em Jerusalém antes de qualquer acontecimento no caminho.', 'Saulo viaja como representante autorizado e retorna sem mudar sua posição diante dos cristãos.'],
      'bible-007': ['Amor, alegria, paz, paciência, prudência, sabedoria, justiça, coragem e perseverança.', 'Amor, alegria, paz, paciência, amabilidade, bondade, esperança, humildade e domínio próprio.', 'Amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, generosidade e confiança.'],
      'bible-014': ['Uma oferta usada exclusivamente pelos sacerdotes no santuário durante as festas.', 'O nome dado à coluna de nuvem que guiava o povo durante a jornada.', 'Um rito de purificação realizado antes da entrada na terra prometida.'],
      'bible-008': ['O poema ensina que cada acontecimento possui uma data previsível que pode ser calculada.', 'O texto atribui todo sofrimento humano a decisões morais individuais.', 'A passagem recomenda evitar a participação humana em qualquer atividade social.'],
      'bible-009': ['Paulo concentra o argumento em conquistar prestígio comunitário por meio de posição e poder.', 'O hino apresenta Cristo como exemplo sem relação com a exortação ética da comunidade.', 'A passagem discute principalmente como ordenar as festas anuais do calendário judaico.'],
      'bible-011': ['A coragem militar e a conquista de territórios.', 'A linhagem dos reis e a unidade do reino.', 'A observância ritual como garantia de prosperidade.'],
      'bible-013': ['O relato elogia os bereanos por aceitar a mensagem sem comparar suas afirmações com as Escrituras.', 'Os bereanos são descritos como rejeitando toda instrução oral antes de ouvir o conteúdo.', 'O texto afirma que a comunidade verificou a mensagem exclusivamente por sinais políticos.'],
      'bible-019': ['O capítulo termina com a restauração do templo de Salomão e a volta dos sacerdotes.', 'A visão descreve sobretudo a reconstrução de Jerusalém após o exílio babilônico.', 'O texto conclui com a coroação de um rei terreno que governa a cidade renovada.'],
      'bible-020': ['Um rei que protege a cidade contra seus inimigos.', 'Um juiz que examina as faltas e anuncia a sentença.', 'Um agricultor que prepara a terra para a colheita.'],
      'bible-021': ['A carta é dirigida aos líderes persas e promete retorno imediato após sete semanas.', 'O texto é um discurso aos discípulos na Galileia com referência a quarenta dias.', 'A promessa é dirigida aos cristãos em Roma e fixa doze anos para o retorno.'],
      'bible-022': ['A garantia de vencer qualquer disputa por força de vontade.', 'A promessa de prosperidade material em toda circunstância.', 'A ideia de que a necessidade material prova falta de fé.'],
      'bible-023': ['O contexto imediato é uma instrução sobre como selecionar os doze apóstolos.', 'A passagem está inserida no relato do nascimento e da infância de Jesus.', 'A seção discute a reconstrução do templo e a ordem dos sacrifícios.'],
      'bible-024': ['As parábolas respondem principalmente a uma disputa sobre tributos imperiais e autoridade romana.', 'O capítulo começa com uma discussão sobre a reconstrução do templo de Jerusalém.', 'A narrativa foi introduzida por uma controvérsia sobre a sucessão de Herodes.'],
      'bible-025': ['O texto afirma que qualquer posse de dinheiro é, por si só, a raiz de todos os males.', 'A carta proíbe expressamente o trabalho remunerado e toda forma de planejamento financeiro.', 'A passagem trata a riqueza como evidência suficiente de fidelidade e maturidade espiritual.'],
      'bible-026': ['Tiago pergunta principalmente quando ocorrerá a volta de Cristo e como calcular a data.', 'O argumento central é a reconstrução das regras do tabernáculo e dos sacrifícios.', 'O capítulo apresenta uma cronologia de imperadores romanos como evidência da fé.']
    },
    science: {
      'science-014': ['A massa dos produtos pode variar conforme o estado físico em que são medidos.', 'A massa total diminui quando os átomos formam ligações químicas mais estáveis.', 'A massa pode mudar porque os átomos se transformam em elementos diferentes.'],
      'science-017': ['Antibióticos estimulam os anticorpos a reconhecer qualquer agente, incluindo o vírus que causa a infecção.', 'Como vírus possuem estruturas próprias, antibióticos interrompem diretamente seu mecanismo de reprodução.', 'Antibióticos tratam o agente viral ao reduzir a inflamação, mesmo sem atingir o vírus causador.'],
      'science-006': ['Transformar matéria orgânica diretamente em energia luminosa sem etapas químicas.', 'Produzir a maior parte do oxigênio atmosférico por meio da respiração celular.', 'Consumir somente organismos vivos e interromper o retorno de nutrientes ao solo.'],
      'science-008': ['Uma correlação positiva demonstra causalidade quando as observações são numerosas.', 'A presença de uma variável adicional prova que as duas primeiras não possuem relação.', 'A associação é suficiente para estabelecer a direção causal se uma variável muda antes da outra.'],
      'science-009': ['Uma proposta que explica os dados conhecidos, mas não permite imaginar observações contrárias.', 'Uma explicação confirmada de antemão que não deve mudar diante de novos resultados.', 'Uma previsão baseada exclusivamente na preferência do pesquisador.'],
      'science-012': ['Manter constantes as condições para que o resultado esperado ocorra necessariamente.', 'Impedir qualquer variação nos dados, inclusive a variação da variável estudada.', 'Remover a necessidade de replicar o experimento e verificar incertezas.'],
      'science-013': ['Dez resultados iguais tornam matematicamente impossível que a moeda seja justa.', 'A próxima jogada deve ser coroa porque os resultados anteriores precisam se equilibrar.', 'O resultado prova que a probabilidade de cara não era de 1/2 antes dos lançamentos.'],
      'science-015': ['Indivíduos desenvolvem mutações úteis porque o ambiente cria a necessidade durante a vida.', 'A seleção natural produz características perfeitas e elimina toda variação sem benefício.', 'Todo traço observado precisa ter surgido porque oferece vantagem adaptativa atual.'],
      'science-016': ['A aparência visual do gráfico, desde que a linha tenha inclinação consistente.', 'A presença de uma associação forte, independentemente de amostragem ou incerteza.', 'O número de observações sem saber como os dados foram selecionados e medidos.'],
      'science-018': ['A incerteza elevada demonstra que o efeito verdadeiro é exatamente zero.', 'Uma diferença média pequena é universalmente irrelevante, independentemente do contexto.', 'A amostra limitada comprova o efeito se a estimativa central estiver na direção esperada.'],
      'science-020': ['A transferência de energia por contato direto entre partículas sem movimento do fluido.', 'A emissão de ondas eletromagnéticas, sem exigir movimento coletivo do líquido ou do gás.', 'A transferência de energia associada à mudança de estado químico de um material.']
    },
    language: {
      'language-001': ['A biblioteca mantém o horário das 17h em todos os dias da semana.', 'A manutenção começou às 17h e provocou o fechamento antes do fim do expediente.', 'A biblioteca permanecerá fechada durante toda a semana por causa da manutenção.'],
      'language-003': ['A biblioteca é muito usada e a maioria dos alunos a considera indispensável para estudar.', 'A biblioteca é utilizada com frequência por muitos alunos durante a semana escolar.', 'A biblioteca foi reconhecida informalmente como um dos espaços mais importantes da escola.'],
      'language-004': ['Incluir a tese do autor e a opinião pessoal do leitor para explicar por que ela importa.', 'Reproduzir as frases do original com pequenas trocas, preservando toda a ordem e os exemplos.', 'Destacar uma conclusão forte e retirar ressalvas que pareçam reduzir o impacto do texto.'],
      'language-006': ['Ela pode levar leitores a executar ações diferentes por entenderem os mesmos termos de modos distintos.', 'Ela pode admitir mais de uma leitura, embora o contexto nem sempre elimine todas as interpretações.', 'Ela permite que o leitor escolha um sentido sem considerar as outras instruções do procedimento.'],
      'language-009': ['É uma afirmação colocada antes da tese que necessariamente não oferece apoio a ela.', 'É uma pergunta usada para introduzir um tópico, sem servir como razão para a conclusão.', 'É um exemplo que ilustra o tema, mas não funciona como apoio inferencial.'],
      'language-013': ['“Antes disso, faça aquilo e depois repita o processo da forma habitual, como explicado.”', '“A massa foi produzida durante o procedimento e verificada após sua finalização completa.”', '“Execute as etapas na ordem costumeira e finalize o procedimento quando estiver pronto.”'],
      'language-016': ['A maioria dos participantes deixou de enviar o formulário.', 'Nenhum participante chegou a enviar o formulário.', 'Exatamente um participante não enviou o formulário.'],
      'language-017': ['O pronome não possui antecedente possível e, por isso, torna a frase incompreensível.', 'A frase não informa o endereço da escola, então a ação não pode ter acontecido.', 'O verbo está no tempo errado para relatar um acontecimento passado.'],
      'language-007': ['A frase indica que o plano tem alta probabilidade de funcionar nas condições atuais.', 'A negação de impossibilidade equivale a afirmar que o plano já está sendo executado.', 'A frase demonstra que executar o plano será barato e exigirá pouco esforço.'],
      'language-008': ['O método produziu uma melhora comprovada e generalizável, apesar do tamanho da amostra.', 'Não é possível saber absolutamente nada porque não havia grupo de controle.', 'A amostra pequena afeta apenas a precisão, mas não pode afetar a interpretação causal.'],
      'language-010': ['Lia tem função de monitora no laboratório.', 'Lia recebeu uma autorização temporária.', 'A inscrição dela foi comprovada no texto.'],
      'language-011': ['O valor final basta, pois a palavra “dobrou” define sozinha a escala do fenômeno.', 'A taxa percentual substitui os valores absolutos e torna desnecessário informar o período.', 'O número de pessoas que compartilhou a notícia permite recuperar o valor inicial.'],
      'language-012': ['Comparar a conclusão com o título, considerando o título uma versão completa do texto.', 'Dar preferência à interpretação que usa termos categóricos, mesmo que a fonte seja cautelosa.', 'Ignorar ressalvas porque elas costumam ser detalhes secundários em textos argumentativos.'],
      'language-014': ['A quantidade de exemplos favoráveis basta para medir a força do argumento.', 'Contraexemplos devem ser ignorados se o autor escolheu casos observados diretamente.', 'A tese fica mais forte se os exemplos forem variados, mesmo que tenham sido selecionados de modo enviesado.'],
      'language-015': ['Verificar se o autor usa a palavra com o mesmo sentido em cada premissa e na conclusão.', 'Contar ocorrências da palavra para decidir qual significado é o mais importante.', 'Assumir que uma palavra mantém sempre um único sentido por aparecer em um argumento.'],
      'language-018': ['O fator certamente causou o resultado e a possibilidade expressa é apenas uma formalidade.', 'A associação foi descartada, pois a fonte não usou uma afirmação categórica.', 'Todos os casos apresentam o resultado, já que uma associação foi mencionada.'],
      'language-020': ['O risco absoluto dobrou, independentemente do seu valor inicial.', 'A frase exige conhecer o risco inicial e a população estudada.', 'O valor inicial e o período observado ajudariam a interpretar a mudança.']
    }
  };

  let applied = 0;
  for (const [moduleId, items] of Object.entries(distractors)) {
    const module = MF.getModule(moduleId);
    if (!module) continue;
    for (const [id, wrongOptions] of Object.entries(items)) {
      const question = module.questions.find(item => item.id === id);
      if (!question || question.type !== 'choice' || !Array.isArray(wrongOptions) || wrongOptions.length !== 3) continue;
      const correctIndex = question.answer;
      const correctOption = question.options[correctIndex];
      let cursor = 0;
      question.options = Array.from({ length: 4 }, (_, index) => index === correctIndex ? correctOption : wrongOptions[cursor++]);
      question.qualityReviewed = true;
      question.distractorNote = 'Distratores revisados editorialmente; a ordem de exibição é embaralhada por sessão.';
      applied++;
    }
  }
  // Segunda rodada editorial: aproxima alternativas de mesma família conceitual,
  // substitui distratores obviamente desconectados e equilibra enunciados pontuais.
  const extraDistractors = {
    bible: {
      'bible-001': ['Arão', 'Josué', 'Samuel'],
      'bible-002': ['Noemi era irmã de Rute.', 'Noemi era cunhada de Rute.', 'Noemi era filha de Rute.'],
      'bible-003': ['Esperam a multidão abrir caminho até Jesus.', 'Pedem que Jesus vá até a casa do homem.', 'Levam-no primeiro à piscina de Betesda.'],
      'bible-005': ['Um sacerdote que passava pelo caminho.', 'Um levita que se aproximou do homem.', 'Um viajante judeu que seguia pela estrada.'],
      'bible-012': ['Prediz que Pedro o negará antes que o galo cante.', 'Anuncia que Judas está prestes a traí-lo naquela noite.', 'Institui o pão e o cálice como sinais da nova aliança.'],
      'bible-015': ['A travessia do Jordão e a entrada em Canaã.', 'A conquista da cidade de Ai após uma emboscada.', 'A derrota de Israel diante dos filisteus.'],
      'bible-016': ['A aliança de Deus com Abraão e sua descendência.', 'A reconstrução do altar depois do dilúvio de Noé.', 'A migração dos patriarcas em direção ao Egito.'],
      'bible-018': ['Uma', 'Duas', 'Quatro']
    },
    science: {
      'science-001': ['Respiração celular', 'Quimiossíntese', 'Fermentação'],
      'science-002': ['80 °C', '90 °C', '110 °C'],
      'science-003': ['Gravitação', 'Aceleração', 'Ação e reação'],
      'science-004': ['Converter energia luminosa em energia química.', 'Traduzir o RNA mensageiro em proteína.', 'Catalisar a maioria das reações metabólicas celulares.'],
      'science-005': ['A translação da Terra ao redor do Sol.', 'A inclinação do eixo terrestre durante a órbita.', 'A revolução mensal da Lua ao redor da Terra.'],
      'science-007': ['É classificada como neutra.', 'É classificada como básica.', 'O pH informado não permite classificá-la.'],
      'science-010': ['Tempo', 'Velocidade', 'Energia'],
      'science-011': ['Ribossomo', 'Cloroplasto', 'Complexo de Golgi'],
      'science-019': ['Saturno', 'Netuno', 'Urano']
    },
    language: {
      'language-002': ['A chuva já havia começado quando Ana saiu.', 'Ana recebeu um alerta meteorológico antes de sair.', 'Ana cancelou o passeio para não se molhar.']
    }
  };
  const balancedCorrect = {
    bible: {
      'bible-002': 'Noemi era a sogra de Rute.',
      'bible-003': 'Eles retiram parte do teto e o descem até Jesus.',
      'bible-005': 'Um samaritano interrompe a viagem para cuidar dele.',
      'bible-012': 'Lava os pés dos discípulos como exemplo de serviço.',
      'bible-015': 'A queda das muralhas de Jericó.',
      'bible-016': 'A dispersão dos povos e a diversidade das línguas.'
    },
    science: {
      'science-004': 'Armazenar e transmitir a informação genética.',
      'science-005': 'A rotação da Terra em torno do próprio eixo.',
      'science-007': 'É classificada como ácida.'
    },
    language: {
      'language-002': 'Ana pode ter esperado chuva ao ver o céu escuro.'
    }
  };
  const revisedPrompts = {
    language: {
      'language-002': 'O céu escureceu, e Ana abriu o guarda-chuva antes de sair. Qual inferência é mais diretamente apoiada por essas pistas, embora não seja garantida?'
    }
  };
  for (const [moduleId, items] of Object.entries(extraDistractors)) {
    const module = MF.getModule(moduleId);
    if (!module) continue;
    for (const [id, wrongOptions] of Object.entries(items)) {
      const question = module.questions.find(item => item.id === id);
      if (!question || question.type !== 'choice' || !Array.isArray(wrongOptions) || wrongOptions.length !== 3) continue;
      const correctIndex = question.answer;
      const correctOption = (balancedCorrect[moduleId] && balancedCorrect[moduleId][id]) || question.options[correctIndex];
      let cursor = 0;
      question.options = Array.from({ length: 4 }, (_, index) => index === correctIndex ? correctOption : wrongOptions[cursor++]);
      if (revisedPrompts[moduleId] && revisedPrompts[moduleId][id]) question.prompt = revisedPrompts[moduleId][id];
      question.qualityReviewed = true;
      question.distractorNote = 'Distratores revisados editorialmente; a ordem de exibição é embaralhada por sessão.';
      applied++;
    }
  }
  MF.qualityOverridesApplied = applied;
})(window);
