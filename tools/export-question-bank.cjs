#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, '.question-bank.audit.json'));
const context = {
  console,
  Math,
  Date,
  Set,
  Map,
  Array,
  Object,
  String,
  Number,
  JSON,
  RegExp,
  URLSearchParams,
  location: { search: '' },
  addEventListener() {}
};
context.window = context;
vm.createContext(context);

const files = [
  'scripts/core/module-registry.js',
  'scripts/modules/logic.js',
  'scripts/modules/attention.js',
  'scripts/modules/memory.js',
  'scripts/modules/creativity.js',
  'scripts/modules/mathematics.js',
  'scripts/modules/critical-thinking.js',
  'scripts/modules/bible.js',
  'scripts/modules/science.js',
  'scripts/modules/language.js',
  'scripts/modules/strategy.js',
  'scripts/modules/interdisciplinary.js',
  'scripts/modules/metacognition.js',
  'scripts/core/quality-overrides.js'
];
for (const relative of files) {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) throw new Error(`Arquivo necessário não encontrado: ${relative}`);
  vm.runInContext(fs.readFileSync(full, 'utf8'), context, { filename: relative, timeout: 5000 });
}
const MF = context.MindForge;
const payload = {
  app: 'Mind Forge Omega',
  schemaVersion: 1,
  exportedAt: new Date().toISOString(),
  qualityOverridesApplied: MF.qualityOverridesApplied || 0,
  modules: MF.modules
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`Banco exportado: ${MF.modules.length} módulos; ${MF.modules.reduce((sum, module) => sum + module.questions.length, 0)} questões; ${payload.qualityOverridesApplied} conjuntos de distratores revisados.`);
console.log(`Arquivo de auditoria: ${output}`);
