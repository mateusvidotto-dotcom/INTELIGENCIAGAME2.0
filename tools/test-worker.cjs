'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const workerSource = fs.readFileSync('worker/src/index.js', 'utf8')
  .replace('export default {', 'globalThis.MindForgeTutor = {');
let upstreamCalls = 0;
let upstreamPayload = null;
const sandbox = {
  URL, Response, Request, Headers, TextDecoder, Uint8Array, AbortController,
  setTimeout, clearTimeout, JSON, console,
  fetch: async (url, options) => {
    upstreamCalls += 1;
    upstreamPayload = JSON.parse(options.body);
    return new Response(JSON.stringify({
      output: [{ content: [{ type: 'output_text', text: 'Vamos resolver passo a passo.' }] }]
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};
vm.createContext(sandbox);
vm.runInContext(workerSource, sandbox, { filename: 'worker/src/index.js', timeout: 10000 });
const app = sandbox.MindForgeTutor;
const origin = 'https://mateusvidotto-dotcom.github.io';
const env = { SITE_ORIGIN: origin, OPENAI_API_KEY: 'test-secret', OPENAI_MODEL: 'test-model' };

async function request(path, options = {}, envOverride = env, requestOrigin = origin) {
  const headers = new Headers(options.headers || {});
  headers.set('Origin', requestOrigin);
  return app.fetch(new Request('https://worker.example' + path, { ...options, headers }), envOverride);
}

(async () => {
  let response = await request('/health', { method: 'GET' });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);

  response = await request('/health', { method: 'GET' }, env, 'https://attacker.example');
  assert.equal(response.status, 403);

  response = await request('/api/tutor', { method: 'GET' });
  assert.equal(response.status, 404);

  response = await request('/api/tutor', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: 'teste' });
  assert.equal(response.status, 415);

  response = await request('/api/tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad json' });
  assert.equal(response.status, 400);

  response = await request('/api/tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: 'oi' }) }, { SITE_ORIGIN: origin });
  assert.equal(response.status, 503);

  const tooLong = JSON.stringify({ question: 'x'.repeat(13000) });
  response = await request('/api/tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: tooLong });
  assert.equal(response.status, 413);
  assert.equal(upstreamCalls, 0);

  response = await request('/api/tutor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'Explique uma função.', area: 'Programação', history: [{ role: 'user', content: 'Contexto anterior' }] })
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).answer, 'Vamos resolver passo a passo.');
  assert.equal(upstreamCalls, 1);
  assert.equal(upstreamPayload.store, false);
  assert.equal(upstreamPayload.model, 'test-model');
  assert.ok(upstreamPayload.instructions.includes('conteúdo não confiável'));

  response = await request('/api/tutor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'mais uma' })
  }, {
    ...env,
    TUTOR_RATE_LIMITER: { async limit() { return { success: false }; } }
  });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
  assert.equal(upstreamCalls, 1, 'A requisição bloqueada não deve chegar ao provedor.');

  console.log('PASSOU: Tutor Worker — CORS, rotas, JSON, limite de corpo, segredo, timeout configurado e rate limit opcional.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
