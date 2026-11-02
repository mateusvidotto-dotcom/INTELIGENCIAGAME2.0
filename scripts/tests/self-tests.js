(function (global) {
  'use strict';
  const MF = global.MindForge;
  function answerForMemory(q) {
    const source = q.sequence.slice();
    const symbols = ['●','▲','■','◆','✦','○','△','◇'];
    if (q.memoryMode === 'reverse') source.reverse();
    if (q.memoryMode === 'oddPositions') return q.sequence.filter((_, index) => index % 2 === 0).join('');
    if (q.memoryMode === 'evenPositions') return q.sequence.filter((_, index) => index % 2 === 1).join('');
    if (q.memoryMode === 'symbolOrder') {
      const rank = new Map(symbols.map((symbol,index) => [symbol,index]));
      return q.sequence.map((symbol,index) => ({symbol,index})).sort((a,b) => rank.get(a.symbol)-rank.get(b.symbol) || a.index-b.index).map(item => item.symbol).join('');
    }
    return source.join('');
  }
  MF.Tests = {
    run() {
      const failures = [];
      const warnings = [];
      const seen = new Set();
      let questionCount = 0;
      let choiceCount = 0;
      const types = {};
      for (const module of MF.modules) {
        if (!module.questions.length) failures.push(`Módulo sem questões: ${module.id}`);
        if (module.questions.length < 20) warnings.push(`Módulo com menos de 20 questões: ${module.id}`);
        for (const q of module.questions) {
          questionCount++;
          types[q.type] = (types[q.type] || 0) + 1;
          if (seen.has(q.id)) failures.push(`ID duplicado: ${q.id}`);
          seen.add(q.id);
          if (!MF.validateQuestion(q)) failures.push(`Questão inválida: ${q.id}`);
          if (q.moduleId !== module.id) failures.push(`Módulo incoerente em ${q.id}`);
          if (q.type === 'choice') {
            choiceCount++;
            if (q.options.length !== 4) failures.push(`Questão objetiva não possui exatamente 4 alternativas: ${q.id}`);
            if (q.answer < 0 || q.answer >= q.options.length) failures.push(`Resposta fora das opções: ${q.id}`);
            if (new Set(q.options.map(x => String(x).trim().toLocaleLowerCase('pt-BR'))).size !== q.options.length) failures.push(`Alternativas duplicadas em ${q.id}`);
            const shuffled = MF.shuffleChoiceOptions(q);
            if (shuffled.options[shuffled.answer] !== q.options[q.answer]) failures.push(`Embaralhamento quebrou o gabarito de ${q.id}`);
          }
          if (q.type === 'count' && String(q.displaySequence || '').split(/\s+/).filter(symbol => symbol === q.target).length !== q.answer && !q.dynamic) failures.push(`Contagem-base não confere: ${q.id}`);
          if (q.type === 'memory' && answerForMemory(q) !== q.answer) failures.push(`Resposta-base de memória não confere: ${q.id}`);
          if (q.type === 'open' && (!Array.isArray(q.criteria) || q.criteria.length < 2)) failures.push(`Rubrica de autoavaliação ausente: ${q.id}`);
        }
      }
      // Ensure choice randomization is broadly balanced; statistical sanity check with generous bounds.
      const choice = MF.modules.flatMap(m => m.questions).find(q => q.type === 'choice' && q.options.length === 4);
      if (choice) {
        const positions = [0,0,0,0];
        for (let i = 0; i < 600; i++) positions[MF.shuffleChoiceOptions(choice).answer]++;
        const min = Math.min(...positions) / 600, max = Math.max(...positions) / 600;
        if (min < 0.12 || max > 0.38) failures.push(`Distribuição de alternativas embaralhadas suspeita: ${positions.join(', ')}`);
      }
      const attention = MF.getModule('attention');
      const memory = MF.getModule('memory');
      if (attention) {
        const families = new Set(attention.questions.map(q => q.taskFamily));
        if (families.size < 4) failures.push(`Atenção deveria ter pelo menos 4 famílias de tarefa; encontrou ${families.size}`);
        const base = attention.questions.find(q => q.dynamic === 'attention-count');
        if (base) {
          const variants = new Set(Array.from({length:8}, () => MF.instantiateQuestion(base).displaySequence));
          if (variants.size < 5) failures.push(`Gerador de atenção produziu pouca variedade: ${variants.size} variantes em 8 amostras`);
        }
        const adjacent = attention.questions.find(q => q.dynamic === 'attention-adjacent');
        if (adjacent) {
          const instance = MF.instantiateQuestion(adjacent);
          const actual = instance.displaySequence.split(/\s+/).slice(1).filter((s,i,a) => s === instance.displaySequence.split(/\s+/)[i]).length;
          if (actual !== instance.answer) failures.push(`Contagem de pares adjacentes não confere: ${adjacent.id}`);
        }
        const position = attention.questions.find(q => q.dynamic === 'attention-position');
        if (position) {
          const instance = MF.instantiateQuestion(position);
          if (instance.options[instance.answer] !== instance.sequence[instance.position - 1]) failures.push(`Gabarito de localização visual não confere: ${position.id}`);
        }
      }
      if (memory) {
        const modes = new Set(memory.questions.map(q => q.memoryMode));
        if (modes.size < 5) failures.push(`Memória deveria ter 5 modos de transformação; encontrou ${modes.size}`);
        for (const source of memory.questions) {
          const q = MF.instantiateQuestion(source);
          if (answerForMemory(q) !== q.answer) failures.push(`Variante procedural de memória inválida: ${source.id}/${q.memoryMode}`);
        }
        const sample = memory.questions[0];
        const variants = new Set(Array.from({length:8}, () => MF.instantiateQuestion(sample).sequence.join('')));
        if (variants.size < 5) failures.push(`Gerador de memória produziu pouca variedade: ${variants.size} variantes em 8 amostras`);
      }
      const result = { ok: failures.length === 0, failures, warnings, questionCount, moduleCount: MF.modules.length, choiceCount, types, overridesApplied: MF.qualityOverridesApplied || 0 };
      return result;
    }
  };
  if (global.location && new URLSearchParams(global.location.search).get('test') === '1') {
    global.addEventListener('DOMContentLoaded', () => {
      const result = MF.Tests.run();
      const panel = global.document.createElement('pre');
      panel.style.cssText = 'position:fixed;z-index:200;left:10px;bottom:10px;max-width:90vw;max-height:48vh;overflow:auto;padding:14px;background:#0c1928;color:#c4f1df;border:1px solid #548b7e;border-radius:10px;font:12px monospace;white-space:pre-wrap';
      panel.textContent = `MIND FORGE TESTS ${result.ok ? 'PASSOU' : 'FALHOU'}\nMódulos: ${result.moduleCount}\nQuestões: ${result.questionCount}\nAlternativas: ${result.choiceCount}\nOverrides editoriais aplicados: ${result.overridesApplied}\nTipos: ${JSON.stringify(result.types)}\n${result.failures.length ? 'FALHAS:\n' + result.failures.join('\n') : 'Nenhuma falha estrutural identificada.'}\n${result.warnings.length ? 'AVISOS:\n' + result.warnings.join('\n') : ''}`;
      global.document.body.appendChild(panel);
    });
  }
})(window);
