(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  const STORAGE_KEY = 'mind-forge-omega-save';
  let memoryFallback = null;

  const safeClone = value => JSON.parse(JSON.stringify(value));
  MF.Storage = {
    key: STORAGE_KEY,
    load() {
      try {
        const raw = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || !parsed.stateVersion) return null;
        return parsed;
      } catch (error) {
        console.warn('[Mind Forge] Não foi possível ler o progresso salvo:', error);
        return memoryFallback ? safeClone(memoryFallback) : null;
      }
    },
    save(state) {
      const payload = { stateVersion: 1, savedAt: new Date().toISOString(), state: state };
      memoryFallback = safeClone(payload);
      try {
        if (!global.localStorage) return { ok: false, reason: 'unavailable' };
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return { ok: true };
      } catch (error) {
        console.warn('[Mind Forge] O navegador não permitiu salvar no armazenamento local:', error);
        return { ok: false, reason: 'blocked' };
      }
    },
    clear() {
      memoryFallback = null;
      try { if (global.localStorage) global.localStorage.removeItem(STORAGE_KEY); return true; }
      catch (error) { console.warn('[Mind Forge] Não foi possível limpar o armazenamento:', error); return false; }
    },
    export(state) {
      return JSON.stringify({ app: 'Mind Forge Omega', schemaVersion: 1, exportedAt: new Date().toISOString(), state }, null, 2);
    },
    validateImport(parsed) {
      if (!parsed || typeof parsed !== 'object' || parsed.app !== 'Mind Forge Omega' || parsed.schemaVersion !== 1 || !parsed.state || typeof parsed.state !== 'object') {
        return { ok: false, reason: 'Arquivo inválido ou incompatível com esta versão do jogo.' };
      }
      const s = parsed.state;
      if (!Number.isFinite(s.xp) || s.xp < 0 || !s.stats || !Array.isArray(s.history) || !s.byModule || typeof s.byModule !== 'object') {
        return { ok: false, reason: 'O backup não contém uma estrutura de progresso válida.' };
      }
      if (!Array.isArray(s.reviewItems) || !s.settings || typeof s.settings !== 'object') {
        return { ok: false, reason: 'O backup está incompleto e não pode ser importado com segurança.' };
      }
      return { ok: true };
    }
  };
})(window);
