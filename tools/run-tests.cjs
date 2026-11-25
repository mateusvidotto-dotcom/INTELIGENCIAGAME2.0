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
  'scripts/modules/creativity.js', 'scripts/modules/mathematics.js', 'scripts/modules/advanced-math-bank.js', 'scripts/modules/critical-thinking.js',
  'scripts/modules/bible.js', 'scripts/modules/science.js', 'scripts/modules/language.js',
  'scripts/modules/strategy.js', 'scripts/modules/interdisciplinary.js', 'scripts/modules/metacognition.js',
  'scripts/core/quality-overrides.js', 'scripts/modules/study-center.js', 'scripts/tests/self-tests.js'
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

const studyPaths = MF.StudyCenter && MF.StudyCenter.paths;
if (!Array.isArray(studyPaths) || studyPaths.length !== 3) {
  console.error('O centro de estudos deve registrar três trilhas prioritárias.'); process.exitCode = 1;
} else {
  const lessonIds = new Set();
  let lessonCount = 0;
  for (const path of studyPaths) {
    if (!Array.isArray(path.lessons) || path.lessons.length < 4) {
      console.error('Trilha sem unidades iniciais suficientes: ' + path.id); process.exitCode = 1;
    }
    for (const lesson of path.lessons || []) {
      lessonCount++;
      if (!lesson.id || lessonIds.has(lesson.id)) {
        console.error('Identificador de aula ausente ou duplicado: ' + lesson.id); process.exitCode = 1;
      }
      lessonIds.add(lesson.id);
      const question = lesson.question;
      if (!question || !['choice','open'].includes(question.type)) {
        console.error('Atividade inválida em ' + lesson.id); process.exitCode = 1;
      } else if (question.type === 'choice' && (!Array.isArray(question.options) || !Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length)) {
        console.error('Gabarito inválido em ' + lesson.id); process.exitCode = 1;
      } else if (question.type === 'open' && (!Array.isArray(question.rubric) || question.rubric.length < 2 || !question.modelAnswer)) {
        console.error('Rubrica ou modelo de resposta ausente em ' + lesson.id); process.exitCode = 1;
      }
    }
  }
  const pigeonholeLesson = studyPaths.find(path => path.id === 'olympiad')?.lessons.find(lesson => lesson.id === 'olymp-pigeonhole-01');
  if (!pigeonholeLesson || !pigeonholeLesson.question.prompt.includes('32 estudantes') || pigeonholeLesson.question.answer !== 0) {
    console.error('O exemplo do princípio da casa dos pombos precisa manter a quantidade correta de objetos e categorias.'); process.exitCode = 1;
  }
  if (!studyPaths.some(path => path.id === 'english') || !studyPaths.some(path => path.id === 'vestibular') || !studyPaths.some(path => path.id === 'olympiad')) {
    console.error('As trilhas de inglês, vestibular e olimpíadas devem estar presentes.'); process.exitCode = 1;
  }
  if (!process.exitCode) console.log('PASSOU: centro de estudos com ' + studyPaths.length + ' trilhas e ' + lessonCount + ' aulas iniciais validadas.');
  const originalStudyProgress = MF.StudyCenter.exportProgress();
  const importedStudyProgress = MF.StudyCenter.importProgress({version:1,completed:{'en-a1-01':true,'unknown-lesson':true}});
  const englishStudyProgress = MF.StudyCenter.progress().english;
  if (!importedStudyProgress || englishStudyProgress.completed !== 1 || englishStudyProgress.percent !== 20) {
    console.error('Importação ou cálculo de progresso das trilhas falhou.'); process.exitCode = 1;
  }
  MF.StudyCenter.importProgress(originalStudyProgress);
  if (!process.exitCode) console.log('PASSOU: exportação, importação e progresso local das trilhas.');

}
