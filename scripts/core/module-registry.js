(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  MF.modules = [];

  MF.registerModule = function (module) {
    if (!module || typeof module.id !== 'string' || !module.id || !module.title || !Array.isArray(module.questions)) {
      throw new Error('Módulo Mind Forge inválido.');
    }
    if (MF.modules.some(existing => existing.id === module.id)) throw new Error('ID de módulo duplicado: ' + module.id);
    MF.modules.push(module);
  };
  MF.getModule = id => MF.modules.find(module => module.id === id) || null;
  MF.getQuestion = id => {
    for (const module of MF.modules) {
      const question = module.questions.find(q => q.id === id);
      if (question) return question;
    }
    const review = ((MF.state && MF.state.reviewItems) || []).find(item => item.id === id);
    return review ? review.question : null;
  };
  MF.cloneQuestion = q => JSON.parse(JSON.stringify(q));

  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function shuffled(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const attentionSymbols = ['●', '▲', '■', '◆', '○', '△', '□', '◇'];
  const memorySymbols = ['●', '▲', '■', '◆', '✦', '○', '△', '◇'];

  MF.instantiateQuestion = function (source) {
    const q = MF.cloneQuestion(source);
    if (q.dynamic === 'attention-count') {
      const level = Math.max(1, Math.min(9, Number(q.level) || 1));
      const length = randomInt(Math.max(q.minLength || 24, 18 + level * 2), Math.max(q.maxLength || 42, 24 + level * 3));
      const target = attentionSymbols[randomInt(0, attentionSymbols.length - 1)];
      const count = randomInt(Math.max(3, Math.floor(length * 0.12)), Math.max(5, Math.floor(length * 0.28)));
      const others = attentionSymbols.filter(s => s !== target);
      const list = Array.from({ length: count }, () => target);
      while (list.length < length) list.push(others[randomInt(0, others.length - 1)]);
      q.displaySequence = shuffled(list).join('  ');
      q.target = target;
      q.answer = count;
      q.prompt = `Quantas vezes o símbolo ${target} aparece na sequência?`;
      q.shortTitle = `Contagem visual · ${target}`;
      q.explanation = `O símbolo-alvo ${target} aparece ${count} vez(es). Uma estratégia confiável é percorrer a sequência em blocos e manter a contagem parcial, evitando reiniciar ou contar um símbolo duas vezes.`;
      q.context = `Conte somente ${target}. A sequência tem ${length} posições; não há cronômetro.`;
    } else if (q.dynamic === 'attention-adjacent') {
      const level = Math.max(1, Math.min(9, Number(q.level) || 1));
      const length = randomInt(12 + level, 16 + level * 2);
      const list = [];
      for (let i = 0; i < length; i++) {
        // Repetições adjacentes aparecem, mas não em todas as posições.
        if (i > 0 && Math.random() < (0.12 + level * 0.012)) list.push(list[i - 1]);
        else list.push(attentionSymbols[randomInt(0, attentionSymbols.length - 1)]);
      }
      q.displaySequence = list.join('  ');
      q.answer = list.slice(1).filter((symbol, index) => symbol === list[index]).length;
      q.prompt = 'Quantos pares adjacentes contêm dois símbolos iguais?';
      q.shortTitle = 'Detecção de repetições adjacentes';
      q.explanation = `Há ${q.answer} par(es) adjacente(s) idêntico(s). Compare cada símbolo apenas com o imediatamente seguinte; repetições separadas por outros símbolos não contam como par adjacente.`;
      q.context = `A sequência contém ${length} símbolos. Conte pares vizinhos, não ocorrências isoladas.`;
    } else if (q.dynamic === 'attention-position') {
      const level = Math.max(1, Math.min(9, Number(q.level) || 1));
      const length = randomInt(9 + Math.floor(level / 2), 13 + level);
      const list = Array.from({ length }, () => attentionSymbols[randomInt(0, attentionSymbols.length - 1)]);
      const position = randomInt(3, length - 2);
      const correctSymbol = list[position - 1];
      const alternatives = shuffled(attentionSymbols.filter(s => s !== correctSymbol)).slice(0, 3);
      q.sequence = list;
      q.displaySequence = list.join('  ');
      q.position = position;
      q.options = shuffled([correctSymbol, ...alternatives]);
      q.answer = q.options.indexOf(correctSymbol);
      q.prompt = `Qual símbolo ocupa a posição ${position}, contando da esquerda para a direita a partir de 1?`;
      q.shortTitle = 'Localização precisa de símbolo';
      q.explanation = `A posição ${position} é ${correctSymbol}. Conte desde a primeira posição, à esquerda, e não a partir de zero.`;
      q.context = `A sequência possui ${length} posições. Considere cada símbolo como uma posição.`;
    } else if (q.dynamic === 'memory-sequence') {
      const level = Math.max(1, Math.min(9, Number(q.level) || 1));
      const length = Math.min(10, 3 + level);
      const sequence = Array.from({ length }, () => memorySymbols[randomInt(0, memorySymbols.length - 1)]);
      const mode = q.memoryMode || 'forward';
      const rank = new Map(memorySymbols.map((symbol, index) => [symbol, index]));
      let answerSequence = sequence.slice();
      if (mode === 'reverse') answerSequence.reverse();
      if (mode === 'oddPositions') answerSequence = sequence.filter((_, index) => index % 2 === 0);
      if (mode === 'evenPositions') answerSequence = sequence.filter((_, index) => index % 2 === 1);
      if (mode === 'symbolOrder') answerSequence = sequence.map((symbol, index) => ({ symbol, index })).sort((a, b) => rank.get(a.symbol) - rank.get(b.symbol) || a.index - b.index).map(item => item.symbol);
      q.sequence = sequence;
      q.answer = answerSequence.join('');
      q.memoryInstruction = q.modeInstruction || 'Depois de ocultar, reproduza a sequência na mesma ordem.';
      q.prompt = q.memoryInstruction;
      q.shortTitle = ({forward:'Recordação direta',reverse:'Recordação inversa',oddPositions:'Recordação de posições ímpares',evenPositions:'Recordação de posições pares',symbolOrder:'Ordenação após memorização'})[mode] || 'Desafio de memória';
      q.explanation = ({
        forward:`A sequência tinha ${length} símbolos. Aqui a regra era preservar todos os elementos e sua ordem original.`,
        reverse:`A resposta correta é a sequência apresentada de trás para frente. A tarefa exige guardar os elementos e aplicar a transformação depois que a tela é ocultada.`,
        oddPositions:`A resposta reúne os símbolos que estavam nas posições ímpares (1ª, 3ª, 5ª...) na ordem original. A regra de seleção é tão importante quanto recordar os símbolos.`,
        evenPositions:`A resposta reúne os símbolos das posições pares (2ª, 4ª, 6ª...) na ordem original. Não inclua as posições ímpares.`,
        symbolOrder:`A resposta contém os mesmos símbolos reorganizados pela ordem indicada na instrução; símbolos repetidos devem ser preservados. A atividade combina memória com transformação de informação.`
      })[mode];
      q.context = `Memorize ${length} símbolos. Quando estiver pronto, oculte a sequência e aplique exatamente a regra solicitada. O exercício não é uma medida geral de inteligência.`;
    }
    return q;
  };

  // Randomização Fisher–Yates sem perder a correspondência entre a alternativa certa e o gabarito.
  MF.shuffleChoiceOptions = function (source) {
    const q = MF.cloneQuestion(source);
    if (q.type !== 'choice' || !Array.isArray(q.options) || !Number.isInteger(q.answer)) return q;
    const correctValue = q.options[q.answer];
    q.options = shuffled(q.options);
    q.answer = q.options.indexOf(correctValue);
    return q;
  };

  MF.validateQuestion = function (q) {
    if (!q || typeof q.id !== 'string' || !q.id || typeof q.prompt !== 'string' || !q.prompt.trim()) return false;
    if (!Number.isInteger(q.level) || q.level < 1 || q.level > 9) return false;
    if (!['choice', 'number', 'text', 'count', 'memory', 'open'].includes(q.type)) return false;
    if (q.type === 'choice') return Array.isArray(q.options) && q.options.length >= 4 && q.options.every(o => typeof o === 'string' && o.trim()) && new Set(q.options.map(o => o.trim().toLocaleLowerCase('pt-BR'))).size === q.options.length && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length;
    if (q.type === 'open') return Array.isArray(q.criteria) && q.criteria.length >= 2;
    if (q.type === 'memory') return Array.isArray(q.sequence) && q.sequence.length > 0 && typeof q.answer === 'string' && q.answer.length > 0;
    if (q.type === 'count' || q.type === 'number') return Number.isFinite(Number(q.answer));
    if (q.type === 'text') return typeof q.answer === 'string' && q.answer.trim().length > 0;
    return false;
  };
})(window);
