(function (global) {
  'use strict';
  const MF = global.MindForge;
  const modes = [
    ['forward','Observe os símbolos e, depois de ocultá-los, reproduza todos na mesma ordem.'],
    ['reverse','Observe os símbolos e, depois de ocultá-los, reproduza a sequência em ordem inversa.'],
    ['oddPositions','Observe os símbolos e, depois de ocultá-los, escreva apenas os que estavam nas posições ímpares (1ª, 3ª, 5ª...), mantendo a ordem original.'],
    ['evenPositions','Observe os símbolos e, depois de ocultá-los, escreva apenas os que estavam nas posições pares (2ª, 4ª, 6ª...), mantendo a ordem original.'],
    ['symbolOrder','Memorize os símbolos. Depois de ocultá-los, reorganize-os nesta ordem: ●, ▲, ■, ◆, ✦, ○, △, ◇. Preserve todas as repetições.']
  ];
  const symbols = ['●','▲','■','◆','✦','○','△','◇'];
  const questions = [];
  const levels = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,7,8,8,8,8,8,8,9,9,9];
  for (let i = 1; i <= 24; i++) {
    const [mode, instruction] = modes[(i - 1) % modes.length];
    const level = levels[i - 1];
    const length = Math.min(10, 3 + level);
    const sequence = Array.from({ length }, (_, index) => symbols[(i * 3 + index * 5 + Math.floor(i / 2) * index) % symbols.length]);
    let answer = sequence.slice();
    if (mode === 'reverse') answer.reverse();
    if (mode === 'oddPositions') answer = sequence.filter((_, index) => index % 2 === 0);
    if (mode === 'evenPositions') answer = sequence.filter((_, index) => index % 2 === 1);
    if (mode === 'symbolOrder') {
      const rank = new Map(symbols.map((symbol, index) => [symbol, index]));
      answer = sequence.map((symbol, index) => ({ symbol, index })).sort((a,b) => rank.get(a.symbol)-rank.get(b.symbol) || a.index-b.index).map(item => item.symbol);
    }
    questions.push({
      id:`memory-task-${String(i).padStart(2,'0')}`, moduleId:'memory', type:'memory', taskFamily:mode, level,
      dynamic:'memory-sequence', memoryMode:mode, modeInstruction:instruction,
      prompt:instruction, shortTitle:`${instruction.split('.')[0]}`,
      sequence, answer:answer.join(''),
      explanation:`A regra desta tarefa é: ${instruction.toLocaleLowerCase('pt-BR')} A dificuldade depende tanto de manter os símbolos ativos quanto de aplicar a transformação solicitada. Isso não constitui uma medida geral de inteligência.`,
      hints:mode==='forward'?['Agrupe os símbolos em pares ou pequenos blocos.','Antes de ocultar, repita mentalmente cada bloco e preserve a ordem.']:
        mode==='reverse'?['Guarde primeiro a sequência original; depois percorra mentalmente do último símbolo ao primeiro.','Não comece a escrever enquanto ainda estiver tentando recordar a ordem original.']:
        mode==='oddPositions'?['Marque mentalmente 1ª, 3ª, 5ª... enquanto observa.','A resposta começa com o símbolo da primeira posição e pula um a cada vez.']:
        mode==='evenPositions'?['Comece pelo segundo símbolo e avance de dois em dois.','Não inclua a primeira posição nem as demais posições ímpares.']:
        ['Recorde todos os símbolos antes de reorganizá-los.','Use exatamente a ordem de símbolos fornecida na instrução e preserve as repetições.'],
      tags:['memória de trabalho','recuperação ativa',mode], context:`Modo: ${mode}. A sequência é gerada novamente ao iniciar uma nova sessão; sem cronômetro.`
    });
  }
  MF.registerModule({ id:'memory', title:'Câmara da memória', shortTitle:'Memória', description:'Recordação direta, inversa, seleção por posições e transformação após a ocultação.', icon:'▦', accent:'#c0a2ff', category:'cognitive', tag:'RETENÇÃO', kicker:'CÂMARA DA MEMÓRIA', subtitle:'Codifique a informação e recupere-a aplicando a regra solicitada.', questions, duration:'4–10 min' });
})(window);
