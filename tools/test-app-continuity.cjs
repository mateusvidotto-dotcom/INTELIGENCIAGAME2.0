'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

async function main() {
  const root = path.resolve(__dirname, '..');
  const handlers = Object.create(null);
  let skipWaitingCalls = 0;
  let claimed = 0;
  let cachedFiles = [];
  const self = {
    location: { origin: 'https://example.test' },
    clients: { claim() { claimed++; return Promise.resolve(); } },
    addEventListener(name, callback) { handlers[name] = callback; },
    skipWaiting() { skipWaitingCalls++; return Promise.resolve(); }
  };
  const caches = {
    async open(name) {
      assert.equal(name, 'mind-forge-shell-v11');
      return { async addAll(files) { cachedFiles = files.slice(); } };
    },
    async keys() { return []; },
    async delete() { return true; },
    async match() { return null; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8'), {
    self, caches, URL, Promise, fetch: async () => ({ ok: true })
  });

  assert.equal(typeof handlers.install, 'function', 'service worker precisa registrar instalação');
  let installWork;
  handlers.install({ waitUntil(promise) { installWork = promise; } });
  await installWork;
  assert.equal(skipWaitingCalls, 0, 'nova versão não pode substituir a sessão ativa automaticamente');
  assert.ok(cachedFiles.includes('./portuguese-forge.js'));
  assert.ok(cachedFiles.includes('./scripts/core/question-context.js'));
  assert.ok(cachedFiles.includes('./scripts/site.js'));

  let messageWork;
  handlers.message({
    data: { type: 'SKIP_WAITING' },
    waitUntil(promise) { messageWork = promise; }
  });
  await messageWork;
  assert.equal(skipWaitingCalls, 1, 'a ativação antecipada deve acontecer somente após a ação explícita');

  const site = fs.readFileSync(path.join(root, 'scripts/site.js'), 'utf8');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(site.includes('showPwaUpdate'), 'o frontend deve anunciar uma nova versão pronta');
  assert.ok(site.includes('pwaUpdateAccepted'), 'o frontend deve aguardar o aceite antes de recarregar');
  assert.ok(site.includes('registration.waiting.postMessage({type:"SKIP_WAITING"})'), 'o botão deve enviar a autorização ao worker');
  assert.ok(site.includes('stimulusText'), 'o Tutor deve receber o estímulo original da questão');
  assert.ok(site.includes('setAmbientVolume'), 'o controle de volume deve estar conectado');
  assert.ok(site.includes('mfo:preferences:ambient-volume'), 'o volume deve persistir neste aparelho');
  assert.ok(html.includes('id="app-update-notice"') && html.includes('id="update-app-now"'), 'o aviso de atualização deve estar disponível na interface');
  assert.ok(site.includes('id==="dismiss-app-update"'), 'o aviso pode ser dispensado sem atualizar');
  assert.ok(site.includes('id==="mfo-music-volume"'), 'o slider de volume deve ser operável');

  console.log('PASSOU: PWA v11 espera aceite do estudante, mantém shell de conteúdo, Tutor recebe estímulo, música oferece volume local e aviso de atualização dispensável.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
