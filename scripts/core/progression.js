(function (global) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  const LEVELS = [
    { level: 1, name: 'Iniciação', threshold: 0 }, { level: 2, name: 'Fundamentos', threshold: 100 },
    { level: 3, name: 'Intermediário', threshold: 250 }, { level: 4, name: 'Avançado', threshold: 450 },
    { level: 5, name: 'Especialista', threshold: 700 }, { level: 6, name: 'Mestre', threshold: 1000 },
    { level: 7, name: 'Elite', threshold: 1400 }, { level: 8, name: 'Omega', threshold: 1850 },
    { level: 9, name: 'Extraordinário', threshold: 2400 }
  ];
  const defaultState = () => ({
    version: 1, xp: 0, sessions: 0, lastPlayedDate: null, activeDays: [],
    stats: { answered: 0, correct: 0, firstAttempts: 0, firstTryCorrect: 0, hintsUsed: 0, confidenceTotal: 0, confidenceCount: 0, reviewCompleted: 0 },
    byModule: {}, history: [], reviewItems: [], masteredIds: [], achievements: [], campaign: { stagesCompleted: [] },
    reflections: [], activeSession: null, settings: { noTimer: true, confidence: true, reducedMotion: false, difficulty: 1, sessionLength: 5 }
  });
  const mergeSafe = (base, incoming) => {
    if (!incoming || typeof incoming !== 'object') return base;
    const out = Array.isArray(base) ? base.slice() : { ...base };
    Object.keys(base).forEach(key => {
      if (incoming[key] === undefined) return;
      if (Array.isArray(base[key])) out[key] = Array.isArray(incoming[key]) ? incoming[key].slice() : base[key];
      else if (base[key] && typeof base[key] === 'object') {
        if (!Array.isArray(base[key]) && Object.keys(base[key]).length === 0 && incoming[key] && typeof incoming[key] === 'object' && !Array.isArray(incoming[key])) out[key] = JSON.parse(JSON.stringify(incoming[key]));
        else out[key] = mergeSafe(base[key], incoming[key]);
      }
      else if (typeof incoming[key] === typeof base[key] || (typeof base[key] === 'number' && Number.isFinite(incoming[key]))) out[key] = incoming[key];
    });
    return out;
  };
  const loaded = MF.Storage.load();
  MF.state = mergeSafe(defaultState(), loaded && loaded.state ? loaded.state : null);
  if (!Array.isArray(MF.state.activeDays)) MF.state.activeDays = [];
  if (!Array.isArray(MF.state.history)) MF.state.history = [];
  if (!Array.isArray(MF.state.reviewItems)) MF.state.reviewItems = [];
  MF.LEVELS = LEVELS;
  MF.defaultState = defaultState;
  MF.normalizeState = incoming => mergeSafe(defaultState(), incoming);
  MF.levelInfo = function (xp) {
    const total = Math.max(0, Number(xp) || 0);
    let current = LEVELS[0], next = null;
    for (let i = 0; i < LEVELS.length; i++) {
      if (total >= LEVELS[i].threshold) current = LEVELS[i];
      else { next = LEVELS[i]; break; }
    }
    if (!next) return { ...current, next: null, into: total - current.threshold, span: 0, percent: 100 };
    const span = next.threshold - current.threshold;
    const into = total - current.threshold;
    return { ...current, next, into, span, percent: Math.max(0, Math.min(100, Math.round((into / span) * 100))) };
  };
  MF.save = function () { return MF.Storage.save(MF.state); };
  MF.today = function () { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  MF.markActiveDay = function () {
    const today = MF.today();
    if (!MF.state.activeDays.includes(today)) MF.state.activeDays.push(today);
    MF.state.activeDays = MF.state.activeDays.slice(-365);
    MF.state.lastPlayedDate = today;
  };
  MF.moduleStats = function (moduleId) {
    return MF.state.byModule[moduleId] || { answered: 0, correct: 0, firstTryCorrect: 0, hints: 0, streak: 0, bestStreak: 0, recent: [] };
  };
  MF.recordAttempt = function (data) {
    const { question, moduleId, correct, firstTry, hintUsed, confidence, mode, userAnswer } = data;
    const today = MF.today();
    MF.markActiveDay();
    const s = MF.state.stats;
    s.answered += 1;
    if (correct) s.correct += 1;
    if (firstTry) s.firstAttempts = (s.firstAttempts || 0) + 1;
    if (correct && firstTry && !hintUsed) s.firstTryCorrect += 1;
    if (hintUsed) s.hintsUsed += 1;
    if (Number.isFinite(confidence)) { s.confidenceTotal += confidence; s.confidenceCount += 1; }
    const m = MF.state.byModule[moduleId] || (MF.state.byModule[moduleId] = { answered: 0, correct: 0, firstTryCorrect: 0, hints: 0, streak: 0, bestStreak: 0, recent: [] });
    m.answered += 1;
    if (correct) { m.correct += 1; m.streak += 1; m.bestStreak = Math.max(m.bestStreak || 0, m.streak); }
    else { m.streak = 0; }
    if (correct && firstTry && !hintUsed) m.firstTryCorrect += 1;
    if (hintUsed) m.hints += 1;
    m.recent = (m.recent || []).concat([{ correct: !!correct, date: today }]).slice(-12);
    const entry = {
      id: 'attempt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      questionId: question.id, moduleId, title: question.shortTitle || question.prompt,
      correct: !!correct, firstTry: !!firstTry, hintUsed: !!hintUsed,
      confidence: Number.isFinite(confidence) ? confidence : null, date: new Date().toISOString(), mode: mode || 'free',
      difficulty: question.level || 1, userAnswer: String(userAnswer == null ? '' : userAnswer).slice(0, 600),
      explanation: question.explanation || '', reference: question.reference || ''
    };
    MF.state.history.unshift(entry);
    MF.state.history = MF.state.history.slice(0, 250);
    let xpGain = 0;
    if (correct) xpGain = Math.max(4, 8 + (question.level || 1) * 2 - (hintUsed ? 3 : 0) - (!firstTry ? 2 : 0));
    MF.state.xp += xpGain;
    MF.updateAchievements();
    MF.save();
    return { entry, xpGain, level: MF.levelInfo(MF.state.xp) };
  };
  MF.updateAchievements = function () {
    const achievements = new Set(MF.state.achievements || []);
    if (MF.state.stats.answered >= 1) achievements.add('first-step');
    if (MF.state.stats.answered >= 10) achievements.add('ten-attempts');
    if (MF.state.stats.correct >= 10) achievements.add('ten-correct');
    if (Object.keys(MF.state.byModule).filter(id => MF.state.byModule[id].answered > 0).length >= 5) achievements.add('wide-explorer');
    if ((MF.state.reviewItems || []).some(item => item.status === 'mastered')) achievements.add('returning-scholar');
    if (MF.state.campaign.stagesCompleted.length >= 5) achievements.add('omega-expedition');
    MF.state.achievements = Array.from(achievements);
  };
  MF.completeSession = function (session) {
    MF.state.sessions += 1;
    if (session && session.mode === 'campaign' && session.results && session.results.length) {
      session.results.forEach((result, index) => {
        if (result.correct) {
          const stageId = result.question.stageId || ('stage-' + (index + 1));
          if (!MF.state.campaign.stagesCompleted.includes(stageId)) MF.state.campaign.stagesCompleted.push(stageId);
        }
      });
    }
    MF.updateAchievements(); MF.save();
  };
  MF.reset = function () { MF.state = defaultState(); MF.Storage.clear(); MF.save(); };
})(window);
