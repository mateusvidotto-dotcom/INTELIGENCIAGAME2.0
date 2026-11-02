(function (global) {
  'use strict';
  const MF = global.MindForge;
  const questions = [];
  const symbols = ['●','▲','■','◆','○','△','□','◇'];

  // 8 counting items become fresh variants whenever selected.
  for (let i = 1; i <= 8; i++) {
    const target = symbols[(i * 3) % symbols.length];
    const seq = Array.from({length:24}, (_, index) => symbols[(index * 3 + i) % symbols.length]);
    seq[i] = target;
    const answer = seq.filter(symbol => symbol === target).length;
    questions.push({ id:`attention-count-${String(i).padStart(2,'0')}`, moduleId:'attention', type:'count', taskFamily:'count', level:Math.min(9, 1 + Math.floor((i - 1) * 8 / 8)), dynamic:'attention-count', minLength:24, maxLength:45, target, displaySequence:seq.join('  '), answer, prompt:`Quantas vezes o símbolo ${target} aparece na sequência?`, shortTitle:'Contagem visual', explanation:`Conte somente o símbolo-alvo e verifique a contagem percorrendo a sequência uma vez, de forma sistemática.`, hints:['Divida visualmente a sequência em pequenos blocos e mantenha uma contagem parcial.','Ignore os símbolos que não correspondem exatamente ao alvo.'], tags:['atenção seletiva','observação'], context:'O alvo e a sequência mudam a cada nova apresentação; não há cronômetro.' });
  }
  // 4 localization challenges generate a new sequence and new distractors each time.
  for (let i = 9; i <= 12; i++) {
    const seq = Array.from({length:12}, (_, index) => symbols[(index * 5 + i) % symbols.length]);
    const pos = 2 + (i % 7);
    const correctSymbol = seq[pos - 1];
    const options = [correctSymbol, ...symbols.filter(symbol => symbol !== correctSymbol).slice(0,3)];
    const answer = 0;
    questions.push({ id:`attention-position-${i}`, moduleId:'attention', type:'choice', taskFamily:'position', level:Math.min(7, 2 + i - 9), dynamic:'attention-position', sequence:seq, displaySequence:seq.join('  '), position:pos, options, answer, prompt:`Qual símbolo ocupa a posição ${pos}, contando da esquerda a partir de 1?`, shortTitle:'Localização de símbolo', explanation:'Conte as posições da esquerda para a direita começando em 1. Não confunda o número da posição com o índice de programação, que normalmente começa em zero.', hints:['Marque mentalmente a primeira posição como 1.','Conte até o número indicado sem pular espaços.'], tags:['atenção sustentada','ordenação'] });
  }
  // 4 adjacency challenges require scanning relationally, not counting a target symbol.
  for (let i = 13; i <= 16; i++) {
    const seq = Array.from({length:15}, (_, index) => symbols[(index * 3 + i + Math.floor(index / 3)) % symbols.length]);
    const answer = seq.slice(1).filter((symbol, index) => symbol === seq[index]).length;
    questions.push({ id:`attention-adjacent-${i}`, moduleId:'attention', type:'number', taskFamily:'adjacent', level:Math.min(8, 3 + i - 13), dynamic:'attention-adjacent', displaySequence:seq.join('  '), answer, prompt:'Quantos pares adjacentes contêm dois símbolos iguais?', shortTitle:'Pares adjacentes', explanation:'Compare cada posição somente com a imediatamente seguinte. Um símbolo repetido que esteja separado por outro símbolo não forma um par adjacente.', hints:['Deslize o olhar um lugar por vez, comparando cada símbolo com o seguinte.','Cada par é identificado pela posição inicial: (1,2), (2,3), (3,4) e assim por diante.'], tags:['atenção relacional','varredura visual'] });
  }
  const curated = [
    {id:'attention-pattern-17',level:4,prompt:'Qual opção completa o padrão sem quebrar a alternância? ▲ ● ▲ ● ▲ __',options:['▲','●','■','◆'],answer:1,explanation:'O padrão alterna triângulo e círculo. Após ▲ vem ●; não é necessário inventar uma regra adicional.',hints:['Observe os dois símbolos que se alternam.']},
    {id:'attention-pattern-18',level:5,prompt:'Considere os pares: (●, ▲), (■, ◆), (○, △), (□, ◇). Qual propriedade todos compartilham?',options:['Os símbolos de cada par são idênticos.','O primeiro é preenchido e o segundo é vazado.','Em cada par, ambos têm o mesmo tipo de preenchimento.','Cada par contém exatamente um triângulo.'],answer:2,explanation:'Cada par mantém o mesmo estilo de preenchimento: os dois primeiros pares usam formas preenchidas, e os dois últimos usam formas vazadas. A tarefa é comparar a propriedade visual compartilhada, não a identidade exata dos símbolos.',hints:['Compare forma e preenchimento, não apenas a cor.']},
    {id:'attention-pattern-19',level:5,prompt:'Duas linhas deveriam ser idênticas, mas uma posição foi alterada. Linha A: ● ▲ ■ ◆ ○ △. Linha B: ● ▲ ■ ◇ ○ △. Qual posição difere?',options:['A 2ª posição','A 4ª posição','A 5ª posição','A 6ª posição'],answer:1,explanation:'As primeiras três posições coincidem. Na quarta, a linha A contém ◆ e a linha B contém ◇; as posições seguintes voltam a coincidir.',hints:['Compare posição por posição, não a forma geral das linhas.']},
    {id:'attention-pattern-20',level:6,prompt:'Em um registro, todos os códigos válidos têm exatamente duas letras seguidas de três algarismos. Qual código viola a regra?',options:['QF-284','LM-705','B8-K42','RT-039'],answer:2,explanation:'B8-K42 intercala uma letra e um algarismo antes do hífen, em vez de apresentar exatamente duas letras seguidas de três algarismos. Os demais seguem o padrão.',hints:['Separe a estrutura antes e depois do hífen e conte os tipos de caracteres.']},
    {id:'attention-pattern-21',level:6,prompt:'Um relatório registra horários em ordem crescente: 08:42, 09:05, 09:50, 10:12, 10:02. Qual é o primeiro ponto em que a ordem é quebrada?',options:['09:05','09:50','10:12','10:02'],answer:3,explanation:'10:02 aparece depois de 10:12, embora seja um horário anterior. A primeira quebra é identificada ao comparar o último item com o imediatamente anterior.',hints:['Compare cada horário com o que vem logo depois dele.']},
    {id:'attention-pattern-22',level:7,prompt:'Uma sequência segue a regra “aumenta 2, depois aumenta 3”, repetidamente: 4, 6, 9, 11, 14, __. Qual número vem a seguir?',options:['15','16','17','18'],answer:1,explanation:'As diferenças alternam +2 e +3: 4→6 (+2), 6→9 (+3), 9→11 (+2), 11→14 (+3). A próxima diferença é +2, portanto 16.',hints:['Escreva as diferenças em vez de olhar apenas para os números.']},
    {id:'attention-pattern-23',level:7,prompt:'Um formulário possui três campos obrigatórios. Os registros A, B, C e D estão completos em nome, data e código, exceto um deles. Qual deve ser revisado? A: nome/data/código; B: nome/código/data; C: nome/data/—; D: data/nome/código.',options:['Registro A','Registro B','Registro C','Registro D'],answer:2,explanation:'O registro C não possui o campo código. A ordem dos campos nos demais registros varia, mas todos os três campos estão presentes.',hints:['Compare a presença dos três campos, não a ordem em que são escritos.']},
    {id:'attention-pattern-24',level:8,prompt:'Uma etiqueta válida contém exatamente 5 caracteres: letra, algarismo, letra, algarismo, letra. Qual etiqueta viola esse padrão?',options:['A7B2C','M4N8P','R3T5V','K2LQ6'],answer:3,explanation:'K2LQ6 tem a estrutura letra, algarismo, letra, letra, algarismo; a quarta posição deveria ser um algarismo e a quinta uma letra.',hints:['Classifique cada posição como letra ou algarismo antes de escolher.']}
  ];
  curated.forEach(q => questions.push({ ...q, moduleId:'attention', type:'choice', taskFamily:'pattern', tags:['atenção','detecção de padrões'] }));
  MF.registerModule({ id:'attention', title:'Atenção e percepção', shortTitle:'Atenção', description:'Contagem seletiva, localização, comparação, detecção de mudanças e padrões.', icon:'⌖', accent:'#7ddbd3', category:'cognitive', tag:'OBSERVAÇÃO', kicker:'CENTRO DE ATENÇÃO', subtitle:'Observe com método. A precisão vale mais do que a velocidade.', questions, duration:'4–10 min' });
})(window);
