(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  function shuffle(items) {
    const out = items.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  MF.Adaptive = {
    recommendedLevel(moduleId) {
      const stats = MF.moduleStats(moduleId);
      const configured = Math.max(1, Math.min(9, Number(MF.state.settings.difficulty) || 1));
      if (!stats.answered || !stats.recent || stats.recent.length < 5) return configured;
      const recent = stats.recent.slice(-8);
      const rate = recent.filter(item => item.correct).length / recent.length;
      const hints = MF.state.history.filter(item => item.moduleId === moduleId).slice(0, 8).filter(item => item.hintUsed).length;
      const lastLevel = this.lastObservedLevel(moduleId);
      if (recent.length >= 5 && rate >= 0.85 && hints <= 2) return Math.min(9, Math.max(configured, lastLevel + 1));
      if (rate <= 0.4) return Math.max(1, Math.min(configured, lastLevel - 1 || 1));
      return Math.max(1, Math.min(9, lastLevel || configured));
    },
    lastObservedLevel(moduleId) {
      const attempt = MF.state.history.find(entry => entry.moduleId === moduleId && Number.isInteger(entry.difficulty));
      return attempt ? Number(attempt.difficulty) || 1 : Number(MF.state.settings.difficulty) || 1;
    },
    pick(questions, moduleId, opts) {
      const options = opts || {};
      let pool = questions.slice();
      if (options.review) return pool;
      const level = Math.max(1, Math.min(9, Number(options.level) || this.recommendedLevel(moduleId)));
      const within = pool.filter(q => (q.level || 1) <= Math.min(9, level + 1) && (q.level || 1) >= Math.max(1, level - 2));
      if (within.length) pool = within;
      const recentWindow = MF.state.history.filter(h => h.moduleId === moduleId).slice(0, 12);
      const recentIds = new Set(recentWindow.map(h => h.questionId));
      const fresh = pool.filter(q => !recentIds.has(q.id));
      if (fresh.length >= Math.min(3, pool.length)) pool = fresh;
      // First pass interleaves task families (e.g., count, position, relation),
      // so a session is less likely to contain several mechanically identical tasks.
      const randomized = shuffle(pool);
      const buckets = new Map();
      randomized.forEach(q => {
        const family = q.taskFamily || `${q.type}:${(q.tags || []).slice(0, 1).join('') || 'general'}`;
        if (!buckets.has(family)) buckets.set(family, []);
        buckets.get(family).push(q);
      });
      const families = shuffle(Array.from(buckets.keys()));
      const ordered = [];
      while (ordered.length < randomized.length) {
        let added = false;
        for (const family of families) {
          const items = buckets.get(family);
          if (items && items.length) { ordered.push(items.shift()); added = true; }
        }
        if (!added) break;
        // Rotate family order between rounds without relying on an invalid random comparator.
        const offset = families.length ? Math.floor(Math.random() * families.length) : 0;
        if (offset) families.push(...families.splice(0, offset));
      }
      return ordered;
    }
  };
})(window);
