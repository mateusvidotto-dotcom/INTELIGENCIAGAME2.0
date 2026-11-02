(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  const KEY = 'mind-forge-python-core-url';
  const API_PREFIX = '/api/v1';
  let configuredBase = '';

  function cleanBase(value) {
    const raw = String(value || '').trim().replace(/\/+$/, '');
    if (!raw) return '';
    let parsed;
    try { parsed = new URL(raw); } catch (_) { throw new Error('Informe uma URL completa, incluindo http:// ou https://.'); }
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('A API deve usar HTTP ou HTTPS.');
    if (parsed.username || parsed.password) throw new Error('Não inclua credenciais na URL.');
    return parsed.origin + parsed.pathname.replace(/\/+$/, '');
  }

  function savedBase() {
    if (configuredBase) return configuredBase;
    try { configuredBase = cleanBase(global.localStorage.getItem(KEY) || ''); }
    catch (_) { configuredBase = ''; }
    return configuredBase;
  }

  function configure(value) {
    const base = cleanBase(value);
    configuredBase = base;
    try {
      if (base) global.localStorage.setItem(KEY, base);
      else global.localStorage.removeItem(KEY);
    } catch (_) { /* O cliente permanece funcional apenas nesta sessão. */ }
    return base;
  }

  async function request(path, options) {
    const base = savedBase();
    if (!base) throw new Error('Configure o endereço da API Python primeiro.');
    const controller = new AbortController();
    const timeout = global.setTimeout(() => controller.abort(), 8000);
    try {
      const response = await global.fetch(base + path, {
        ...options,
        signal: controller.signal,
        headers: { 'Accept':'application/json', ...(options && options.body ? {'Content-Type':'application/json'} : {}), ...(options && options.headers || {}) }
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = typeof body.detail === 'string' ? body.detail : body.detail && body.detail.message;
        throw new Error(detail || `A API respondeu com HTTP ${response.status}.`);
      }
      return body;
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('A API não respondeu dentro de 8 segundos.');
      if (error instanceof TypeError) throw new Error('Não foi possível conectar. Confira o servidor e a configuração CORS.');
      throw error;
    } finally {
      global.clearTimeout(timeout);
    }
  }

  MF.PythonCore = {
    key: KEY,
    getBase: savedBase,
    configure,
    isConfigured: () => Boolean(savedBase()),
    health: () => request('/api/health'),
    curriculum: () => request(API_PREFIX + '/curriculum'),
    generate: payload => request(API_PREFIX + '/exercises/generate', {method:'POST', body:JSON.stringify(payload)}),
    hint: (id, step) => request(API_PREFIX + `/exercises/${encodeURIComponent(id)}/hint?step=${step}`),
    answer: (id, payload) => request(API_PREFIX + `/exercises/${encodeURIComponent(id)}/answer`, {method:'POST', body:JSON.stringify(payload)}),
    recordFrontendAttempt: payload => request(API_PREFIX + '/attempts', {method:'POST', body:JSON.stringify(payload)}),
    recommendations: () => request(API_PREFIX + '/recommendations'),
    analytics: () => request(API_PREFIX + '/analytics/competencies'),
    reviews: dueOnly => request(API_PREFIX + '/reviews' + (dueOnly ? '?due_only=true' : '')),
    diagnosticStart: () => request(API_PREFIX + '/diagnostic/start', {method:'POST'}),
    diagnosticNext: id => request(API_PREFIX + `/diagnostic/${encodeURIComponent(id)}/next`),
    diagnosticAnswer: (id, payload) => request(API_PREFIX + `/diagnostic/${encodeURIComponent(id)}/answer`, {method:'POST', body:JSON.stringify(payload)})
  };
})(window);
