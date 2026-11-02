#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const storage = new Map();
const localStorage = {
  getItem(key) { return storage.has(key) ? storage.get(key) : null; },
  setItem(key, value) { storage.set(key, String(value)); },
  removeItem(key) { storage.delete(key); }
};
const context = { console, Math, Date, Set, Map, Array, Object, String, Number, JSON, RegExp, URLSearchParams,
  localStorage, location: { search: '' }, addEventListener() {}, setTimeout, clearTimeout };
context.window = context;
vm.createContext(context);
const files = [
  'scripts/core/storage.js', 'scripts/core/progression.js', 'scripts/core/adaptive-engine.js',
  'scripts/core/review-system.js', 'scripts/core/module-registry.js',
  'scripts/modules/logic.js', 'scripts/modules/attention.js', 'scripts/modules/memory.js',
  'scripts/modules/creativity.js', 'scripts/modules/mathematics.js', 'scripts/modules/critical-thinking.js',
  'scripts/modules/bible.js', 'scripts/modules/science.js', 'scripts/modules/language.js',
  'scripts/modules/strategy.js', 'scripts/modules/interdisciplinary.js', 'scripts/modules/metacognition.js',
  'scripts/core/quality-overrides.js', 'scripts/tests/self-tests.js'
];
for (const file of files) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'), context, { filename:file, timeout: 5000 });
const MF = context.MindForge;
const result = MF.Tests.run();
if (!result.ok) {
  console.error('Falhas de conteúdo:'); result.failures.forEach(item => console.error(' - ' + item)); process.exitCode = 1;
} else {
  console.log(`PASSOU: ${result.moduleCount} módulos, ${result.questionCount} questões, ${result.choiceCount} questões objetivas, ${result.overridesApplied} conjuntos de distratores revisados.`);
}
// Exercise real state, persistence, scoring, review and adaptive selection.
const q = MF.getModule('logic').questions.find(item => item.type === 'choice');
const beforeXp = MF.state.xp;
MF.recordAttempt({ question:q, moduleId:q.moduleId, correct:true, firstTry:true, hintUsed:false, confidence:4, mode:'test', userAnswer:q.options[q.answer] });
if (MF.state.xp <= beforeXp) { console.error('XP não aumentou após uma resposta correta.'); process.exitCode = 1; }
if (!localStorage.getItem(MF.Storage.key)) { console.error('Progresso não foi salvo no storage de teste.'); process.exitCode = 1; }
MF.Review.add(q, q.moduleId, false, false);
if (!MF.state.reviewItems.some(item => item.id === q.id)) { console.error('A questão não entrou na fila de revisão.'); process.exitCode = 1; }
const picked = MF.Adaptive.pick(MF.getModule('attention').questions, 'attention', {level:5});
const firstFive = picked.slice(0,5).map(item => item.taskFamily);
if (new Set(firstFive).size < 3) { console.error('Seleção adaptativa não diversificou famílias de tarefa o suficiente.'); process.exitCode = 1; }
if (process.exitCode) process.exit();
console.log('PASSOU: pontuação, persistência, revisão e diversidade adaptativa.');
