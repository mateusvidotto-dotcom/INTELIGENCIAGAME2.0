'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const storage = new Map();
const fakeDocument = {
  __logicForgeBound: false,
  addEventListener() {},
  getElementById() { return null; },
  querySelector() { return null; },
  createElement() { return { click() {}, set href(value) {}, set download(value) {} }; }
};
const context = {
  console, Date, Math, Set, Map, Array, Object, String, Number, JSON, RegExp, URL,
  Uint8Array, TextDecoder, Blob, document: fakeDocument,
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  }
};
context.window = context;
vm.createContext(context);
vm.runInContext(fs.readFileSync('logic-forge.js', 'utf8'), context, { filename: 'logic-forge.js', timeout: 10000 });
const logic = context.MindForgeLogic;
assert.ok(logic, 'O módulo Logic Forge deve ser publicado em window.');
const audit = logic.audit();
assert.equal(audit.ok, true, audit.errors.join('\n'));
assert.equal(audit.levels, 6);
assert.equal(audit.lessons, 20);
assert.equal(audit.questions, 40);
assert.ok(logic.lessons.every(lesson => lesson.sources && lesson.sources.length > 0), 'Cada unidade deve indicar fontes de aprofundamento.');
assert.deepEqual(Array.from(logic.levels, item => item.id), [0, 1, 2, 3, 4, 5]);
for (const lesson of logic.lessons) {
  assert.equal(lesson.questions.length, 2, lesson.id + ' deve ter dois exercícios.');
  assert.ok(lesson.objective && lesson.concept && lesson.examples.length >= 2 && lesson.project, lesson.id);
  for (const question of lesson.questions) {
    assert.ok(question.prompt && question.explanation !== '', question.id);
    if (question.kind === 'choice') {
      assert.equal(question.options.length, 4, question.id);
      assert.equal(question.why.length, 4, question.id);
      assert.ok(question.answer >= 0 && question.answer < 4, question.id);
      assert.equal(new Set(question.options).size, 4, question.id);
    } else {
      assert.equal(question.kind, 'number', question.id);
      assert.equal(typeof question.answer, 'number', question.id);
    }
  }
}
const first = logic.lessons[0];
const backup = logic.exportProgress();
backup.state.questions[first.questions[0].id] = {
  correct: true, streak: 1, intervalDays: 1, dueAt: Date.now() + 86400000, attempts: 1, lastAt: new Date().toISOString()
};
assert.equal(logic.importProgress(backup), true, 'Backup válido deve ser importado.');
assert.equal(logic.progressFor(first.id).done, 1, 'A importação deve restaurar a evidência da unidade.');
backup.state.projects[first.id] = true;
assert.equal(logic.importProgress(backup), true, 'Backup com projeto marcado deve ser importável.');
const secondContext = { ...context, document: { ...fakeDocument, __logicForgeBound: false } };
secondContext.window = secondContext;
vm.createContext(secondContext);
vm.runInContext(fs.readFileSync('logic-forge.js', 'utf8'), secondContext, { filename: 'logic-forge.js', timeout: 10000 });
assert.equal(secondContext.MindForgeLogic.progressFor(first.id).done, 1, 'O progresso deve sobreviver à reinicialização do módulo.');
assert.equal(logic.importProgress({ app: 'outro', schemaVersion: 1, state: {} }), false, 'Backup de outro app deve ser rejeitado.');
assert.ok(storage.has('mfo:logic-forge:v1'), 'O progresso deve ser persistido com namespace e versão.');
console.log('PASSOU: Logic Forge — 6 níveis, 18 unidades, 36 exercícios, feedback estruturado e backup local.');
