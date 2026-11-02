(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  MF.Review = {
    add(question, moduleId, correct, hintUsed) {
      const list = MF.state.reviewItems;
      let item = list.find(entry => entry.id === question.id);
      const now = Date.now();
      if (!item) {
        item = { id: question.id, moduleId, question: JSON.parse(JSON.stringify(question)), status: 'due', repetitions: 0, misses: 0, dueAt: now, lastReviewedAt: null, intervalDays: 0 };
        list.push(item);
      }
      item.question = JSON.parse(JSON.stringify(question));
      if (correct && !hintUsed) {
        item.repetitions = (item.repetitions || 0) + 1;
        item.lastReviewedAt = now;
        if (item.repetitions >= 2) {
          item.status = 'mastered';
          item.intervalDays = Math.min(30, Math.max(3, (item.intervalDays || 1) * 2));
          item.dueAt = now + item.intervalDays * 86400000;
          if (!MF.state.masteredIds.includes(item.id)) MF.state.masteredIds.push(item.id);
        } else {
          item.status = 'scheduled';
          item.intervalDays = 1;
          item.dueAt = now + 86400000;
        }
      } else {
        item.misses = (item.misses || 0) + 1;
        item.status = 'due';
        item.intervalDays = 0;
        item.dueAt = now;
        MF.state.masteredIds = MF.state.masteredIds.filter(id => id !== item.id);
      }
      MF.state.reviewItems = list.slice(-500);
      MF.save();
    },
    dueItems(includeScheduled) {
      const now = Date.now();
      return MF.state.reviewItems.filter(item => item.status !== 'mastered' && (item.dueAt <= now || includeScheduled)).sort((a, b) => a.dueAt - b.dueAt);
    },
    allItems() { return MF.state.reviewItems.slice().sort((a, b) => a.dueAt - b.dueAt); },
    masteredCount() { return MF.state.reviewItems.filter(item => item.status === 'mastered').length; },
    unresolvedCount() { return MF.state.reviewItems.filter(item => item.status !== 'mastered').length; },
    findQuestion(id) {
      for (const module of MF.modules) {
        const question = (module.questions || []).find(q => q.id === id);
        if (question) return question;
      }
      const item = MF.state.reviewItems.find(entry => entry.id === id);
      return item ? item.question : null;
    }
  };
})(window);
