'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

const apiSandbox = { window: {} };
vm.createContext(apiSandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'scripts/core/question-context.js'), 'utf8'), apiSandbox);
const Context = apiSandbox.window.MindForgeQuestionContext;
assert.ok(Context, 'Question Context API deve ser carregada.');

const bankSandbox = { window: {} };
vm.createContext(bankSandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'question-bank.js'), 'utf8'), bankSandbox, { timeout: 10000 });
vm.runInContext(fs.readFileSync(path.join(root, 'portuguese-forge.js'), 'utf8'), bankSandbox, { timeout: 10000 });
const bank = bankSandbox.window.MIND_FORGE_BANK;
assert.ok(bank && Array.isArray(bank.units) && bank.units.length > 0, 'Banco público deve ser carregado.');
assert.equal(bankSandbox.window.MindForgePortuguese.counts().units, 7, 'Portuguese Forge deve adicionar sete unidades avançadas.');
assert.equal(bankSandbox.window.MindForgePortuguese.counts().questions, 22, 'Portuguese Forge deve adicionar 22 questões contextualizadas.');
const missing = Context.audit(bank.units);
assert.deepEqual(JSON.parse(JSON.stringify(missing)), [], 'Nenhuma questão dependente de estímulo pode ficar sem material.');

const mobility = bank.units.find(unit => unit.id === 'en1-texto-mobilidade');
assert.ok(mobility && mobility.passage.includes('Calçadas contínuas'), 'Texto de mobilidade deve permanecer no banco.');
const mobilityQuestion = mobility.q[0];
assert.equal(Context.inspect(mobility, mobilityQuestion).available, true);
assert.ok(Context.render(mobility, mobilityQuestion).includes('Calçadas contínuas'), 'Texto integral de mobilidade deve ser renderizável.');

const population = bank.units.find(unit => unit.id === 'pas3-matematica-exponencial');
assert.ok(population && population.passage.includes('N(t)=500·2^(t/3)'), 'Modelo populacional precisa estar no estímulo.');
assert.ok(Context.render(population, population.q[1]).includes('N(t)=500·2^(t/3)'), 'O modelo deve aparecer ao resolver a questão de 2.000 indivíduos.');

const unsupported = { id: 'missing', q: [['De acordo com o texto, qual conclusão é válida?', ['A', 'B'], 0, 'x']] };
assert.equal(Context.inspect(unsupported, unsupported.q[0]).blocked, true, 'Questão sem texto necessário deve ser bloqueada.');
assert.match(Context.render(unsupported, unsupported.q[0]), /Questão indisponível/);

const rich = {
  id: 'rich',
  stimulus: {
    title: 'Dados didáticos simulados',
    author: 'Exemplo autoral para teste',
    sections: [
      { type: 'text', title: 'Descrição', content: 'Levantamento hipotético de uma turma.' },
      { type: 'formula', title: 'Fórmula', expression: 'v = Δs / Δt' },
      { type: 'table', caption: 'Tabela de resultados', headers: ['Grupo', 'Valor'], rows: [['A', '12'], ['B', '18']] },
      { type: 'chart', chartType: 'bar', caption: 'Comparação', data: [{ label: 'A', value: 12 }, { label: 'B', value: 18 }] },
      { type: 'image', src: './assets/example.webp', alt: 'Diagrama de teste', caption: 'Imagem de apoio' }
    ]
  },
  q: []
};
const markup = Context.render(rich, null);
for (const fragment of ['Dados didáticos simulados', 'v = Δs / Δt', 'Tabela de resultados', 'qc-bars', './assets/example.webp']) {
  assert.ok(markup.includes(fragment), 'Renderização contextual deve incluir: ' + fragment);
}
const unsafe = { passage: 'Texto <img src=x onerror=alert(1)> seguro', authored: true, q: [] };
assert.ok(Context.render(unsafe, null).includes('&lt;img'), 'Texto-base deve escapar HTML.');
const remoteImage = { stimulus: { sections: [{ type: 'image', src: 'https://example.com/image.png', alt: 'externa' }] }, q: [] };
assert.ok(!Context.render(remoteImage, null).includes('https://example.com'), 'Imagens externas incompatíveis com CSP devem ser rejeitadas.');
const portugueseIds = ['pt-inferencia-pressupostos','pt-argumentacao-evidencia','pt-falacias-causalidade','pt-coesao-referencia','pt-generos-ironia','pt-leitura-multimodal','pt-redacao-planejamento'];
for (const id of portugueseIds) assert.ok(bank.byId[id], 'Unidade portuguesa deve estar no banco: ' + id);
const multimodal = bank.byId['pt-leitura-multimodal'];
assert.ok(Context.render(multimodal, multimodal.q[0]).includes('42%'), 'Tabela multimodal precisa aparecer na questão correspondente.');
assert.ok(multimodal.q.every(q => Context.inspect(multimodal, q).available), 'Todas as questões multimodais devem encontrar seu estímulo.');

const prompts = [
  'Segundo o autor, qual argumento é central?',
  'Com base no gráfico, qual valor é maior?',
  'Observando a tabela, qual tendência aparece?',
  'Considerando os dados, qual hipótese é compatível?',
  'A partir do experimento, o que se pode concluir?',
  'Segundo o modelo, quando a população dobra?'
];
for (const prompt of prompts) assert.equal(Context.requiresStimulus([prompt]), true, 'Dependência precisa ser detectada: ' + prompt);


const publicSite = fs.readFileSync(path.join(root, 'scripts/site.js'), 'utf8');
assert.ok(publicSite.includes('contextSystem.render(source,q)'), 'Tela da questão deve renderizar o estímulo da unidade ativa.');
assert.ok(publicSite.includes('sessionSourceIds=chosen.map(x=>x.lessonId)'), 'Simulado deve conservar a unidade-fonte de cada questão.');
assert.ok(publicSite.includes('data-review-attempt'), 'Caderno de erros deve permitir reabrir a questão específica.');
assert.ok(publicSite.includes('hintIndex>0'), 'Pistas graduais devem ser exibidas apenas após solicitação.');

console.log('PASSOU: ' + bank.units.length + ' unidades públicas auditadas, incluindo 7 unidades de Português e 22 novas questões; mobilidade, modelo populacional, bloqueio de contexto ausente, texto seguro, fórmula, tabela, gráfico e imagem validados.');
