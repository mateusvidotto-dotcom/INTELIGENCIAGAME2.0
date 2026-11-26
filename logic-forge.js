(function (global) {
  'use strict';

  const STORAGE_KEY = 'mfo:logic-forge:v1';
  const SCHEMA_VERSION = 1;
  const levels = [
    { id: 0, name: 'Pensamento computacional', subtitle: 'Sem computador e sem experiência prévia', promise: 'Transformar situações do cotidiano em instruções claras e testáveis.' },
    { id: 1, name: 'Fundamentos de algoritmos', subtitle: 'Lógica, variáveis, decisões e repetições', promise: 'Descrever e testar algoritmos antes de escolher uma linguagem.' },
    { id: 2, name: 'Python e JavaScript', subtitle: 'Primeiras linguagens reais', promise: 'Ler, escrever, testar e corrigir programas pequenos.' },
    { id: 3, name: 'Estruturas e algoritmos', subtitle: 'Eficiência e resolução de problemas', promise: 'Escolher estruturas e estratégias adequadas ao problema.' },
    { id: 4, name: 'Engenharia de software', subtitle: 'Qualidade, dados, web e segurança', promise: 'Construir software organizado, testável e mais seguro.' },
    { id: 5, name: 'Desafios avançados', subtitle: 'Grafos, otimização e inteligência de jogos', promise: 'Combinar matemática discreta, algoritmos e análise de complexidade.' }
  ];

  function exercise(id, kind, prompt, options, answer, concept, steps, why, hints, trap, takeaway) {
    const safeHints = Array.isArray(hints) ? hints.slice(0, 3) : [];
    if (safeHints.length === 0) safeHints.push('Releia o conceito e identifique os dados relevantes.');
    if (safeHints.length === 1) safeHints.push('Teste a ideia em uma etapa menor antes de escolher a resposta.');
    return {
      id: id, kind: kind, prompt: prompt, options: options || [], answer: answer,
      concept: concept, explanation: concept, steps: steps || [], why: why || [],
      hints: safeHints, trap: trap || 'Responder rapidamente sem conferir as condições do problema.',
      takeaway: takeaway || 'Registre o raciocínio e teste a regra em outro exemplo.'
    };
  }

  const lessons = [
    {
      id:'l0-algorithms',level:0,title:'Algoritmos: instruções que não deixam dúvidas',
      objective:'Descrever uma tarefa em uma sequência finita, ordenada e verificável.',
      concept:'Um algoritmo é um conjunto finito de instruções para alcançar um resultado. Uma boa instrução é precisa: não basta dizer “prepare tudo”; é preciso dizer o que fazer, em que ordem e como reconhecer que terminou. O computador executa instruções, não adivinha intenções.',
      examples:['Objetivo: preparar uma muda.','1. Separe o recipiente. 2. Coloque substrato. 3. Faça um pequeno espaço. 4. Posicione a semente. 5. Cubra e umedeça.','Teste: outra pessoa consegue repetir o procedimento sem precisar adivinhar etapas?'],
      code:'INÍCIO\\n  separar recipiente\\n  colocar substrato\\n  posicionar semente\\n  cobrir com substrato\\n  umedecer\\nFIM',
      project:'Escreva um algoritmo para organizar sua mochila. Use entre 6 e 10 passos, verbos claros e uma condição que permita verificar se a tarefa terminou.',
      questions:[
        exercise('l0-algorithms-q1','choice','Qual característica torna uma instrução mais adequada para um algoritmo?',['“Faça isso do jeito certo.”','“Coloque três livros na mochila e confira a lista.”','“Organize tudo como preferir.”','“Continue até parecer suficiente.”'],1,'A instrução precisa ser observável e testável.',['“Coloque três livros” define uma ação e uma quantidade.','“Confira a lista” fornece uma forma de verificar o resultado.'],['A é vaga.','B é precisa e verificável.','C deixa a regra em aberto.','D não define um critério de parada.'],['Procure uma ação que outra pessoa consiga executar do mesmo modo.','Pergunte se existe um critério para conferir o resultado.'],'Confundir uma intenção geral com uma instrução executável.','Prefira verbos concretos, ordem explícita e critérios de conclusão.'),
        exercise('l0-algorithms-q2','choice','Um robô precisa colocar uma folha em uma pasta. Qual sequência respeita a dependência entre as ações?',['Fechar a pasta → abrir a pasta → inserir a folha.','Inserir a folha → procurar a pasta → abrir a pasta.','Localizar a pasta → abrir a pasta → inserir a folha → fechar a pasta.','Fechar a pasta → inserir a folha → localizar a pasta.'],2,'A ordem das etapas faz parte da lógica do algoritmo.',['Primeiro é necessário localizar o objeto.','Depois abrir a pasta para criar acesso.','Só então inserir a folha e fechar.'],['A fecha antes de abrir.','B tenta inserir antes de localizar e abrir.','C respeita as dependências.','D executa ações impossíveis na ordem apresentada.'],['Identifique qual ação precisa acontecer antes da outra.'],'Ignorar pré-condições de uma ação.','Antes de ordenar passos, descubra o que cada passo exige.')
      ]
    },
    {
      id:'l0-decomposition',level:0,title:'Decomposição, padrões e abstração',
      objective:'Dividir problemas grandes em partes menores e manter apenas os detalhes relevantes.',
      concept:'Decompor é quebrar uma tarefa complexa em subtarefas. Reconhecer padrões é perceber partes que se repetem. Abstrair é representar o que importa sem carregar todos os detalhes. Essas três ideias reduzem a complexidade antes de escrever código.',
      examples:['Problema: organizar uma feira escolar.','Decomposição: definir produtos, estimar quantidades, montar preços, divulgar e registrar vendas.','Abstração: para calcular o total, talvez bastem quantidade e preço unitário; a cor da embalagem pode ser irrelevante.'],
      code:'PROBLEMA: calcular o total de uma compra\\nENTRADAS: itens e preços\\nPROCESSO: somar quantidade × preço\\nSAÍDA: valor total',
      project:'Escolha um problema do cotidiano e crie uma árvore com o problema principal e pelo menos quatro subtarefas.',
      questions:[
        exercise('l0-decomposition-q1','choice','Para calcular o custo de 12 mudas a R$ 2,50 cada, qual detalhe pode ser abstraído sem afetar o cálculo?',['A quantidade de mudas.','O preço de cada muda.','A cor da etiqueta usada nas bandejas.','A operação de multiplicação.'],2,'Abstração conserva os dados relevantes para o objetivo.',['O custo depende de quantidade e preço unitário.','A cor da etiqueta não altera o produto matemático.'],['A é essencial.','B é essencial.','C pode ser ignorada neste cálculo.','D é a operação necessária.'],['Pergunte quais dados alteram diretamente o valor final.'],'Retirar dados necessários ou preservar detalhes irrelevantes.','A abstração depende da pergunta que se deseja responder.'),
        exercise('l0-decomposition-q2','choice','Um projeto de aplicativo inclui cadastro, pesquisa e relatório. Qual é o melhor primeiro passo de decomposição?',['Programar tudo em um único bloco.','Separar o projeto em funções menores e definir a responsabilidade de cada uma.','Escolher cores e animações antes de entender as tarefas.','Duplicar o mesmo código para cada tela.'],1,'Subtarefas com responsabilidades claras podem ser planejadas e testadas separadamente.',['Identifique os resultados que o aplicativo precisa produzir.','Agrupe ações relacionadas em componentes menores.','Defina entradas e saídas de cada parte.'],['A dificulta manutenção.','B reduz acoplamento e facilita testes.','C prioriza aparência antes do problema.','D cria duplicação.'],['Pense em partes que possam ser entendidas e verificadas isoladamente.'],'Confundir divisão em arquivos com decomposição lógica.','Cada parte deve ter uma responsabilidade compreensível.')
      ]
    },
    {
      id:'l0-logic',level:0,title:'Verdadeiro, falso, E, OU e NÃO',
      objective:'Combinar condições simples e interpretar tabelas-verdade.',
      concept:'Uma condição booleana assume verdadeiro ou falso. E só é verdadeiro quando as duas condições são verdadeiras. OU inclusivo é verdadeiro quando ao menos uma é verdadeira. NÃO inverte o valor. Essas operações aparecem em filtros, decisões e validações.',
      examples:['E: a pessoa tem cadastro E informou a senha correta.','OU: o pedido pode ser retirado OU entregue.','NÃO: NÃO está chovendo.','OU inclusivo permite que as duas condições sejam verdadeiras ao mesmo tempo.'],
      code:'cadastro = verdadeiro\\nsenha_correta = falso\\nacesso = cadastro E senha_correta\\n# acesso = falso',
      project:'Crie cinco regras para um jogo de tabuleiro usando E, OU e NÃO. Escreva um exemplo verdadeiro e um falso para cada regra.',
      questions:[
        exercise('l0-logic-q1','choice','A regra de acesso é: cadastro válido E senha correta. O cadastro é válido, mas a senha está incorreta. O acesso será…',['Verdadeiro, porque uma condição basta.','Falso, porque E exige as duas condições.','Verdadeiro, porque cadastro tem prioridade.','Indeterminado.'],1,'A conjunção exige que ambas as condições sejam verdadeiras.',['Cadastro válido = verdadeiro.','Senha correta = falso.','Verdadeiro E falso resulta em falso.'],['A descreve OU.','B aplica corretamente E.','C inventa uma prioridade.','D a tabela-verdade determina o resultado.'],['Lembre-se: E é exigente; as duas partes precisam passar.'],'Trocar o significado de E pelo de OU.','Traduza cada condição para verdadeiro ou falso antes de combinar.'),
        exercise('l0-logic-q2','choice','Em lógica booleana inclusiva, a expressão A OU B é falsa em qual situação?',['A é verdadeira e B é falsa.','A é falsa e B é verdadeira.','A e B são verdadeiras.','A e B são falsas.'],3,'OU inclusivo só é falso quando nenhuma alternativa é verdadeira.',['Se uma das condições for verdadeira, OU já é verdadeiro.','A única combinação sem condição verdadeira é falso OU falso.'],['A produz verdadeiro.','B produz verdadeiro.','C produz verdadeiro.','D produz falso.'],['Teste se existe pelo menos uma condição verdadeira.'],'Interpretar OU como “exatamente uma das duas”.','Em OU inclusivo, verdadeiro OU verdadeiro continua sendo verdadeiro.')
      ]
    },
    {
      id:'l1-variables',level:1,title:'Entrada, processamento, saída e variáveis',
      objective:'Modelar dados com variáveis, tipos e operadores.',
      concept:'Um programa recebe entradas, transforma dados e produz saídas. Variável é um nome associado a um valor. Tipos ajudam a definir quais operações fazem sentido: números, textos e valores booleanos não são intercambiáveis sem conversão.',
      examples:['Entrada: quantidade = 4 e preço = 7.5.','Processamento: total = quantidade × preço.','Saída: total = 30.0.','Um texto como “4” não é automaticamente o número 4 em todas as operações.'],
      code:'quantidade = 4\\npreco = 7.5\\ntotal = quantidade * preco\\nprint(total)  # 30.0',
      project:'Desenhe entrada, processamento e saída de uma calculadora de custo de ração por animal.',
      questions:[
        exercise('l1-variables-q1','number','Uma compra tem 6 unidades a R$ 3,50 cada. Qual valor será armazenado em total = quantidade × preço? Informe o valor em reais.',[],21,'Multiplicação de quantidade pelo preço unitário.',['Substitua quantidade por 6.','Substitua preço por 3,50.','Calcule 6 × 3,50 = 21,00.'],[],['Multiplique, não some a quantidade ao preço.','A unidade do resultado é real.'],'Esquecer a unidade ou trocar a operação.','Associe cada variável a um significado e confira a unidade do resultado.'),
        exercise('l1-variables-q2','choice','Qual nome descreve melhor uma variável que guarda a idade de uma pessoa?',['x1','resultado_final_da_soma','idade','coisa'],2,'Nomes descritivos reduzem erros de leitura e manutenção.',['O nome deve comunicar o significado do valor.','idade é claro, curto e específico.'],['Pode ser válido, mas pouco informativo.','Descreve outro contexto.','Representa diretamente o dado.','É vago.'],['Leia o nome sem olhar o restante do código.'],'Escolher nomes curtos demais ou sem significado.','Prefira nomes que expliquem a intenção do dado.')
      ]
    },
    {
      id:'l1-conditionals',level:1,title:'Decisões: SE, SENÃO e condições compostas',
      objective:'Construir decisões com condições mutuamente claras.',
      concept:'Uma estrutura condicional escolhe qual bloco executar conforme uma expressão booleana. A ordem dos testes importa quando as condições se sobrepõem. Cobrir todos os casos evita saídas não previstas.',
      examples:['Se nota ≥ 7: aprovado. Senão: precisa de recuperação.','Se idade ≥ 18 E documento válido: permitir entrada.','Condição de fronteira: teste também exatamente 7, não apenas 6 e 8.'],
      code:'nota = 7\\nif nota >= 7:\\n    situacao = \"aprovado\"\\nelse:\\n    situacao = \"recuperacao\"',
      project:'Modele uma decisão de classificação de estoque: baixo, adequado e alto. Defina limites inclusivos e teste os valores de fronteira.',
      questions:[
        exercise('l1-conditionals-q1','choice','Uma regra diz: se temperatura for menor que 10, ligar o aquecedor; caso contrário, desligar. O que acontece a 10 graus?',['Liga, pois 10 é menor que 10.','Desliga, pois a condição é falsa.','As duas ações acontecem.','Não existe resultado.'],1,'A comparação estrita < não inclui o valor 10.',['Compare 10 < 10.','A expressão é falsa.','O bloco SENÃO é executado.'],['A igualdade não satisfaz <.','B segue a estrutura.','A estrutura escolhe apenas um ramo.','SENÃO cobre o caso.'],['Substitua o valor-limite na condição literalmente.'],'Ler < como ≤ ou > como ≥.','Teste valores imediatamente abaixo, no limite e acima dele.'),
        exercise('l1-conditionals-q2','choice','Para conceder desconto, uma loja exige compra acima de R$ 100 OU cupom válido. A compra é R$ 80 e o cupom é válido. O desconto é concedido?',['Sim, porque uma condição do OU é verdadeira.','Não, porque as duas condições precisam ser verdadeiras.','Não é possível decidir.','Sim, mas somente se a compra for exatamente R$ 100.'],0,'O OU inclusivo exige pelo menos uma condição verdadeira.',['Compra acima de 100 = falso.','Cupom válido = verdadeiro.','Falso OU verdadeiro = verdadeiro.'],['A é o resultado.','B descreve E.','C há informação suficiente.','D inventa outra regra.'],['Avalie cada parte separadamente.'],'Substituir OU por E.','Condições compostas ficam mais fáceis quando divididas em partes.')
      ]
    },
    {
      id:'l1-loops',level:1,title:'Repetição: PARA, ENQUANTO e acumuladores',
      objective:'Usar laços, contadores e acumuladores com condição de parada.',
      concept:'Laços repetem um bloco. PARA é útil quando a quantidade de repetições é conhecida. ENQUANTO repete enquanto uma condição permanece verdadeira. Um contador acompanha quantas vezes algo ocorreu; um acumulador reúne valores. Atualizar a variável de controle evita laços infinitos.',
      examples:['Somar os números de 1 a 4: 1 + 2 + 3 + 4 = 10.','Contador começa em zero e aumenta uma unidade por item.','Um laço deve ter condição de parada alcançável.'],
      code:'total = 0\\nfor numero in [1, 2, 3, 4]:\\n    total = total + numero\\nprint(total)  # 10',
      project:'Faça o teste de mesa de um laço que conte quantos números de uma lista são pares. Registre o contador após cada repetição.',
      questions:[
        exercise('l1-loops-q1','number','Um acumulador começa em zero e soma 2, depois 3 e depois 5. Qual é o valor final?',[],10,'O acumulador preserva a soma parcial ao longo das iterações.',['Estado inicial: 0.','Após a primeira iteração: 0 + 2 = 2.','Depois: 2 + 3 = 5; por fim: 5 + 5 = 10.'],[],['Monte uma linha por repetição.','Some cada novo valor ao resultado anterior.'],'Somar apenas o último valor ou reiniciar o acumulador.','Em teste de mesa, registre o estado depois de cada iteração.'),
        exercise('l1-loops-q2','choice','Qual alteração evita que um laço ENQUANTO contador < 5 se repita para sempre, supondo contador inicial igual a zero?',['Remover a condição.','Não alterar contador dentro do laço.','Incrementar contador a cada repetição.','Substituir contador por um texto.'],2,'A variável de controle precisa caminhar para a condição de parada.',['Enquanto contador for menor que 5, o bloco repete.','Somar 1 ao contador aproxima o estado de 5.','Quando contador chega a 5, a condição fica falsa.'],['Não garante parada.','Mantém a condição verdadeira.','Permite alcançar a parada.','Não é operação adequada.'],['Pergunte o que faz a condição mudar.'],'Pensar que o laço termina apenas porque foi executado muitas vezes.','Todo laço precisa de uma condição de parada e de uma forma de alcançá-la.')
      ]
    },
    {
      id:'l2-functions',level:2,title:'Funções: parâmetros, retorno e responsabilidade',
      objective:'Dividir programas em funções reutilizáveis e testáveis.',
      concept:'Função agrupa uma tarefa com nome. Parâmetros são dados recebidos; retorno é o valor produzido. Uma função previsível deve ter uma responsabilidade clara. Retornar um valor não é o mesmo que apenas exibi-lo na tela.',
      examples:['calcular_total(3, 5) recebe quantidade e preço.','return quantidade * preco entrega o resultado ao chamador.','print mostra algo; return devolve um valor para ser usado.'],
      code:'def calcular_total(quantidade, preco):\\n    return quantidade * preco\\n\\nvalor = calcular_total(3, 5)',
      project:'Crie um desenho de programa com funções calcular_media, classificar_media e exibir_resultado. Indique os parâmetros e o retorno de cada uma.',
      questions:[
        exercise('l2-functions-q1','choice','Qual é a principal diferença entre return 12 e print(12) dentro de uma função?',['Ambos sempre encerram a função e devolvem 12.','return devolve um valor ao chamador; print exibe texto na saída.','print devolve o valor e return apenas mostra na tela.','Não existe diferença.'],1,'Retorno e exibição são responsabilidades distintas.',['return entrega o resultado para outra parte do programa.','print produz uma saída visual, mas não substitui o retorno.'],['Não são equivalentes.','B distingue as funções.','Inverte os papéis.','Há diferença semântica.'],['Pense em quem recebe o valor para continuar calculando.'],'Confundir saída visual com valor de retorno.','Use return para compor cálculos; use print quando a intenção for exibir.'),
        exercise('l2-functions-q2','choice','Uma função calcular_area recebe base e altura de um retângulo. Qual implementação expressa melhor essa responsabilidade?',['calcular_area(base, altura) retorna base × altura.','calcular_area() pergunta nome, idade e endereço.','calcular_area(base) altera todas as variáveis globais.','calcular_area() imprime uma frase sem calcular nada.'],0,'Parâmetros devem fornecer os dados necessários e a função deve retornar o resultado esperado.',['A área usa base e altura.','A multiplicação representa a regra.','Retornar permite reutilizar a área.'],['A corresponde à responsabilidade.','B mistura tarefas sem relação.','C cria dependências ocultas.','D não executa o cálculo.'],['Compare parâmetros e resultado com o objetivo da função.'],'Colocar muitas responsabilidades em uma única função.','Uma função deve fazer uma tarefa que possa ser nomeada claramente.')
      ]
    },
    {
      id:'l2-python-data',level:2,title:'Python: coleções e leitura de dados',
      objective:'Escolher listas, dicionários e conjuntos conforme o tipo de consulta.',
      concept:'Lista preserva ordem e permite elementos repetidos. Dicionário associa chaves a valores. Conjunto guarda elementos únicos e é útil para verificar presença e remover duplicatas. A estrutura escolhida muda a clareza e o custo das operações.',
      examples:['notas = [7, 8, 8, 9] preserva ordem e repetição.','aluno = {\"nome\": \"Ana\", \"media\": 8.0} associa campos.','unicos = set(notas) remove valores repetidos.'],
      code:'notas = [7, 8, 8, 9]\\nmedia = sum(notas) / len(notas)\\ncampos = {\"media\": media, \"aprovado\": media >= 7}',
      project:'Modele um pequeno cadastro de produtos usando uma lista de dicionários. Cada produto deve ter nome, preço e quantidade.',
      questions:[
        exercise('l2-python-data-q1','choice','Você precisa guardar uma lista de notas na ordem em que foram lançadas, inclusive valores repetidos. Qual estrutura é mais adequada?',['set','list','dict sem chaves','boolean'],1,'A lista preserva ordem e repetições.',['O requisito menciona ordem.','Também menciona repetição.','List atende aos dois requisitos.'],['Conjunto não preserva o objetivo de sequência com repetição.','Lista é a estrutura direta.','Dicionário precisa de chaves.','Boolean guarda um valor lógico.'],['Identifique se precisa de ordem, chave ou unicidade.'],'Escolher uma estrutura apenas por familiaridade.','Escolha estrutura de dados a partir das operações necessárias.'),
        exercise('l2-python-data-q2','choice','Um cadastro associa o código de um produto ao preço atual. Qual estrutura expressa melhor essa associação?',['Uma lista sem qualquer identificação.','Um dicionário com código como chave e preço como valor.','Um conjunto de preços sem código.','Uma variável booleana.'],1,'Dicionários representam associações chave-valor.',['O código identifica o registro.','O preço é o valor associado àquela chave.'],['A dificulta localizar por código.','B representa a relação.','C perde a associação.','D não comporta o cadastro.'],['Pense em como consultar o preço usando o código.'],'Armazenar valores sem preservar a relação entre eles.','Quando existe uma chave que identifica um valor, considere um dicionário.')
      ]
    },
    {
      id:'l2-errors',level:2,title:'Erros, exceções e testes pequenos',
      objective:'Separar erro de sintaxe, erro durante a execução e resultado incorreto.',
      concept:'Erro de sintaxe impede o programa de ser interpretado corretamente. Exceção ocorre durante a execução, por exemplo, ao dividir por zero. Erro lógico permite que o código execute, mas produza resultado errado. Testes com casos comuns, limites e entradas inválidas revelam problemas.',
      examples:['Sintaxe: parêntese não fechado.','Execução: tentar dividir um número por zero.','Lógica: calcular média dividindo pela quantidade errada.','Teste de fronteira: lista vazia, um item, valor mínimo e máximo.'],
      code:'def dividir(a, b):\\n    if b == 0:\\n        raise ValueError(\"divisor não pode ser zero\")\\n    return a / b',
      project:'Crie três casos de teste para uma função de média: lista normal, lista com um item e lista vazia. Defina como ela deve se comportar em cada caso.',
      questions:[
        exercise('l2-errors-q1','choice','O programa executa sem falhar, mas calcula a média usando a soma dividida por n - 1. Que tipo de problema é esse?',['Erro de sintaxe.','Erro lógico.','Falha de conexão de rede.','Erro de compilação obrigatório.'],1,'O programa roda, mas a fórmula não corresponde ao objetivo.',['A execução acontece.','O resultado está incorreto por causa da regra implementada.'],['Sintaxe impediria a execução normal.','B descreve resultado errado.','Não há evidência de rede.','Python interpreta o código em tempo de execução.'],['Pergunte se o programa executa e se o resultado está certo.'],'Chamar todo defeito de erro de sintaxe.','Classifique o defeito antes de escolher como depurar.'),
        exercise('l2-errors-q2','choice','Qual conjunto de testes oferece melhor cobertura inicial para uma função que calcula o maior valor de uma lista não vazia?',['Apenas uma lista com 100 números positivos.','Lista com um elemento, vários elementos, negativos e valores repetidos.','Somente listas vazias, embora a função exija ao menos um item.','Executar a mesma entrada dez vezes.'],1,'Casos variados verificam diferentes condições e limites.',['Um elemento testa o caso mínimo válido.','Negativos verificam suposições sobre sinal.','Repetidos e múltiplos itens verificam comparação.'],['Cobertura limitada.','B examina situações distintas.','Testa entrada fora do contrato sem definir comportamento.','Repetição idêntica não amplia cobertura.'],['Inclua casos mínimos, comuns e extremos permitidos.'],'Confundir muitas execuções iguais com boa cobertura.','Escolha testes por comportamento e fronteiras, não por quantidade.')
      ]
    },
    {
      id:'l3-complexity',level:3,title:'Complexidade: pensar no crescimento',
      objective:'Interpretar Big O e comparar o crescimento do trabalho.',
      concept:'Big O descreve como o custo cresce com o tamanho n da entrada, ignorando constantes e termos menores em uma análise assintótica. O(1) é constante; O(log n) cresce lentamente; O(n) cresce proporcionalmente; O(n²) pode crescer muito mais rápido. É uma ferramenta de comparação, não um cronômetro exato.',
      examples:['Percorrer uma lista uma vez: O(n).','Dois laços completos aninhados: frequentemente O(n²).','Busca binária em coleção ordenada: O(log n).','A eficiência real também depende de memória, dados, implementação e hardware.'],
      code:'for item in itens:       # n iterações\\n    processar(item)\\n\\n# Crescimento linear: O(n)',
      project:'Compare uma busca que percorre todos os elementos com uma busca binária em dados ordenados. Explique as hipóteses de cada uma.',
      questions:[
        exercise('l3-complexity-q1','choice','Um algoritmo percorre cada um dos n elementos exatamente uma vez e faz trabalho constante por elemento. Qual é sua ordem de crescimento?',['O(1)','O(log n)','O(n)','O(n²)'],2,'O custo acompanha linearmente a quantidade de elementos.',['Há n iterações.','Cada iteração custa O(1).','O total é n × O(1), portanto O(n).'],['Constante não cresce com n.','Logarítmico corresponde a reduzir o problema por fator.','C é linear.','Não há dois laços completos.'],['Conte quantas vezes o corpo pode executar.'],'Confundir número de linhas de código com número de operações.','Analise o crescimento em relação ao tamanho da entrada.'),
        exercise('l3-complexity-q2','choice','Uma busca binária exige que os dados estejam…',['ordenados segundo a regra de comparação.','criptografados.','todos repetidos.','armazenados apenas em uma árvore.'],0,'A cada etapa, a busca binária descarta uma metade usando a ordem.',['Compare o elemento do meio com o alvo.','A ordem permite saber qual metade ainda pode conter o alvo.'],['A é requisito central.','Criptografia não é requisito.','Repetição não é necessária.','Uma lista ordenada também pode ser usada.'],['Pergunte como decidir qual metade descartar.'],'Aplicar busca binária a dados sem ordem compatível.','A complexidade O(log n) depende das condições do algoritmo.')
      ]
    },
    {
      id:'l3-search-sort',level:3,title:'Busca, ordenação e invariantes',
      objective:'Entender busca linear, busca binária e a ideia de preservar propriedades.',
      concept:'Busca linear verifica itens em sequência e funciona mesmo sem ordenação. Busca binária divide o intervalo e precisa de dados ordenados. Algoritmos de ordenação reorganizam elementos; estabilidade preserva a ordem relativa de elementos com chaves iguais. Um invariante é uma propriedade que permanece verdadeira em cada etapa.',
      examples:['Busca linear: examina até n elementos.','Busca binária: reduz o intervalo aproximadamente pela metade.','Ordenação por inserção mantém a parte já percorrida ordenada.'],
      code:'# Ideia da busca binária em uma lista ordenada\\nmeio = (inicio + fim) // 2\\nif dados[meio] == alvo:\\n    encontrado = True',
      project:'Desenhe a execução da busca binária pelo número 23 em [3, 8, 12, 17, 23, 29, 31]. Registre os limites após cada comparação.',
      questions:[
        exercise('l3-search-sort-q1','choice','Você precisa localizar um valor em uma lista pequena que não está ordenada. Qual escolha é correta sem fazer uma ordenação prévia?',['Busca binária diretamente.','Busca linear.','Dijkstra.','Ordenação topológica.'],1,'Busca linear não depende de ordenação.',['A lista não possui ordem garantida.','A busca linear compara cada item até encontrar ou terminar.'],['Busca binária perde sua garantia sem ordem.','B funciona.','Dijkstra trata caminhos em grafos com pesos não negativos.','Ordenação topológica exige grafo direcionado acíclico.'],['Considere quais pré-requisitos o algoritmo exige.'],'Escolher o algoritmo de melhor complexidade sem checar suas hipóteses.','Um algoritmo correto depende de dados que satisfaçam seus pré-requisitos.'),
        exercise('l3-search-sort-q2','choice','Em uma ordenação estável, o que acontece com dois registros que possuem a mesma chave de ordenação?',['A ordem relativa original entre eles é preservada.','Um deles é sempre removido.','Os dois são convertidos em números.','A lista deixa de ser ordenada.'],0,'Estabilidade preserva a ordem relativa de elementos equivalentes segundo a chave.',['Compare os registros com a mesma chave.','A estabilidade mantém sua ordem anterior.'],['A é a definição.','Remoção não faz parte da estabilidade.','A conversão não é necessária.','A ordenação continua ordenada.'],['Pense no que ocorre com registros empatados.'],'Confundir estabilidade com velocidade.','Estabilidade é uma propriedade do comportamento da ordenação.')
      ]
    },
    {
      id:'l3-recursion',level:3,title:'Recursão, pilha e backtracking',
      objective:'Reconhecer caso-base, chamada recursiva e exploração de possibilidades.',
      concept:'Uma função recursiva chama a si própria com um problema menor. É indispensável ter um caso-base alcançável. Cada chamada usa a pilha de execução. Backtracking constrói uma solução passo a passo e desfaz escolhas quando uma condição não pode ser satisfeita.',
      examples:['Fatorial: n! = n × (n−1)! e 0! = 1.','Caso-base encerra a recursão.','Labirinto: avançar, marcar caminho; se bloquear, desfazer a escolha.'],
      code:'def fatorial(n):\\n    if n <= 1:\\n        return 1\\n    return n * fatorial(n - 1)',
      project:'Desenhe a árvore de chamadas de fatorial(4). Depois, explique o que aconteceria se o caso-base fosse removido.',
      questions:[
        exercise('l3-recursion-q1','number','Usando fatorial(n) = n × fatorial(n − 1) e fatorial(1) = 1, qual é o valor de fatorial(4)?',[],24,'Cada chamada multiplica o número atual pelo resultado do próximo caso menor.',['4 × fatorial(3).','3 × fatorial(2).','2 × fatorial(1).','4 × 3 × 2 × 1 = 24.'],[],['Resolva a partir do caso-base.','Expanda as chamadas até chegar a 1.'],'Parar antes de multiplicar todos os fatores.','Em recursão, acompanhe a descida e o retorno das chamadas.'),
        exercise('l3-recursion-q2','choice','Uma função recursiva não possui caso-base alcançável. Qual risco principal existe?',['A função sempre fica O(1).','As chamadas continuam até ocorrer estouro da pilha ou outro limite.','A recursão vira automaticamente um laço PARA.','O programa passa a ordenar os dados.'],1,'Sem condição de parada, a cadeia de chamadas não termina normalmente.',['Cada chamada cria outra chamada.','Sem base alcançável, nenhuma encerra a cadeia.'],['Não há motivo para custo constante.','B descreve o risco.','Não existe conversão automática.','Recursão não implica ordenação.'],['Pergunte em qual estado a função para de chamar a si mesma.'],'Tratar a recursão como mágica sem verificar o caso-base.','Toda recursão precisa reduzir o problema e alcançar uma condição de parada.')
      ]
    },
    {
      id:'l3-structures',level:3,title:'Pilhas, filas, árvores e grafos',
      objective:'Relacionar uma estrutura de dados às operações exigidas.',
      concept:'Pilha segue LIFO: o último a entrar é o primeiro a sair. Fila segue FIFO: o primeiro a entrar é o primeiro a sair. Árvores organizam relações hierárquicas; grafos representam conexões gerais entre vértices. A estrutura deve refletir o tipo de relação que o problema descreve.',
      examples:['Pilha: desfazer ações ou controlar chamadas.','Fila: atender pedidos na ordem de chegada.','Grafo: representar cidades ligadas por estradas.'],
      code:'# Fila conceitual\\nentrada: A, depois B, depois C\\nsaida: A, depois B, depois C',
      project:'Modele uma rede de cinco cidades. Liste as ligações e desenhe o grafo com vértices e arestas.',
      questions:[
        exercise('l3-structures-q1','choice','Um sistema deve processar solicitações na mesma ordem em que chegaram. Qual estrutura representa esse comportamento?',['Pilha LIFO.','Fila FIFO.','Árvore binária de busca necessariamente.','Conjunto sem ordem.'],1,'FIFO preserva a ordem de chegada.',['Primeiro a chegar deve sair primeiro.','Esse comportamento é First In, First Out.'],['LIFO inverte a ordem.','B corresponde a FIFO.','Árvore de busca não expressa essa regra por si só.','Conjunto não é estrutura de atendimento ordenado.'],['Associe “primeiro a entrar” a “primeiro a sair”.'],'Confundir pilha com fila.','Descreva a regra de remoção antes de escolher a estrutura.'),
        exercise('l3-structures-q2','choice','Para representar estradas que ligam cidades, inclusive com várias rotas possíveis, a estrutura mais natural é…',['um grafo.','uma única variável booleana.','uma pilha de números sem relações.','uma string com uma cidade.'],0,'Grafo representa entidades e conexões entre elas.',['Cada cidade pode ser um vértice.','Cada estrada pode ser uma aresta.','Várias rotas são caminhos no grafo.'],['A representa conexões.','B não representa rede.','C não expressa as ligações.','D não comporta relações.'],['Identifique as entidades e as conexões entre elas.'],'Tentar representar relações complexas em uma lista sem estrutura.','Grafos são adequados quando o problema é sobre conexões e caminhos.')
      ]
    },
    {
      id:'l4-engineering',level:4,title:'Engenharia: legibilidade, módulos e refatoração',
      objective:'Organizar código para que outras pessoas consigam compreender e alterar com segurança.',
      concept:'Código é lido e mantido muitas vezes. Nomes explícitos, funções pequenas, responsabilidades coesas, baixa duplicação e interfaces claras reduzem custo de mudança. Refatorar é alterar a estrutura interna sem mudar o comportamento observável.',
      examples:['Prefira calcular_imposto(valor) a f2(x).','Extraia lógica repetida em uma função com nome.','Não aplique abstrações complexas antes de existir uma necessidade real.'],
      code:'def calcular_total(precos):\\n    return sum(precos)\\n\\ndef aplicar_desconto(total, taxa):\\n    return total * (1 - taxa)',
      project:'Escolha um código longo e planeje uma refatoração em três funções. Defina como provar que o resultado continua igual.',
      questions:[
        exercise('l4-engineering-q1','choice','Duas partes do programa repetem a mesma regra de cálculo. Qual melhoria tende a reduzir inconsistência?',['Copiar a regra para mais cinco arquivos.','Criar uma função responsável pelo cálculo e reutilizá-la.','Esconder a regra em uma variável global sem nome.','Remover todos os testes.'],1,'Uma implementação única da regra facilita manutenção e correções.',['Localize a regra repetida.','Extraia uma função com responsabilidade clara.','Substitua as cópias por chamadas à função.'],['Amplia duplicação.','B reduz divergência.','Cria dependência obscura.','Remove proteção contra regressões.'],['Pense em como corrigir a regra em um único lugar.'],'Confundir reutilização com criar abstrações desnecessárias.','Extraia comportamento repetido quando isso melhora clareza e manutenção.'),
        exercise('l4-engineering-q2','choice','Qual afirmação descreve uma refatoração adequada?',['Mudar estrutura interna mantendo o comportamento observável.','Adicionar funcionalidades sem testar.','Alterar respostas e chamar isso de refatoração.','Remover validações para reduzir linhas.'],0,'Refatoração busca melhorar estrutura sem alterar o contrato externo.',['Defina o comportamento esperado.','Melhore a organização interna.','Execute testes para detectar mudanças acidentais.'],['A corresponde à prática.','Adicionar função altera escopo.','Muda o comportamento.','Pode enfraquecer a segurança.'],['Separe “como o código está organizado” de “o que ele faz”.'],'Tratar toda mudança de código como refatoração.','Teste o comportamento antes e depois de refatorar.')
      ]
    },
    {
      id:'l4-testing-git',level:4,title:'Testes, Git e trabalho em equipe',
      objective:'Registrar mudanças, revisar código e verificar comportamento com testes.',
      concept:'Teste unitário verifica uma unidade pequena. Teste de integração verifica componentes em conjunto. Git registra versões e permite trabalhar em branches. Pull request facilita revisão antes de integrar mudanças. Testes não provam ausência de todos os defeitos, mas detectam regressões e formalizam expectativas.',
      examples:['Teste: para entrada 2 e 3, a função soma deve retornar 5.','Branch: espaço isolado para uma mudança.','Pull request: proposta revisável para integrar a branch.'],
      code:'def somar(a, b):\\n    return a + b\\n\\nassert somar(2, 3) == 5',
      project:'Planeje um pequeno projeto Git com branch, três commits claros e uma revisão de código por checklist.',
      questions:[
        exercise('l4-testing-git-q1','choice','Qual teste verifica principalmente se dois componentes conseguem trabalhar juntos corretamente?',['Teste unitário isolado.','Teste de integração.','Teste de estilo visual apenas.','Nenhum teste pode verificar interação.'],1,'Teste de integração observa a interação entre componentes.',['O comportamento envolve mais de uma parte.','A interface entre as partes precisa ser exercitada.'],['Unitário foca uma unidade.','B corresponde à integração.','Estilo visual não cobre toda interação.','Testes podem verificar contratos integrados.'],['Conte quantos componentes participam do cenário.'],'Chamar qualquer teste de unitário.','Escolha o nível de teste conforme o limite que deseja verificar.'),
        exercise('l4-testing-git-q2','choice','Por que criar uma branch antes de desenvolver uma funcionalidade?',['Para apagar o histórico do projeto.','Para isolar uma linha de trabalho e facilitar revisão e integração.','Para impedir que testes sejam executados.','Para tornar o código automaticamente seguro.'],1,'Branch separa o trabalho sem substituir o histórico principal.',['A mudança pode evoluir sem alterar imediatamente a branch principal.','Depois, pode ser revisada e integrada.'],['Não é o objetivo de branch.','B descreve o fluxo.','Testes continuam possíveis.','Versionamento não garante segurança.'],['Pense em revisão e integração de mudanças independentes.'],'Acreditar que uma branch substitui testes e revisão.','Branches organizam mudanças; qualidade ainda depende de testes e revisão.')
      ]
    },
    {
      id:'l4-databases',level:4,title:'Dados relacionais, SQL e transações',
      objective:'Modelar registros relacionados e entender operações atômicas.',
      concept:'Banco relacional organiza dados em tabelas com linhas e colunas. Chaves primárias identificam registros; chaves estrangeiras ligam tabelas. SQL consulta e altera dados. Transação agrupa operações para que uma mudança composta seja aplicada de forma consistente ou revertida.',
      examples:['Tabela alunos: id, nome.','Tabela notas: id, aluno_id, valor.','JOIN relaciona notas ao aluno correspondente.','Uma transferência financeira não deve debitar sem creditar.'],
      code:'SELECT alunos.nome, notas.valor\\nFROM alunos\\nJOIN notas ON notas.aluno_id = alunos.id;',
      project:'Modele alunos, disciplinas e matrículas em tabelas. Identifique chaves primárias e estrangeiras.',
      questions:[
        exercise('l4-databases-q1','choice','Qual é a principal função de uma chave estrangeira?',['Identificar unicamente a linha na própria tabela, sempre sem relação.','Representar uma relação com uma chave de outra tabela.','Criptografar automaticamente os dados.','Substituir todas as consultas SQL.'],1,'A chave estrangeira representa integridade referencial entre tabelas.',['Ela armazena um valor que corresponde à chave referenciada.','O banco pode usar essa relação para validar vínculos.'],['Chave primária costuma identificar a própria linha.','B descreve a chave estrangeira.','Não é mecanismo de criptografia.','Não substitui SQL.'],['Pense como uma matrícula aponta para um aluno.'],'Confundir chave primária e estrangeira.','Use chaves para expressar identidade e relações.'),
        exercise('l4-databases-q2','choice','Uma transferência exige debitar uma conta e creditar outra. Por que usar uma transação?',['Para garantir que parte do processo não fique aplicada caso a outra falhe.','Para duplicar todos os registros.','Para impedir qualquer leitura do banco.','Para remover a necessidade de validação.'],0,'Atomicidade ajuda a tratar várias operações como uma unidade.',['Duas mudanças pertencem à mesma operação lógica.','Se uma falhar, a transação pode ser revertida.'],['A descreve atomicidade.','Duplicação não é requisito.','Leitura não precisa ser bloqueada em todos os bancos.','Validação continua necessária.'],['Imagine o que aconteceria se apenas o débito fosse gravado.'],'Tratar duas gravações relacionadas como ações independentes.','Agrupe alterações que precisam permanecer consistentes.')
      ]
    },
    {
      id:'l4-web-security',level:4,title:'Web, HTTP e segurança básica',
      objective:'Entender requisições web e reconhecer riscos comuns.',
      concept:'HTTP organiza requisições e respostas entre cliente e servidor. GET costuma consultar; POST costuma enviar dados para processamento. Segurança exige validação no servidor, controle de acesso e tratamento de dados não confiáveis. XSS pode ocorrer quando conteúdo controlado por usuário é interpretado como HTML ou script.',
      examples:['HTTPS protege a comunicação em trânsito.','CORS controla quais origens podem ler respostas em navegadores; não é autenticação.','Escapar texto antes de inseri-lo em HTML reduz risco de injeção.','Nunca coloque segredos de servidor em JavaScript público.'],
      code:'// Conceito: tratar texto do usuário como texto\\nelement.textContent = mensagem;',
      project:'Faça um diagrama cliente → requisição → servidor → validação → resposta. Marque onde autenticação e autorização devem acontecer.',
      questions:[
        exercise('l4-web-security-q1','choice','Por que uma chave secreta de API não deve ser colocada em um arquivo JavaScript servido ao navegador?',['O navegador não consegue ler JavaScript.','Qualquer visitante pode inspecionar os arquivos e copiar a chave.','CORS transforma a chave em pública.','O segredo expira automaticamente ao ser carregado.'],1,'Código entregue ao navegador deve ser considerado público.',['O cliente recebe o arquivo para executá-lo.','O usuário pode inspecionar fontes e requisições.','Logo, a chave pode ser extraída e reutilizada.'],['Navegadores leem JavaScript.','B é o risco real.','CORS não esconde conteúdo do cliente.','Não há expiração automática garantida.'],['Pergunte quem recebe o arquivo que contém o segredo.'],'Confundir esconder a interface com esconder dados enviados ao cliente.','Segredos devem permanecer no servidor, fora dos artefatos públicos.'),
        exercise('l4-web-security-q2','choice','Qual prática reduz diretamente o risco de XSS ao exibir uma mensagem digitada pelo usuário como conteúdo textual?',['Inserir a mensagem com innerHTML sem sanitização.','Usar textContent para inserir texto.','Desativar os testes.','Confiar apenas no nome do campo.'],1,'textContent insere conteúdo como texto, não o interpreta como marcação HTML.',['A entrada pode conter caracteres especiais.','textContent evita que esses caracteres sejam tratados como elementos ou scripts.'],['Pode interpretar marcação maliciosa.','B é a opção mais segura para texto simples.','Não reduz o risco.','Nome de campo não valida conteúdo.'],['Pense se o navegador vai interpretar HTML ou apenas mostrar caracteres.'],'Tratar qualquer texto recebido como HTML confiável.','Use APIs de texto para conteúdo simples e sanitização quando HTML rico for inevitável.')
      ]
    },
    {
      id:'l5-graphs-dp',level:5,title:'Grafos, caminhos e programação dinâmica',
      objective:'Escolher BFS, DFS ou programação dinâmica conforme a estrutura do problema.',
      concept:'BFS explora por camadas e encontra caminhos com menor número de arestas em grafos não ponderados. DFS aprofunda um caminho antes de retroceder. Programação dinâmica guarda resultados de subproblemas para evitar recomputação. Dijkstra é usado para caminhos mínimos em grafos com pesos não negativos.',
      examples:['BFS: menor número de conexões entre duas pessoas em uma rede não ponderada.','DFS: explorar componentes ou percorrer labirintos.','Programação dinâmica: guardar resultados de estados menores que voltam a ser usados.'],
      code:'dp[0] = 0\\nfor i in range(1, n + 1):\\n    dp[i] = dp[i - 1] + custo(i)',
      project:'Modele o problema da escada: quantas maneiras há de subir n degraus dando passos de 1 ou 2? Escreva a relação de recorrência.',
      questions:[
        exercise('l5-graphs-dp-q1','choice','Em um grafo sem pesos, você precisa encontrar o caminho com menor quantidade de arestas. Qual algoritmo é a escolha padrão?',['BFS.','DFS sem controle de profundidade.','Quick sort.','Busca binária sem ordem.'],0,'Busca em largura explora o grafo por distância em número de arestas.',['A fila processa primeiro os vértices descobertos mais cedo.','Os vértices são explorados por camadas de distância.'],['BFS atende ao problema.','DFS não garante caminho mínimo.','Quick sort ordena.','Busca binária exige sequência ordenada.'],['Pergunte qual estrutura de exploração respeita as camadas.'],'Usar DFS quando o objetivo é menor número de arestas.','Escolha BFS para distâncias em grafos não ponderados.')
        ,
        exercise('l5-graphs-dp-q2','choice','Qual é a principal vantagem da programação dinâmica em problemas com subproblemas sobrepostos?',['Recalcular sempre os mesmos resultados.','Armazenar resultados já calculados e reutilizá-los.','Eliminar a necessidade de definir estados.','Garantir que qualquer algoritmo se torne O(1).'],1,'Memorização ou tabulação evita recomputar subproblemas repetidos.',['Identifique subproblemas que aparecem mais de uma vez.','Guarde a resposta de cada estado.','Reutilize quando o mesmo estado surgir.'],['Amplia trabalho redundante.','B descreve a técnica.','Estados são fundamentais.','Não transforma qualquer problema em custo constante.'],['Procure cálculos repetidos em diferentes ramos.'],'Confundir programação dinâmica com uma solução que não precisa de prova de recorrência.','Defina estados, transições e casos-base antes de otimizar.')
      ]
    },
    {
      id:'l5-number-theory',level:5,title:'Matemática discreta para programação',
      objective:'Usar indução, combinatória, divisibilidade e aritmética modular.',
      concept:'A matemática discreta descreve estruturas finitas usadas em algoritmos. Indução prova uma propriedade para todos os naturais a partir de um caso-base e um passo indutivo. Aritmética modular trabalha com restos. Combinatória conta possibilidades sem listar cada caso.',
      examples:['Resto de 17 dividido por 5 é 2: 17 ≡ 2 (mod 5).','Indução: provar para n inicial e provar que P(n) implica P(n+1).','Princípio multiplicativo: escolhas em etapas independentes se multiplicam.'],
      code:'def eh_par(n):\\n    return n % 2 == 0\\n\\n# O resto da divisão por 2 distingue paridade.',
      project:'Escreva uma demonstração por indução de 1 + 2 + ... + n = n(n + 1)/2.',
      questions:[
        exercise('l5-number-theory-q1','number','Qual é o resto da divisão de 47 por 6?',[],5,'Aritmética modular identifica o resto da divisão inteira.',['6 × 7 = 42.','47 − 42 = 5.'],[],['Encontre o maior múltiplo de 6 que não ultrapassa 47.'],'Responder o quociente em vez do resto.','Use múltiplos próximos para calcular restos.'),
        exercise('l5-number-theory-q2','choice','Em uma prova por indução, depois de verificar o caso-base, o que deve ser demonstrado?',['Que a afirmação é verdadeira para um único número aleatório.','Que, supondo P(n) verdadeira, a regra permite concluir P(n+1).','Que não existem contraexemplos em uma pequena amostra.','Que a soma de todos os casos é zero.'],1,'O passo indutivo conecta a hipótese P(n) ao próximo caso.',['O caso-base inicia a cadeia.','O passo mostra que cada caso válido implica o seguinte.'],['Não estabelece todos os naturais.','B é o passo indutivo.','Amostra finita não substitui demonstração.','Não é requisito da indução.'],['Separe caso-base de passo indutivo.'],'Confundir verificar vários exemplos com provar a propriedade geral.','Indução é uma demonstração, não uma observação de padrões em amostras.')
      ]
    },
    {
      id:'l5-chess-engine',level:5,title:'Árvores de decisão, minimax e xadrez',
      objective:'Modelar decisões adversariais e compreender poda alfa-beta.',
      concept:'Em um jogo de dois participantes com objetivos opostos, minimax constrói uma árvore de estados: um jogador escolhe o maior valor e o adversário escolhe o menor. Uma função de avaliação estima posições quando não é possível pesquisar até o fim. Poda alfa-beta elimina ramos que não podem alterar a decisão final, mantendo o resultado do minimax.',
      examples:['Nós MAX escolhem a maior avaliação entre os filhos.','Nós MIN escolhem a menor avaliação entre os filhos.','Alfa é o melhor valor garantido por MAX; beta, o melhor limite para MIN.','A poda não muda a resposta do minimax quando aplicada corretamente; reduz nós explorados.'],
      code:'valor_MAX = max(avaliar(filho) for filho in movimentos)\\n# Em uma busca real, a árvore é explorada recursivamente.',
      project:'Desenhe uma árvore com um nível MAX e um nível MIN. Atribua valores às folhas, calcule o minimax e indique quais ramos poderiam ser podados.',
      questions:[
        exercise('l5-chess-engine-q1','choice','Em um nó MIN de uma árvore minimax, qual valor é escolhido entre os filhos já avaliados?',['O maior valor, porque MIN maximiza.','O menor valor, porque MIN representa o adversário que minimiza a avaliação de MAX.','A média dos valores.','Sempre zero.'],1,'Minimax alterna decisões de maximização e minimização.',['O valor é medido do ponto de vista de MAX.','O adversário MIN escolhe a opção menos favorável a MAX.'],['Inverte os papéis.','B aplica a definição.','Não se usa média por definição.','Zero não é regra geral.'],['Defina de quem é a perspectiva da função de avaliação.'],'Esquecer que valores são avaliados a partir de uma perspectiva definida.','Documente a perspectiva antes de implementar minimax.'),
        exercise('l5-chess-engine-q2','choice','Qual é a finalidade da poda alfa-beta em minimax?',['Alterar a avaliação para favorecer MAX.','Evitar explorar ramos que não podem mudar a decisão, preservando o resultado minimax.','Transformar o jogo em busca aleatória.','Eliminar a necessidade de uma função de avaliação em toda busca.'],1,'A poda reduz trabalho sem mudar a decisão do minimax.',['Mantenha limites alfa e beta.','Quando um ramo não pode melhorar a decisão, ele pode ser descartado.'],['Alteraria o resultado.','B descreve a poda correta.','Não é busca aleatória.','A avaliação continua necessária quando a busca é limitada.'],['Pergunte se explorar o ramo ainda poderia mudar a escolha final.'],'Tratar a poda como uma heurística que altera o resultado.','A poda alfa-beta acelera a busca sem modificar o valor minimax correto.')
      ]
    }
  ];

  const sourceGroups = {
    0: [
      { title: 'CS Unplugged — atividades de pensamento computacional', url: 'https://csunplugged.org/en/topics/' },
      { title: 'Harvard CS50 — Introduction to Computer Science', url: 'https://cs50.harvard.edu/x/' }
    ],
    1: [
      { title: 'Harvard CS50 — Scratch e pseudocódigo', url: 'https://cs50.harvard.edu/x/' },
      { title: 'Python — Getting Started', url: 'https://www.python.org/about/gettingstarted/' }
    ],
    2: [
      { title: 'Tutorial oficial de Python', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Guia JavaScript da MDN', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide' }
    ],
    3: [
      { title: 'MIT OpenCourseWare — Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/' },
      { title: 'VisuAlgo — visualização de estruturas e algoritmos', url: 'https://visualgo.net/en' }
    ],
    4: [
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      { title: 'SQLite — documentação oficial', url: 'https://www.sqlite.org/docs.html' },
      { title: 'Git — documentação', url: 'https://git-scm.com/doc' }
    ],
    5: [
      { title: 'MIT OpenCourseWare — Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/' },
      { title: 'CP-Algorithms — referências de algoritmos', url: 'https://cp-algorithms.com/' },
      { title: 'OBI — Olimpíada Brasileira de Informática', url: 'https://olimpiada.ic.unicamp.br/' }
    ]
  };
  lessons.forEach(function (lesson) {
    lesson.sources = sourceGroups[lesson.level] || [];
    lesson.reviewStatus = 'autoral-com-fontes-de-apoio';
  });

  function defaultState() {
    return { schemaVersion: SCHEMA_VERSION, attempts: [], questions: {}, completed: [], projects: {}, preferences: { dailyLimit: 12 } };
  }
  function safeState(value) {
    if (!value || typeof value !== 'object' || value.schemaVersion !== SCHEMA_VERSION) return null;
    if (!Array.isArray(value.attempts) || !value.questions || typeof value.questions !== 'object' ||
        !Array.isArray(value.completed) || !value.projects || typeof value.projects !== 'object') return null;
    const validIds = new Set(lessons.flatMap(function (lesson) { return lesson.questions.map(function (item) { return item.id; }); }));
    const questions = {};
    Object.keys(value.questions).forEach(function (id) {
      if (!validIds.has(id)) return;
      const item = value.questions[id];
      if (!item || typeof item !== 'object') return;
      questions[id] = {
        correct: item.correct === true,
        streak: Math.max(0, Math.min(100, Number(item.streak) || 0)),
        intervalDays: Math.max(0, Math.min(365, Number(item.intervalDays) || 0)),
        dueAt: Number.isFinite(item.dueAt) ? item.dueAt : 0,
        attempts: Math.max(0, Math.min(10000, Number(item.attempts) || 0)),
        lastAt: typeof item.lastAt === 'string' ? item.lastAt.slice(0, 40) : ''
      };
    });
    const projects = {};
    Object.keys(value.projects).forEach(function (id) {
      if (lessons.some(function (lesson) { return lesson.id === id; }) && value.projects[id] === true) projects[id] = true;
    });
    return {
      schemaVersion: SCHEMA_VERSION,
      attempts: value.attempts.slice(-5000).filter(function (item) {
        return item && validIds.has(item.questionId) && typeof item.correct === 'boolean';
      }).map(function (item) {
        return { questionId: item.questionId, correct: item.correct, hintsUsed: Math.max(0, Math.min(3, Number(item.hintsUsed) || 0)), at: String(item.at || '').slice(0, 40) };
      }),
      questions: questions,
      completed: value.completed.filter(function (id) { return lessons.some(function (lesson) { return lesson.id === id; }); }),
      projects: projects,
      preferences: { dailyLimit: Math.max(1, Math.min(50, Number(value.preferences && value.preferences.dailyLimit) || 12)) }
    };
  }
  function load() {
    try {
      const raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      return safeState(JSON.parse(raw)) || defaultState();
    } catch (error) {
      return defaultState();
    }
  }
  let state = load();
  let activeLesson = null;
  let questionIndex = 0;
  let selectedAnswer = null;
  let hintIndex = 0;
  let feedback = null;
  let activeTab = 'lessons';

  function save() {
    try {
      if (global.localStorage) global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      return false;
    }
  }
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char];
    });
  }
  function counts() {
    return {
      levels: levels.length,
      lessons: lessons.length,
      questions: lessons.reduce(function (sum, lesson) { return sum + lesson.questions.length; }, 0),
      completed: state.completed.length,
      attempts: state.attempts.length,
      correct: state.attempts.filter(function (item) { return item.correct; }).length,
      due: dueQuestions().length
    };
  }
  function progressFor(lesson) {
    const done = lesson.questions.filter(function (item) { return state.questions[item.id] && state.questions[item.id].correct; }).length;
    return { done: done, total: lesson.questions.length, complete: done === lesson.questions.length };
  }
  function levelProgress(level) {
    const group = lessons.filter(function (lesson) { return lesson.level === level; });
    return { complete: group.filter(function (lesson) { return progressFor(lesson).complete; }).length, total: group.length };
  }
  function masteryLabel(level) {
    const p = levelProgress(level), ratio = p.total ? p.complete / p.total : 0;
    if (ratio >= 1) return 'Mestre';
    if (ratio >= .66) return 'Temperado';
    if (ratio >= .33) return 'Forjado';
    if (ratio > 0) return 'Aquecido';
    return 'Bruto';
  }
  function updateCompletion(lesson) {
    const done = progressFor(lesson).complete;
    const index = state.completed.indexOf(lesson.id);
    if (done && index < 0) state.completed.push(lesson.id);
    if (!done && index >= 0) state.completed.splice(index, 1);
  }
  function dueQuestions() {
    const now = Date.now();
    return lessons.flatMap(function (lesson) {
      return lesson.questions.filter(function (item) {
        const progress = state.questions[item.id];
        return progress && progress.dueAt <= now && (progress.correct || progress.attempts > 0);
      }).map(function (item) {
        return { lesson: lesson, question: item, progress: state.questions[item.id] };
      });
    });
  }
  function render() {
    const root = global.document && global.document.getElementById('s-logic');
    if (!root) return;
    const c = counts();
    const completedPercent = Math.round((c.completed / c.lessons) * 100);
    const tabs = [
      ['lessons','Trilha'],['review','Revisão'],['projects','Projetos'],['method','Método']
    ].map(function (item) {
      return '<button type="button" class="lf-tab ' + (activeTab === item[0] ? 'is-active' : '') + '" data-lf-action="tab" data-tab="' + item[0] + '" aria-pressed="' + (activeTab === item[0]) + '">' + item[1] + '</button>';
    }).join('');
    let content = '';
    if (activeTab === 'lessons') content = renderLessons();
    else if (activeTab === 'review') content = renderReview();
    else if (activeTab === 'projects') content = renderProjects();
    else content = renderMethod();
    root.innerHTML =
      '<div class="lf-page">' +
        '<section class="lf-hero">' +
          '<div class="lf-eyebrow">QUARTO PILAR · RACIOCÍNIO E CRIAÇÃO</div>' +
          '<h1 tabindex="-1">Logic Forge</h1>' +
          '<p>Aprenda a pensar algoritmicamente, compreender código e construir soluções. A linguagem é uma ferramenta; o raciocínio vem primeiro.</p>' +
          '<div class="lf-metrics">' +
            metric('Níveis', c.levels) + metric('Unidades', c.lessons) + metric('Exercícios', c.questions) + metric('Concluídas', c.completed + '/' + c.lessons) +
          '</div>' +
          '<div class="lf-progress-track" role="progressbar" aria-label="Progresso da trilha" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + completedPercent + '"><span style="width:' + completedPercent + '%"></span></div>' +
        '</section>' +
        '<nav class="lf-tabs" aria-label="Seções do Logic Forge">' + tabs + '</nav>' +
        '<div id="lf-content">' + content + '</div>' +
        '<p class="lf-privacy">Seu progresso fica neste navegador, neste aparelho. Exporte um backup nas configurações do navegador do projeto. Este curso não executa código digitado por estudantes.</p>' +
      '</div>';
  }
  function metric(label, value) {
    return '<div><strong>' + esc(value) + '</strong><span>' + esc(label) + '</span></div>';
  }
  function renderLessons() {
    if (activeLesson) return renderLesson();
    return '<section class="lf-section"><div class="lf-section-heading"><div><h2>Uma trilha do zero ao avançado</h2><p>Avance quando compreender a ideia. Não existe cronômetro nem comparação com outras pessoas.</p></div></div>' +
      levels.map(function (level) {
        const p = levelProgress(level.id);
        return '<article class="lf-level-card"><div class="lf-level-header"><span class="lf-level-number">0' + level.id + '</span><div><h3>Nível ' + level.id + ' · ' + esc(level.name) + '</h3><p>' + esc(level.subtitle) + '</p></div><span class="lf-mastery">' + masteryLabel(level.id) + '</span></div>' +
          '<p class="lf-level-promise">' + esc(level.promise) + '</p><div class="lf-mini-progress"><span style="width:' + Math.round(p.complete / p.total * 100) + '%"></span></div><small>' + p.complete + ' de ' + p.total + ' unidades concluídas</small>' +
          '<div class="lf-lesson-list">' + lessons.filter(function (lesson) { return lesson.level === level.id; }).map(function (lesson) {
            const lp = progressFor(lesson);
            return '<button class="lf-lesson-row" type="button" data-lf-action="open-lesson" data-lesson="' + lesson.id + '"><span class="lf-lesson-status" aria-hidden="true">' + (lp.complete ? '✓' : String(lessons.indexOf(lesson) + 1).padStart(2,'0')) + '</span><span><strong>' + esc(lesson.title) + '</strong><small>' + esc(lesson.objective) + '</small></span><span class="lf-lesson-count">' + lp.done + '/' + lp.total + ' <span aria-hidden="true">→</span></span></button>';
          }).join('') + '</div></article>';
      }).join('') + '</section>';
  }
  function renderLesson() {
    const lesson = lessons.find(function (item) { return item.id === activeLesson; });
    if (!lesson) { activeLesson = null; return renderLessons(); }
    const current = lesson.questions[questionIndex];
    const p = progressFor(lesson);
    const qProgress = state.questions[current.id];
    const options = current.kind === 'choice'
      ? '<div class="lf-options" role="group" aria-label="Alternativas">' + current.options.map(function (option, index) {
          return '<label class="lf-option ' + (selectedAnswer === index ? 'is-selected' : '') + '"><input type="radio" name="lf-answer" value="' + index + '" ' + (selectedAnswer === index ? 'checked' : '') + ' ' + (feedback ? 'disabled' : '') + '><span><b>' + String.fromCharCode(65 + index) + '</b>' + esc(option) + '</span></label>';
        }).join('') + '</div>'
      : '<label class="lf-answer-label" for="lf-answer">Sua resposta</label><input id="lf-answer" class="lf-answer-input" inputmode="decimal" type="text" autocomplete="off" value="' + esc(selectedAnswer == null ? '' : selectedAnswer) + '" ' + (feedback ? 'disabled' : '') + ' placeholder="Digite um número">';
    const hint = hintIndex > 0 ? '<div class="lf-hint"><strong>Pista ' + hintIndex + ' de 3</strong><p>' + esc(current.hints[Math.min(hintIndex, current.hints.length) - 1] || 'Releia o exemplo e divida o problema em passos.') + '</p></div>' : '';
    const feedbackHtml = feedback ? renderFeedback(current) : '';
    return '<div class="lf-lesson-toolbar"><button type="button" class="lf-back" data-lf-action="back">← Todas as unidades</button><span>NÍVEL ' + lesson.level + ' · ' + esc(lesson.title) + '</span></div>' +
      '<article class="lf-content-card"><div class="lf-section-heading"><div><div class="lf-eyebrow">OBJETIVO DE APRENDIZAGEM</div><h2>' + esc(lesson.title) + '</h2><p>' + esc(lesson.objective) + '</p></div><span class="lf-mastery">' + (p.complete ? 'Concluída' : p.done + '/' + p.total + ' exercícios') + '</span></div>' +
      '<div class="lf-lesson-block"><h3>Entenda a ideia</h3><p>' + esc(lesson.concept) + '</p></div>' +
      '<div class="lf-example"><h3>Exemplo guiado</h3><ul>' + lesson.examples.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ul><pre><code>' + esc(lesson.code) + '</code></pre></div>' +
      '<div class="lf-project-prompt"><strong>Mini-projeto</strong><p>' + esc(lesson.project) + '</p></div>' +
      '<div class="lf-source-list"><strong>Fontes de referência</strong><p>Material autoral com referências para aprofundar. Os links apoiam o estudo, mas não representam revisão externa formal desta unidade.</p>' +
      lesson.sources.map(function (source) { return '<a href="' + esc(source.url) + '" target="_blank" rel="noopener noreferrer">' + esc(source.title) + ' ↗</a>'; }).join('') + '</div></article>' +
      '<section class="lf-exercise-card"><div class="lf-exercise-head"><div><div class="lf-eyebrow">PRÁTICA ATIVA · EXERCÍCIO ' + (questionIndex + 1) + ' DE ' + lesson.questions.length + '</div><h3>Agora explique seu raciocínio.</h3></div><span>' + (qProgress && qProgress.correct ? 'Acerto registrado' : 'Sem cronômetro') + '</span></div>' +
      '<div class="lf-question"><p>' + esc(current.prompt) + '</p>' + options + '</div>' +
      hint +
      (feedbackHtml || '<div class="lf-actions"><button type="button" class="lf-secondary" data-lf-action="hint" ' + (hintIndex >= 3 ? 'disabled' : '') + '>Pedir uma pista</button><button type="button" class="lf-primary" data-lf-action="check">Verificar resposta</button></div>') +
      (feedback && feedback.correct ? '<div class="lf-actions"><button type="button" class="lf-primary" data-lf-action="next">' + (questionIndex + 1 < lesson.questions.length ? 'Próximo exercício →' : 'Concluir unidade →') + '</button></div>' :
        feedback && !feedback.correct ? '<div class="lf-actions"><button type="button" class="lf-primary" data-lf-action="retry">Tentar novamente</button><button type="button" class="lf-secondary" data-lf-action="next">Continuar e revisar depois</button></div>' : '') +
      '<div id="lf-announcer" class="lf-sr-only" role="status" aria-live="polite"></div></section>';
  }
  function renderFeedback(question) {
    const correct = feedback.correct;
    return '<section class="lf-feedback ' + (correct ? 'is-correct' : 'is-wrong') + '" aria-live="polite"><strong>' + (correct ? 'Resposta correta. Bom trabalho.' : 'Ainda não. O erro ajuda a localizar o próximo passo.') + '</strong>' +
      '<div><h4>Conceito</h4><p>' + esc(question.concept) + '</p></div>' +
      '<div><h4>Resolução passo a passo</h4><ol>' + question.steps.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ol></div>' +
      (question.kind === 'choice' ? '<div><h4>Análise das alternativas</h4><ul>' + question.why.map(function (item, index) { return '<li><b>' + String.fromCharCode(65 + index) + ':</b> ' + esc(item) + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="lf-trap"><b>Armadilha comum:</b> ' + esc(question.trap) + '<br><b>Leve para a próxima:</b> ' + esc(question.takeaway) + '</div></section>';
  }
  function renderReview() {
    const due = dueQuestions();
    const incorrect = state.attempts.filter(function (item) { return !item.correct; }).slice(-12).reverse();
    if (!due.length && !incorrect.length) return '<section class="lf-empty"><h2>Sem revisões pendentes</h2><p>Responda aos exercícios da trilha. Erros e acertos entrarão em uma fila local de revisão.</p><button type="button" class="lf-primary" data-lf-action="tab" data-tab="lessons">Abrir trilha</button></section>';
    return '<section class="lf-section"><div class="lf-section-heading"><div><h2>Revisão de ideias</h2><p>Agendamento simples por intervalos. Não é um modelo FSRS e pode ser ajustado em versões futuras.</p></div></div>' +
      (due.length ? '<h3 class="lf-subheading">Vencidas ou prontas para rever</h3>' + due.map(function (item) {
        return '<article class="lf-review-row"><div><strong>' + esc(item.question.prompt) + '</strong><small>' + esc(item.lesson.title) + ' · ' + (item.progress.correct ? 'acertada anteriormente' : 'precisa de prática') + '</small></div><button type="button" class="lf-secondary" data-lf-action="open-review" data-lesson="' + item.lesson.id + '" data-question="' + item.question.id + '">Rever</button></article>';
      }).join('') : '') +
      (incorrect.length ? '<h3 class="lf-subheading">Erros recentes</h3>' + incorrect.map(function (item) {
        const lesson = lessons.find(function (entry) { return entry.questions.some(function (question) { return question.id === item.questionId; }); });
        const question = lesson && lesson.questions.find(function (entry) { return entry.id === item.questionId; });
        return question ? '<article class="lf-review-row"><div><strong>' + esc(question.prompt) + '</strong><small>' + esc(lesson.title) + ' · tentativa incorreta</small></div><button type="button" class="lf-secondary" data-lf-action="open-review" data-lesson="' + lesson.id + '" data-question="' + question.id + '">Rever</button></article>' : '';
      }).join('') : '') + '</section>';
  }
  function renderProjects() {
    return '<section class="lf-section"><div class="lf-section-heading"><div><h2>Projetos para construir</h2><p>Os projetos são desafios abertos. Use os critérios para revisar seu trabalho; não há correção automática fingida.</p></div></div>' +
      lessons.map(function (lesson) {
        return '<article class="lf-project-row"><span>NÍVEL ' + lesson.level + '</span><div><strong>' + esc(lesson.title) + '</strong><p>' + esc(lesson.project) + '</p><label><input type="checkbox" data-lf-project="' + lesson.id + '" ' + (state.projects[lesson.id] === true ? 'checked' : '') + '> Revisei meu projeto e consigo explicar as escolhas.</label></div></article>';
      }).join('') + '</section>';
  }
  function renderMethod() {
    return '<section class="lf-section lf-method"><h2>Como estudar programação de verdade</h2><p>Não tente decorar comandos isolados. Primeiro descubra o problema, depois modele uma solução e só então escolha a ferramenta.</p>' +
      '<ol><li><b>Preveja:</b> leia o código e escreva o resultado antes de executar.</li><li><b>Rastreie:</b> faça uma tabela com variáveis e valores a cada passo.</li><li><b>Explique:</b> descreva com suas palavras por que a solução funciona.</li><li><b>Depure:</b> mude um detalhe, observe o efeito e procure a causa.</li><li><b>Transfira:</b> resolva um problema parecido em outro contexto.</li><li><b>Revise:</b> volte às ideias em intervalos, não apenas na véspera.</li></ol>' +
      '<div class="lf-disclaimer"><strong>Ambiente de código</strong><p>Esta versão ensina lógica, leitura e rastreamento de exemplos. Ela não executa código enviado pelo estudante. Um editor executável será adicionado somente com isolamento adequado, limites de tempo e proteção contra acesso à página e aos dados locais.</p></div>' +
      '<div class="lf-resources"><a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">Tutorial oficial de Python ↗</a><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide" target="_blank" rel="noopener noreferrer">Guia JavaScript da MDN ↗</a><a href="https://olimpiada.ic.unicamp.br/" target="_blank" rel="noopener noreferrer">Olimpíada Brasileira de Informática ↗</a></div>' +
      '<div class="lf-backup"><h3>Backup do Logic Forge</h3><p>Exporte para guardar suas tentativas neste aparelho ou importe um arquivo de backup válido.</p><button type="button" class="lf-secondary" data-lf-action="export">Exportar progresso</button> <label class="lf-file-button">Importar backup<input id="lf-import" type="file" accept=".json,application/json"></label><p id="lf-backup-status" role="status" aria-live="polite"></p></div></section>';
  }
  function openLesson(lessonId, questionId) {
    const lesson = lessons.find(function (item) { return item.id === lessonId; });
    if (!lesson) return;
    activeLesson = lesson.id;
    questionIndex = questionId ? Math.max(0, lesson.questions.findIndex(function (item) { return item.id === questionId; })) : 0;
    if (questionIndex < 0) questionIndex = 0;
    selectedAnswer = null; hintIndex = 0; feedback = null; activeTab = 'lessons'; render();
    const heading = global.document && global.document.querySelector('#s-logic h2');
    if (heading && heading.focus) heading.focus();
  }
  function checkAnswer() {
    if (!activeLesson || feedback) return;
    const lesson = lessons.find(function (item) { return item.id === activeLesson; });
    const question = lesson && lesson.questions[questionIndex];
    if (!question) return;
    const input = global.document && global.document.getElementById('lf-answer');
    if (question.kind === 'number' && input) selectedAnswer = input.value.trim();
    if (selectedAnswer === null || selectedAnswer === '') {
      const status = global.document && global.document.getElementById('lf-announcer');
      if (status) status.textContent = 'Escolha ou digite uma resposta antes de verificar.';
      return;
    }
    const correct = question.kind === 'choice' ? Number(selectedAnswer) === question.answer : Math.abs(Number(String(selectedAnswer).replace(',', '.')) - Number(question.answer)) < 0.000001;
    const now = Date.now();
    const prior = state.questions[question.id] || { correct: false, streak: 0, intervalDays: 0, dueAt: now, attempts: 0, lastAt: '' };
    const attempts = prior.attempts + 1;
    const streak = correct ? prior.streak + 1 : 0;
    const intervals = [1, 3, 7, 14, 30];
    const intervalDays = correct ? intervals[Math.min(streak - 1, intervals.length - 1)] : 0;
    state.questions[question.id] = {
      correct: correct, streak: streak, intervalDays: intervalDays,
      dueAt: correct ? now + intervalDays * 86400000 : now,
      attempts: attempts, lastAt: new Date(now).toISOString()
    };
    state.attempts.push({ questionId: question.id, correct: correct, hintsUsed: hintIndex, at: new Date(now).toISOString() });
    state.attempts = state.attempts.slice(-5000);
    updateCompletion(lesson);
    save();
    feedback = { correct: correct };
    render();
    const live = global.document && global.document.querySelector('#s-logic .lf-feedback');
    if (live && live.focus) { live.setAttribute('tabindex','-1'); live.focus(); }
  }
  function nextQuestion() {
    if (!activeLesson) return;
    const lesson = lessons.find(function (item) { return item.id === activeLesson; });
    if (questionIndex + 1 < lesson.questions.length) {
      questionIndex++; selectedAnswer = null; hintIndex = 0; feedback = null; render();
      const question = global.document && global.document.querySelector('#s-logic .lf-question');
      if (question && question.focus) { question.setAttribute('tabindex','-1'); question.focus(); }
      return;
    }
    activeLesson = null; selectedAnswer = null; hintIndex = 0; feedback = null; activeTab = 'lessons'; render();
  }
  function exportProgress() {
    return { app: 'Mind Forge Logic Forge', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), state: JSON.parse(JSON.stringify(state)) };
  }
  function importProgress(payload) {
    if (!payload || payload.app !== 'Mind Forge Logic Forge' || !payload.state) return false;
    const cleaned = safeState(payload.state);
    if (!cleaned) return false;
    state = cleaned; save(); activeLesson = null; activeTab = 'lessons'; render(); return true;
  }
  function handleClick(event) {
    const target = event.target.closest('[data-lf-action]');
    if (!target) return;
    const action = target.dataset.lfAction;
    if (action === 'tab') { activeTab = target.dataset.tab; activeLesson = null; render(); }
    else if (action === 'open-lesson') openLesson(target.dataset.lesson);
    else if (action === 'open-review') openLesson(target.dataset.lesson, target.dataset.question);
    else if (action === 'back') { activeLesson = null; selectedAnswer = null; hintIndex = 0; feedback = null; render(); }
    else if (action === 'hint' && hintIndex < 3) { hintIndex++; render(); }
    else if (action === 'check') checkAnswer();
    else if (action === 'next') nextQuestion();
    else if (action === 'retry') { selectedAnswer = null; hintIndex = 0; feedback = null; render(); }
    else if (action === 'export') {
      const payload = JSON.stringify(exportProgress(), null, 2);
      const blob = new Blob([payload], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = global.document.createElement('a');
      link.href = url; link.download = 'logic-forge-backup.json'; link.click();
      URL.revokeObjectURL(url);
    }
  }
  function handleChange(event) {
    if (event.target.name === 'lf-answer') selectedAnswer = Number(event.target.value);
    if (event.target.hasAttribute('data-lf-project')) {
      state.projects[event.target.dataset.lfProject] = event.target.checked;
      save();
    }
    if (event.target.id === 'lf-import' && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 1024 * 1024) { announce('O arquivo ultrapassa 1 MB.'); return; }
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const ok = importProgress(JSON.parse(reader.result));
          announce(ok ? 'Backup importado com sucesso.' : 'Backup inválido ou incompatível.');
        } catch (error) { announce('Não foi possível ler o backup.'); }
      };
      reader.readAsText(file);
    }
  }
  function announce(message) {
    const node = global.document && global.document.getElementById('lf-backup-status');
    if (node) node.textContent = message;
  }
  function init() {
    if (!global.document || global.document.__logicForgeBound) return;
    global.document.__logicForgeBound = true;
    global.document.addEventListener('click', handleClick);
    global.document.addEventListener('change', handleChange);
  }
  const api = {
    render: render,
    init: init,
    counts: counts,
    exportProgress: exportProgress,
    importProgress: importProgress,
    levels: levels,
    lessons: lessons,
    progressFor: function (id) { const lesson = lessons.find(function (item) { return item.id === id; }); return lesson ? progressFor(lesson) : null; },
    audit: function () {
      const ids = new Set(), errors = [];
      lessons.forEach(function (lesson) {
        lesson.questions.forEach(function (item) {
          if (ids.has(item.id)) errors.push('ID duplicado: ' + item.id);
          ids.add(item.id);
          if (item.kind === 'choice' && (!Array.isArray(item.options) || item.answer < 0 || item.answer >= item.options.length || item.why.length !== item.options.length)) errors.push('Alternativas ou justificativas inválidas: ' + item.id);
          if (item.kind === 'number' && !Number.isFinite(item.answer)) errors.push('Resposta numérica inválida: ' + item.id);
          if (!item.steps.length || item.hints.length < 2 || !item.trap || !item.takeaway) errors.push('Feedback incompleto: ' + item.id);
        });
      });
      return { ok: errors.length === 0, errors: errors, levels: levels.length, lessons: lessons.length, questions: ids.size };
    }
  };
  global.MindForgeLogic = api;
  init();
})(window);
