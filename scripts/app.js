(function (global, document) {
  'use strict';
  const MF = global.MindForge;
  if (!MF || !MF.modules || !MF.modules.length) throw new Error('O banco de módulos do Mind Forge não foi carregado.');

  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const MODULES = MF.modules;
  const labels = { home:'VISÃO GERAL', modules:'LABORATÓRIOS', game:'SESSÃO ATIVA', learning:'TRILHAS DE CONHECIMENTO', python:'MOTOR PYTHON', campaign:'CAMPANHA OMEGA', review:'REVISÃO INTELIGENTE', progress:'EVOLUÇÃO', settings:'CONFIGURAÇÕES' };
  const iconFor = moduleId => (MF.getModule(moduleId) || {}).icon || '◈';
  const app = {
    currentView: 'home', session: null, filter: 'all', modalAction: null,
    toastTimer: null, lastViewBeforeSettings: 'home'
  };

  function toast(message, error) {
    const region = $('#toast-region');
    const node = document.createElement('div');
    node.className = 'toast' + (error ? ' is-error' : '');
    node.textContent = message;
    region.appendChild(node);
    global.setTimeout(() => node.remove(), 3800);
  }
  function navigate(view) {
    if (!$('#view-' + view)) return;
    app.currentView = view;
    $$('.view').forEach(section => section.classList.toggle('is-visible', section.id === 'view-' + view));
    $$('.nav-item[data-nav]').forEach(button => button.classList.toggle('is-active', button.dataset.nav === (view === 'game' ? 'modules' : view)));
    $('#current-crumb').textContent = labels[view] || 'MIND FORGE';
    $('#sidebar').classList.remove('is-open');
    $('#mobile-menu').setAttribute('aria-expanded', 'false');
    document.querySelector('.main-content').scrollTop = 0;
    global.scrollTo({top:0,behavior:MF.state.settings.reducedMotion?'auto':'smooth'});
    if (view === 'home') renderDashboard();
    if (view === 'modules') renderModuleGrid('all-module-grid');
    if (view === 'campaign') renderCampaign();
    if (view === 'review') renderReviewPage();
    if (view === 'progress') renderProgress();
    if (view === 'settings') renderSettings();
    if (view === 'learning') MF.LearningUI?.renderTracks();
    if (view === 'python') MF.PythonLab?.render();
  }
  function getAccuracy(stats) { return stats && stats.answered ? Math.round(stats.correct / stats.answered * 100) : null; }
  function getRecommendedModule() {
    const core = MODULES.filter(module => !['creativity','metacognition','memory'].includes(module.id));
    const unseen = core.filter(module => !MF.state.byModule[module.id] || !MF.state.byModule[module.id].answered);
    if (unseen.length) return unseen[Math.floor(Math.random() * unseen.length)].id;
    return core.map(module => ({module, stats:MF.moduleStats(module.id)})).sort((a,b) => {
      const ar = getAccuracy(a.stats); const br = getAccuracy(b.stats);
      const av = ar == null ? -1 : ar; const bv = br == null ? -1 : br;
      return av - bv || a.stats.answered - b.stats.answered;
    })[0].module.id;
  }
  function moduleCard(module) {
    const stats = MF.moduleStats(module.id);
    const accuracy = getAccuracy(stats);
    const total = module.questions.length;
    return `<button type="button" class="module-card" data-module-id="${escapeHTML(module.id)}" style="--module-accent:${escapeHTML(module.accent)}" aria-label="Iniciar ${escapeHTML(module.title)}">
      <div class="module-card-top"><span class="module-icon" aria-hidden="true">${escapeHTML(module.icon)}</span><span class="module-tag">${escapeHTML(module.tag)}</span></div>
      <h3>${escapeHTML(module.title)}</h3><p>${escapeHTML(module.description)}</p>
      <div class="module-card-bottom"><span>${stats.answered ? `${stats.answered} tentativa(s) · ${accuracy == null ? '—' : accuracy + '%'} de acerto` : `${total} desafios disponíveis`}</span><strong class="module-arrow" aria-hidden="true">↗</strong></div>
    </button>`;
  }
  function renderModuleGrid(containerId) {
    const container = $('#' + containerId);
    if (!container) return;
    const all = MODULES.filter(module => app.filter === 'all' || module.category === app.filter);
    container.innerHTML = all.map(moduleCard).join('');
  }
  function persistSession() {
    MF.state.activeSession = app.session && !app.session.finished ? app.session : null;
    MF.save();
  }
  function renderDashboard() {
    const state = MF.state, stats = state.stats;
    const level = MF.levelInfo(state.xp);
    $('#home-xp').textContent = state.xp;
    $('#home-level').textContent = `Nível ${level.level} · ${level.name}`;
    $('#home-xp-bar').style.width = level.percent + '%';
    const accuracy = getAccuracy(stats);
    $('#home-accuracy').textContent = accuracy == null ? '—' : accuracy;
    $('#home-answered').textContent = stats.answered ? `${stats.correct} acerto(s) em ${stats.answered} tentativa(s)` : 'Ainda sem tentativas';
    $('#home-completed').textContent = new Set(state.history.filter(item => item.questionId).map(item => item.questionId)).size;
    const explored = Object.keys(state.byModule).filter(id => state.byModule[id].answered).length;
    $('#home-modules').textContent = explored ? `${explored} de ${MODULES.length} laboratórios explorados` : 'Explore seu primeiro laboratório';
    const activeDays = state.activeDays || [];
    let streak = 0;
    for (let back = 0; back < 370; back++) {
      const d = new Date(); d.setDate(d.getDate() - back); const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      if (activeDays.includes(key)) streak++; else if (back > 0) break; else break;
    }
    $('#streak-count').textContent = streak;
    $('#review-nav-count').textContent = MF.Review.unresolvedCount();
    $('#review-due-count').textContent = MF.Review.unresolvedCount();
    $('#review-mastered-count').textContent = MF.Review.masteredCount();
    const completedStages = state.campaign.stagesCompleted.length;
    $('#campaign-progress-label').textContent = `${completedStages} de 5 etapas`;
    $('#campaign-progress-percent').textContent = `${Math.round(completedStages/5*100)}%`;
    $('#campaign-progress-bar').style.width = `${completedStages/5*100}%`;
    $('#home-module-grid').innerHTML = MODULES.filter(m => ['logic','attention','memory','mathematics','critical','bible','science','creativity'].includes(m.id)).slice(0,8).map(moduleCard).join('');
    $('#home-review-button').disabled = MF.Review.unresolvedCount() === 0;
    $('#home-review-button').textContent = MF.Review.unresolvedCount() === 0 ? 'Tudo em dia ✓' : 'Iniciar revisão →';
    const sidebarFocus = $('#sidebar-focus');
    if (stats.answered) sidebarFocus.innerHTML = `<span class="focus-dot"></span><div><strong>${escapeHTML(level.name)} · ${state.xp} XP</strong><small>${stats.answered} tentativa(s) registrada(s)</small></div>`;
    else sidebarFocus.innerHTML = '<span class="focus-dot"></span><div><strong>Pronto para começar</strong><small>Uma questão por vez.</small></div>';
  }
  function renderCampaign() {
    const stages = [
      {id:'omega-logic',name:'Câmara da dedução',desc:'Combine relações e identifique a conclusão necessária.',module:'logic',question:'logic-003'},
      {id:'omega-attention',name:'Observatório de padrões',desc:'Observe detalhes e conte apenas o elemento relevante.',module:'attention',question:'attention-count-06'},
      {id:'omega-critical',name:'Tribunal das evidências',desc:'Avalie a força de uma inferência e suas alternativas.',module:'critical',question:'critical-001'},
      {id:'omega-bible',name:'Arquivo do contexto',desc:'Leia uma passagem no seu contexto histórico e literário.',module:'bible',question:'bible-021'},
      {id:'omega-synthesis',name:'Síntese Omega',desc:'Integre método, evidências e análise crítica.',module:'interdisciplinary',question:'inter-003'}
    ];
    $('#mission-list').innerHTML = stages.map((stage,index) => {
      const done = MF.state.campaign.stagesCompleted.includes(stage.id);
      const current = !done && stages.slice(0,index).every(previous => MF.state.campaign.stagesCompleted.includes(previous.id));
      return `<div class="mission-row"><div class="mission-number">${done?'✓':String(index+1).padStart(2,'0')}</div><div><h3>${escapeHTML(stage.name)}</h3><p>${escapeHTML(stage.desc)}</p></div><div class="mission-state ${done?'is-done':''}">${done?'CONCLUÍDA':current?'PRÓXIMA':'DISPONÍVEL'}</div></div>`;
    }).join('');
    const complete = MF.state.campaign.stagesCompleted.length >= 5;
    $('#start-campaign').textContent = complete ? 'Expedição concluída ✓' : (MF.state.campaign.stagesCompleted.length ? 'Continuar expedição →' : 'Iniciar expedição ↗');
    $('#start-campaign').disabled = false;
  }
  function renderReviewPage() {
    const all = MF.Review.allItems();
    const unresolved = all.filter(item => item.status !== 'mastered');
    $('#review-page-due').textContent = unresolved.length;
    $('#review-page-done').textContent = MF.state.stats.reviewCompleted;
    $('#review-page-mastered').textContent = MF.Review.masteredCount();
    $('#review-nav-count').textContent = unresolved.length;
    $('#start-review-page').disabled = unresolved.length === 0;
    $('#start-review-page').textContent = unresolved.length ? 'Começar revisão →' : 'Tudo em dia ✓';
    const container = $('#review-queue-list');
    if (!all.length) { container.innerHTML = '<div class="empty-state">Sua fila de revisão está vazia.<br>Responda a alguns desafios; erros e questões difíceis poderão voltar aqui.</div>'; return; }
    container.innerHTML = all.slice(0,20).map(item => {
      const module = MF.getModule(item.moduleId);
      const status = item.status === 'mastered' ? 'DOMINADA' : item.status === 'scheduled' && item.dueAt > Date.now() ? 'AGENDADA' : 'PENDENTE';
      const due = item.dueAt > Date.now() ? `Próxima revisão: ${new Date(item.dueAt).toLocaleDateString('pt-BR')}` : 'Pode revisar agora';
      return `<div class="review-queue-item"><div><strong>${escapeHTML(item.question.shortTitle || item.question.prompt)}</strong><p>${escapeHTML(module ? module.title : item.moduleId)} · ${status} · ${escapeHTML(due)}</p></div>${item.status==='mastered'?'':`<button class="button button-secondary" data-review-one="${escapeHTML(item.id)}">Praticar</button>`}</div>`;
    }).join('');
  }
  function renderProgress() {
    const s = MF.state, stats = s.stats, level = MF.levelInfo(s.xp);
    $('#progress-level-number').textContent = level.level;
    $('#progress-level-name').textContent = level.name;
    $('#progress-next-level').textContent = level.next ? `${level.next.threshold - s.xp} XP para ${level.next.name}` : 'Último nível interno alcançado';
    $('#progress-xp-bar').style.width = level.percent + '%';
    $('#progress-total-xp').textContent = `${s.xp} XP no total`;
    $('#progress-level-percent').textContent = `${level.percent}% no nível atual`;
    $('#progress-accuracy').textContent = stats.answered ? `${Math.round(stats.correct/stats.answered*100)}%` : '—';
    $('#progress-first-try').textContent = stats.firstAttempts ? `${Math.round(stats.firstTryCorrect/stats.firstAttempts*100)}%` : '—';
    $('#progress-hint-rate').textContent = stats.answered ? `${Math.round(stats.hintsUsed/stats.answered*100)}%` : '—';
    $('#progress-confidence-calibration').textContent = stats.confidenceCount ? `${(stats.confidenceTotal/stats.confidenceCount).toFixed(1)}/5 · ${stats.answered ? Math.round(stats.correct/stats.answered*100)+'%' : '—'}` : '—';
    $('#progress-sessions').textContent = s.sessions;
    $('#skill-breakdown').innerHTML = MODULES.map(module => {
      const ms = MF.moduleStats(module.id); const rate = getAccuracy(ms);
      return `<div class="skill-row"><span class="skill-name">${escapeHTML(module.shortTitle)}</span><div class="skill-track" aria-label="${rate == null ? 'Sem dados' : rate + '% de acerto'}"><span style="width:${rate == null ? 0 : rate}%"></span></div><span class="skill-percent">${rate == null ? '—' : rate+'%'}</span></div>`;
    }).join('');
    const history = s.history.slice(0,12);
    $('#history-panel').innerHTML = history.length ? `<div class="history-list">${history.map(item => {
      const module = MF.getModule(item.moduleId);
      const date = new Date(item.date).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'});
      const symbol = item.correct === null ? '✎' : item.correct ? '✓' : '×';
      const cls = item.correct === null ? '' : item.correct ? '' : 'wrong';
      const verdict = item.correct === null ? 'Reflexão concluída' : item.correct ? 'Resposta correta' : 'Resposta incorreta';
      return `<div class="history-row"><span class="history-mark ${cls}">${symbol}</span><div><strong>${escapeHTML(item.title || 'Atividade')}</strong><small>${escapeHTML(module ? module.title : item.moduleId)} · ${escapeHTML(verdict)} · ${escapeHTML(date)}</small></div><span class="history-score">${item.difficulty ? 'Nível '+item.difficulty : ''}</span></div>`;
    }).join('')}</div>` : '<div class="empty-state">Ainda não há atividades registradas. O histórico aparecerá aqui depois das primeiras tentativas.</div>';
  }
  function renderSettings() {
    const s = MF.state.settings;
    $('#setting-no-timer').checked = !!s.noTimer;
    $('#setting-confidence').checked = !!s.confidence;
    $('#setting-reduced-motion').checked = !!s.reducedMotion;
    $('#setting-difficulty').value = String(s.difficulty || 1);
    $('#setting-session-length').value = String(s.sessionLength || 5);
    document.body.classList.toggle('reduced-motion', !!s.reducedMotion);
  }
  function getQuestionById(moduleId, id) {
    const module = MF.getModule(moduleId);
    return module && module.questions.find(q => q.id === id);
  }
  function startSession(moduleId, mode, limit) {
    const sessionMode = mode || 'free';
    let queue = [];
    if (sessionMode === 'campaign') {
      const stageDefs = [
        {stageId:'omega-logic',moduleId:'logic',questionId:'logic-003'},
        {stageId:'omega-attention',moduleId:'attention',questionId:'attention-count-06'},
        {stageId:'omega-critical',moduleId:'critical',questionId:'critical-001'},
        {stageId:'omega-bible',moduleId:'bible',questionId:'bible-021'},
        {stageId:'omega-synthesis',moduleId:'interdisciplinary',questionId:'inter-003'}
      ];
      queue = stageDefs.filter(stage => !MF.state.campaign.stagesCompleted.includes(stage.stageId)).map(stage => {
        const q = getQuestionById(stage.moduleId, stage.questionId);
        return q ? { ...q, stageId:stage.stageId } : null;
      }).filter(Boolean);
      if (!queue.length) { toast('Você já concluiu as cinco etapas da Expedição Omega.'); renderCampaign(); return; }
    } else if (sessionMode === 'review') {
      const due = MF.Review.dueItems(false);
      const available = due.length ? due : MF.Review.allItems().filter(item => item.status !== 'mastered');
      queue = available.slice(0, limit || MF.state.settings.sessionLength).map(item => ({...item.question, isReview:true, reviewWasDue: item.dueAt <= Date.now()}));
      if (!queue.length) { toast('Sua fila de revisão está vazia. Responda a outros desafios para criar itens de revisão.'); navigate('review'); return; }
    } else {
      const module = MF.getModule(moduleId);
      if (!module) { toast('Esse laboratório não foi encontrado.', true); return; }
      const requestedLevel = sessionMode === 'elite' ? 9 : sessionMode === 'adaptive' ? MF.Adaptive.recommendedLevel(moduleId) : sessionMode === 'free' ? Number(MF.state.settings.difficulty) : undefined;
      const picked = MF.Adaptive.pick(module.questions, moduleId, {level:requestedLevel});
      const count = limit || Number(MF.state.settings.sessionLength) || 5;
      queue = picked.slice(0, Math.min(count, picked.length));
    }
    queue = queue.map(q => sessionMode === 'review' ? MF.cloneQuestion(q) : MF.instantiateQuestion(q)).map(q => MF.shuffleChoiceOptions(q));
    app.session = {
      mode:sessionMode, moduleId:moduleId || 'campaign', questions:queue, currentIndex:0, results:[],
      hintsByQuestion:{}, selectedOption:null, confidence:3, hintIndex:0, hintUsedCurrent:false,
      attemptCountCurrent:0, feedback:null, currentResolved:null, memoryStage:'show', answerDraft:'', checkedCriteria:[], startedAt:Date.now(), xpStart:MF.state.xp
    };
    persistSession();
    navigate('game');
    renderQuestion();
  }
  function startRandomChallenge() {
    const choices = MODULES.filter(m => !['creativity','metacognition'].includes(m.id));
    const module = choices[Math.floor(Math.random()*choices.length)];
    startSession(module.id,'surprise',1);
  }
  function renderQuestion() {
    const session = app.session;
    if (!session) { navigate('modules'); return; }
    if (session.currentIndex >= session.questions.length) { renderSessionComplete(); return; }
    const q = session.questions[session.currentIndex];
    const module = MF.getModule(q.moduleId) || {title:'Missão',icon:'◈',accent:'#91adff',kicker:'DESAFIO'};
    $('#game-module-mark').textContent = module.icon;
    $('#game-module-mark').style.color = module.accent;
    $('#game-kicker').textContent = session.mode === 'campaign' ? 'EXPEDIÇÃO OMEGA · ' + module.title.toUpperCase() : module.kicker || module.title.toUpperCase();
    $('#game-title').textContent = session.mode === 'campaign' ? (q.stageName || module.title) : module.title;
    $('#game-subtitle').textContent = module.subtitle || 'Resolva no seu ritmo. Pense antes de responder.';
    $('#question-number').textContent = String(session.currentIndex + 1).padStart(2,'0');
    $('#question-total').textContent = '/ ' + String(session.questions.length).padStart(2,'0');
    $('#session-progress-bar').style.width = `${(session.currentIndex / session.questions.length) * 100}%`;
    $('#session-mode-tag').textContent = ({free:'TREINO LIVRE',adaptive:'MODO ADAPTATIVO',surprise:'DESAFIO SURPRESA',elite:'DESAFIO DE ELITE',review:'REVISÃO INTELIGENTE',campaign:'EXPEDIÇÃO OMEGA'})[session.mode] || 'TREINO';
    $('#aside-session-count').textContent = `${session.currentIndex + 1} / ${session.questions.length}`;
    $('#aside-correct-count').textContent = session.results.filter(result=>result.correct===true).length;
    $('#aside-hints-count').textContent = Object.values(session.hintsByQuestion).reduce((sum,value)=>sum+value,0);
    const levelName = MF.LEVELS.find(item=>item.level===(q.level||1))?.name || 'Iniciação';
    const meta = `<div class="question-meta"><span class="question-pill">${escapeHTML(module.tag || module.title)}</span><span class="question-pill level">NÍVEL ${q.level||1} · ${escapeHTML(levelName.toUpperCase())}</span>${q.isReview?'<span class="question-pill">REVISÃO</span>':''}${q.reference?'<span class="question-pill">COM REFERÊNCIA</span>':''}</div>`;
    let content = '';
    if (q.context) content += `<p class="question-context">${escapeHTML(q.context)}</p>`;
    content += `<h2 class="question-prompt">${escapeHTML(q.prompt)}</h2>`;
    if (q.displaySequence) content += `<div class="question-visual sequence" aria-label="Sequência de símbolos">${escapeHTML(q.displaySequence)}</div>`;
    if (q.type === 'choice') {
      content += `<div class="answer-options" role="group" aria-label="Alternativas">${q.options.map((option,index)=>`<button type="button" class="answer-option ${session.selectedOption===index?'is-selected':''}" data-option="${index}" aria-pressed="${session.selectedOption===index?'true':'false'}"><span class="answer-letter">${String.fromCharCode(65+index)}</span><span>${escapeHTML(option)}</span></button>`).join('')}</div>`;
    } else if (q.type === 'count' || q.type === 'number' || q.type === 'text') {
      const isCount = q.type === 'count';
      const placeholder = isCount ? 'Digite a quantidade encontrada' : q.type === 'number' ? 'Digite seu resultado' : 'Digite sua resposta';
      content += `<label class="input-label" for="answer-field">${isCount?'Quantidade encontrada':q.type==='number'?'Resposta numérica':'Sua resposta'}</label><input id="answer-field" class="answer-input" type="${isCount?'number':'text'}" ${isCount?'min="0" step="1" inputmode="numeric"':'inputmode="decimal"'} autocomplete="off" value="${escapeHTML(session.answerDraft)}" placeholder="${placeholder}" ${session.feedback?'disabled':''}>`;
    } else if (q.type === 'memory') {
      if (session.memoryStage === 'show') {
        content += `<div class="question-visual memory-display" aria-label="Sequência para memorizar">${escapeHTML(q.sequence.join('  '))}</div><p class="question-context">Memorize os símbolos e a regra da tarefa acima. Quando estiver pronto, oculte a sequência para responder sem consultá-la.</p>`;
      } else {
        content += `<div class="question-visual memory-hidden">Sequência oculta — aplique agora a regra solicitada.</div><label class="input-label" for="answer-field">Sua resposta após aplicar a regra</label><input id="answer-field" class="answer-input" type="text" autocomplete="off" value="${escapeHTML(session.answerDraft)}" placeholder="Digite os símbolos na ordem exigida" ${session.feedback?'disabled':''}>`;
      }
    } else if (q.type === 'open') {
      content += `<label class="input-label" for="answer-field">Sua reflexão ou proposta</label><textarea id="answer-field" class="answer-input answer-textarea" maxlength="2400" placeholder="Explique seu raciocínio. Não existe um gabarito automático para esta atividade aberta." ${session.feedback?'disabled':''}>${escapeHTML(session.answerDraft)}</textarea>`;
      content += `<div class="rubric-box"><strong>Checklist de autoavaliação</strong><p>Marque apenas os critérios que sua resposta realmente atende. O jogo não finge avaliar automaticamente a qualidade de uma resposta aberta.</p>${(q.criteria||[]).map((criterion,index)=>`<label class="rubric-check"><input type="checkbox" data-criterion="${index}" ${session.checkedCriteria.includes(index)?'checked':''} ${session.feedback?'disabled':''}><span>${escapeHTML(criterion)}</span></label>`).join('')}</div>`;
    }
    if (!session.feedback && q.type !== 'open' && q.type !== 'memory' && MF.state.settings.confidence) {
      content += `<div class="confidence-block"><span>Quanta confiança você tem nesta resposta?</span>${[1,2,3,4,5].map(n=>`<button type="button" class="confidence-btn ${session.confidence===n?'is-selected':''}" data-confidence="${n}" aria-label="Confiança ${n} de 5" aria-pressed="${session.confidence===n?'true':'false'}">${n}</button>`).join('')}</div>`;
    }
    if (session.activeHint) content += `<div class="hint-card"><strong>PISTA ${session.activeHint.index + 1}</strong><br>${escapeHTML(session.activeHint.text)}</div>`;
    if (session.feedback) content += feedbackMarkup(q,session);
    const actions = renderQuestionActions(q,session);
    $('#question-card').dataset.questionId = q.id;
    $('#question-card').innerHTML = meta + content + actions;
    $('#session-save-state').textContent = 'O progresso é salvo neste navegador.';
    if (!session.feedback && (q.type==='count'||q.type==='number'||q.type==='text'||(q.type==='memory'&&session.memoryStage==='recall'))) $('#answer-field')?.focus({preventScroll:true});
  }
  function feedbackMarkup(q,session) {
    const fb = session.feedback;
    if (fb.isOpen) {
      return `<div class="feedback-panel"><div class="feedback-title good">✎ Reflexão registrada</div><p>Sua resposta foi salva no histórico e recebeu XP por concluir a atividade. Como esta é uma questão aberta, a plataforma não atribui uma nota automática à qualidade do seu argumento.</p><p><strong>Releia seu checklist:</strong> ${session.checkedCriteria.length} de ${(q.criteria||[]).length} critérios autoavaliados.</p></div>`;
    }
    const correct = fb.correct;
    let answerInfo = '';
    if (!correct) {
      if (q.type==='choice') answerInfo = `<p><strong>Resposta esperada:</strong> ${escapeHTML(q.options[q.answer])}</p>`;
      else if (q.type==='memory') answerInfo = `<p><strong>Resposta esperada:</strong> ${escapeHTML(Array.from(String(q.answer)).join(' '))}</p>`;
      else answerInfo = `<p><strong>Resposta esperada:</strong> ${escapeHTML(q.answer)}</p>`;
    }
    const optionDetails = q.type === 'choice' && Array.isArray(q.optionExplanations) ? `<div class="option-explanation-list"><strong>Por que cada alternativa funciona ou falha</strong>${q.options.map((option,index)=>`<div class="option-explanation ${index===q.answer?'is-correct':''}"><b>${String.fromCharCode(65+index)} · ${index===q.answer?'Correta':'Incorreta'}</b><span>${escapeHTML(q.optionExplanations[index])}</span></div>`).join('')}</div>` : '';
    return `<div class="feedback-panel ${correct?'':'is-wrong'}"><div class="feedback-title ${correct?'good':'bad'}">${correct?'✓ Resposta correta':'× Ainda não — revise o raciocínio'}</div>${answerInfo}<p>${escapeHTML(q.explanation || 'Revise as condições do enunciado e tente novamente.')}</p>${optionDetails}${q.reference?`<div class="feedback-reference">Referência: ${escapeHTML(q.reference)}</div>`:''}<p class="feedback-reference">${correct?`+${fb.xpGain||0} XP registrados.`:'Você pode tentar novamente ou seguir para a próxima questão. O erro também entrou na fila de revisão.'}</p></div>`;
  }
  function renderQuestionActions(q,session) {
    if (session.feedback) {
      const retry = !session.feedback.correct && !session.feedback.isOpen;
      return `<div class="question-actions">${retry?'<button type="button" class="button button-ghost" data-action="retry">Tentar novamente ↻</button>':''}<button type="button" class="button button-primary" data-action="next">${session.currentIndex+1>=session.questions.length?'Ver relatório':'Próxima questão'} <span aria-hidden="true">→</span></button></div>`;
    }
    if (q.type==='memory' && session.memoryStage==='show') return `<div class="question-actions"><button type="button" class="button button-primary" data-action="memory-hide">Ocultar sequência e recordar →</button><button type="button" class="hint-button" data-action="hint" ${session.hintIndex >= (q.hints||[]).length?'disabled':''}>Pedir pista</button></div>`;
    const label = q.type==='open'?'Registrar reflexão': 'Verificar resposta';
    return `<div class="question-actions"><button type="button" class="button button-primary" data-action="submit">${label} <span aria-hidden="true">→</span></button><button type="button" class="hint-button" data-action="hint" ${session.hintIndex >= (q.hints||[]).length?'disabled':''}>Pedir pista ${session.hintIndex?'('+session.hintIndex+')':''}</button></div>`;
  }
  function normalizeText(value) { return String(value==null?'':value).trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.!?;:,]/g,'').replace(/\s+/g,' '); }
  function answerIsCorrect(q,value) {
    if (q.type==='choice') return Number(value)===q.answer;
    if (q.type==='count' || q.type==='number') {
      const input = String(value).trim().replace(',','.');
      if (!input) return false;
      const number = Number(input);
      return Number.isFinite(number) && Math.abs(number - Number(q.answer)) < 1e-9;
    }
    if (q.type==='memory') {
      const cleaned = String(value||'').replace(/[\s,;|>\-]+/g,'');
      return cleaned === String(q.answer).replace(/[\s,;|>\-]+/g,'');
    }
    if (q.type==='text') return normalizeText(value)===normalizeText(q.answer);
    return false;
  }
  function currentQuestion() { return app.session && app.session.questions[app.session.currentIndex]; }
  function submitCurrentAnswer() {
    const session = app.session, q = currentQuestion();
    if (!session || !q || session.feedback) return;
    if (q.type==='memory' && session.memoryStage!=='recall') { toast('Primeiro esconda a sequência para tentar recordá-la.'); return; }
    if (q.type==='open') { submitOpenResponse(q,session); return; }
    let userAnswer = session.answerDraft;
    if (q.type==='choice') userAnswer = session.selectedOption;
    else if (q.type==='count' || q.type==='number' || q.type==='text' || q.type==='memory') userAnswer = session.answerDraft.trim();
    if (userAnswer === null || userAnswer === undefined || String(userAnswer).trim()==='') { toast('Registre uma resposta antes de verificar.',true); $('#answer-field')?.focus(); return; }
    if (q.type==='choice' && !Number.isInteger(session.selectedOption)) { toast('Selecione uma alternativa antes de continuar.',true); return; }
    const correct = answerIsCorrect(q,userAnswer);
    const confidence = MF.state.settings.confidence && q.type!=='memory' ? session.confidence : null;
    const recorded = MF.recordAttempt({question:q,moduleId:q.moduleId,correct,firstTry:session.attemptCountCurrent===0,hintUsed:session.hintUsedCurrent,confidence,mode:session.mode,userAnswer:q.type==='choice'?q.options[Number(userAnswer)]:userAnswer});
    MF.Review.add(q,q.moduleId,correct,session.hintUsedCurrent);
    if (MF.PythonCore?.isConfigured()) {
      MF.PythonCore.recordFrontendAttempt({exercise_id:q.id,competency_id:q.moduleId,correct,hints_used:session.hintUsedCurrent,confidence,transfer:false}).catch(error => console.warn('[Mind Forge] Não foi possível sincronizar esta tentativa com o Python Core:', error.message));
    }
    session.attemptCountCurrent += 1;
    session.currentResolved = {correct,question:q,userAnswer,firstTry:session.attemptCountCurrent===1,hintUsed:session.hintUsedCurrent};
    session.feedback = {correct,xpGain:recorded.xpGain,level:recorded.level};
    persistSession();
    renderQuestion();
    renderDashboard();
  }
  function submitOpenResponse(q,session) {
    const draft = session.answerDraft.trim();
    if (draft.length < 20) { toast('Desenvolva um pouco mais a resposta (pelo menos 20 caracteres).',true); $('#answer-field')?.focus(); return; }
    const now = new Date().toISOString();
    MF.markActiveDay();
    const reflection = {id:'reflection-'+Date.now(),questionId:q.id,moduleId:q.moduleId,title:q.shortTitle||q.prompt,text:draft.slice(0,2400),criteriaChecked:session.checkedCriteria.slice(),criteriaTotal:(q.criteria||[]).length,date:now};
    MF.state.reflections.unshift(reflection); MF.state.reflections = MF.state.reflections.slice(0,100);
    const xpGain = 4 + Math.min(3,session.checkedCriteria.length);
    MF.state.xp += xpGain;
    MF.state.history.unshift({id:'reflection-attempt-'+Date.now(),questionId:q.id,moduleId:q.moduleId,title:q.shortTitle||q.prompt,correct:null,firstTry:null,hintUsed:session.hintUsedCurrent,confidence:null,date:now,mode:session.mode,difficulty:q.level||1,userAnswer:draft.slice(0,2000),explanation:'Atividade aberta registrada; a plataforma não atribui nota automática à qualidade da resposta.',reference:q.reference||''});
    MF.state.history = MF.state.history.slice(0,250);
    MF.updateAchievements(); MF.save();
    session.currentResolved = {correct:null,question:q,userAnswer:draft,open:true};
    session.feedback = {isOpen:true,xpGain};
    persistSession();
    renderQuestion(); renderDashboard();
  }
  function requestHint() {
    const session = app.session, q = currentQuestion();
    if (!session || !q || session.feedback) return;
    const hints = q.hints || [];
    if (session.hintIndex >= hints.length) { toast('Não há mais pistas disponíveis para esta questão.'); return; }
    session.activeHint = {index:session.hintIndex,text:hints[session.hintIndex]};
    session.hintIndex += 1; session.hintsByQuestion[q.id] = (session.hintsByQuestion[q.id] || 0) + 1; session.hintUsedCurrent = true;
    persistSession(); renderQuestion();
  }
  function resetQuestionState() {
    const session=app.session;
    session.selectedOption=null; session.confidence=3; session.hintIndex=0; session.hintUsedCurrent=false; session.feedback=null; session.currentResolved=null; session.memoryStage='show'; session.answerDraft=''; session.checkedCriteria=[]; session.activeHint=null; session.attemptCountCurrent=0;
  }
  function continueQuestion() {
    const session = app.session;
    if (!session || !session.feedback) return;
    if (session.currentResolved) session.results.push({correct:session.currentResolved.correct,question:session.currentResolved.question,firstTry:session.currentResolved.firstTry,hintUsed:session.currentResolved.hintUsed,open:session.currentResolved.open||false});
    if (session.mode==='review') { MF.state.stats.reviewCompleted += 1; MF.save(); }
    session.currentIndex += 1;
    if (session.mode==='campaign') MF.save();
    if (session.currentIndex >= session.questions.length) renderSessionComplete();
    else { resetQuestionState(); persistSession(); renderQuestion(); }
    renderDashboard();
  }
  function retryQuestion() {
    const session=app.session;
    if (!session || !session.feedback || session.feedback.correct || session.feedback.isOpen) return;
    session.selectedOption=null; session.feedback=null; session.currentResolved=null; session.activeHint=null; session.memoryStage='recall'; session.answerDraft='';
    persistSession(); renderQuestion();
  }
  function renderSessionComplete() {
    const session = app.session;
    if (!session || session.finished) return;
    session.finished = true;
    MF.state.activeSession = null;
    MF.completeSession(session);
    const scored = session.results.filter(result=>result.correct!==null);
    const correct = scored.filter(result=>result.correct===true).length;
    const openCount = session.results.filter(result=>result.open).length;
    const accuracy = scored.length ? Math.round(correct/scored.length*100) : null;
    const xpGain = MF.state.xp - session.xpStart;
    const title = session.mode==='campaign' ? 'Etapa da Expedição encerrada' : session.mode==='review' ? 'Revisão concluída' : 'Sessão concluída';
    const mainText = session.mode==='campaign' ? 'Sua expedição foi atualizada. Etapas corretas ficam registradas; as que precisam de trabalho continuam disponíveis.' : 'O importante não é apenas a pontuação, mas o que você consegue explicar e aplicar novamente depois.';
    $('#question-card').innerHTML = `<div class="game-complete"><div class="complete-icon">${session.mode==='campaign'?'Ω':'✓'}</div><div class="eyebrow" style="justify-content:center">RELATÓRIO DA SESSÃO</div><h2>${escapeHTML(title)}</h2><p>${escapeHTML(mainText)}</p><div class="complete-stats"><div class="complete-stat"><strong>${scored.length ? correct+'/'+scored.length : '—'}</strong><span>acertos / questões avaliadas</span></div><div class="complete-stat"><strong>${accuracy===null?'—':accuracy+'%'}</strong><span>taxa de acerto na sessão</span></div><div class="complete-stat"><strong>+${xpGain}</strong><span>XP conquistados</span></div>${openCount?`<div class="complete-stat"><strong>${openCount}</strong><span>reflexões registradas</span></div>`:''}</div><p>${accuracy===null?'Esta sessão incluiu somente atividade aberta, por isso não há taxa de acerto.':accuracy>=80?'Você demonstrou boa precisão nesta amostra; confira se consegue repetir o desempenho em desafios novos.':accuracy>=50?'Há estratégias úteis aqui e também oportunidades concretas de revisão. Retome as pistas e pratique os itens pendentes.':'Use o relatório para identificar o tipo de erro. Uma revisão por etapas pode ajudar a reconstruir o método.'}</p><div class="complete-actions"><button class="button button-primary" data-action="restart">Novo desafio ↗</button><button class="button button-secondary" data-action="review-mistakes">Revisar erros ↻</button><button class="button button-ghost" data-action="to-dashboard">Voltar ao início</button></div></div>`;
    $('#session-progress-bar').style.width='100%';
    $('#question-number').textContent=String(session.questions.length).padStart(2,'0');
    $('#question-total').textContent='/ '+String(session.questions.length).padStart(2,'0');
    $('#aside-correct-count').textContent=correct;
    $('#aside-session-count').textContent=`${session.questions.length} / ${session.questions.length}`;
    renderDashboard(); renderProgress(); renderCampaign(); renderReviewPage();
  }
  function openModal(title,message,action) {
    app.modalAction = action;
    $('#modal-title').textContent = title; $('#modal-message').textContent = message;
    $('#modal-backdrop').hidden = false; $('#modal-cancel').focus();
  }
  function closeModal() { $('#modal-backdrop').hidden=true; app.modalAction=null; }
  function confirmModal() { const action=app.modalAction; closeModal(); if (typeof action==='function') action(); }
  function saveSettings() {
    MF.state.settings.noTimer = $('#setting-no-timer').checked;
    MF.state.settings.confidence = $('#setting-confidence').checked;
    MF.state.settings.reducedMotion = $('#setting-reduced-motion').checked;
    MF.state.settings.difficulty = Number($('#setting-difficulty').value) || 1;
    MF.state.settings.sessionLength = Number($('#setting-session-length').value) || 5;
    document.body.classList.toggle('reduced-motion',MF.state.settings.reducedMotion);
    MF.save(); $('#settings-feedback').textContent='Preferências salvas neste navegador.';
    toast('Configurações salvas.');
  }
  function exportProgress() {
    try {
      const contents = MF.Storage.export(MF.state);
      const blob = new Blob([contents],{type:'application/json;charset=utf-8'});
      const url = URL.createObjectURL(blob); const a = document.createElement('a');
      a.href=url; a.download='mind-forge-omega-progresso.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      toast('Backup preparado para salvar.');
    } catch(error) { toast('Não foi possível preparar o backup.',true); console.error(error); }
  }
  async function importProgress(file) {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const validation = MF.Storage.validateImport(parsed);
      if (!validation.ok) { toast(validation.reason,true); return; }
      openModal('Importar backup?', 'O progresso atual será substituído pelos dados do arquivo selecionado. Esta ação não pode ser desfeita sem um backup.', () => {
        MF.state = MF.normalizeState(parsed.state);
        MF.state.reviewItems = MF.state.reviewItems.filter(item => item && typeof item.id === 'string' && MF.getModule(item.moduleId) && item.question && MF.validateQuestion(item.question));
        MF.save(); app.session = MF.state.activeSession || null; renderDashboard(); renderProgress(); renderReviewPage(); renderCampaign(); renderSettings();
        if (app.session && Array.isArray(app.session.questions) && app.session.questions.length) { navigate('game'); renderQuestion(); }
        toast('Backup importado com sucesso.');
      });
    } catch(error) { toast('O arquivo não é um JSON válido ou está corrompido.',true); }
    finally { $('#import-progress-file').value=''; }
  }
  function renderReviewOne(id) {
    const item = MF.state.reviewItems.find(entry=>entry.id===id);
    if (!item) { toast('Este item não foi encontrado na fila.',true); return; }
    startSession(item.moduleId,'review-one',1);
    app.session.questions = [MF.shuffleChoiceOptions({...item.question,isReview:true})];
    app.session.mode='review';
    $('#session-mode-tag').textContent='REVISÃO DE UM ITEM';
    renderQuestion();
  }
  function bindEvents() {
    document.addEventListener('click', event => {
      const nav = event.target.closest('[data-nav]');
      if (nav) { event.preventDefault(); navigate(nav.dataset.nav); return; }
      const moduleButton = event.target.closest('[data-module-id]');
      if (moduleButton) { startSession(moduleButton.dataset.moduleId,'free'); return; }
      const filterButton = event.target.closest('[data-filter]');
      if (filterButton) { app.filter=filterButton.dataset.filter; $$('.filter-chip').forEach(b=>b.classList.toggle('is-selected',b===filterButton)); renderModuleGrid('all-module-grid'); return; }
      const option = event.target.closest('[data-option]');
      if (option && app.session && !app.session.feedback) { app.session.selectedOption=Number(option.dataset.option); persistSession(); renderQuestion(); return; }
      const confidence = event.target.closest('[data-confidence]');
      if (confidence && app.session && !app.session.feedback) { app.session.confidence=Number(confidence.dataset.confidence); persistSession(); renderQuestion(); return; }
      const criterion = event.target.closest('[data-criterion]');
      if (criterion && app.session && !app.session.feedback) {
        const id=Number(criterion.dataset.criterion); const target=criterion.querySelector('input');
        const checked=target ? target.checked : false;
        if (checked && !app.session.checkedCriteria.includes(id)) app.session.checkedCriteria.push(id);
        if (!checked) app.session.checkedCriteria=app.session.checkedCriteria.filter(n=>n!==id);
        return;
      }
      const action = event.target.closest('[data-action]');
      if (action && app.session) {
        if (action.dataset.action==='submit') submitCurrentAnswer();
        else if (action.dataset.action==='hint') requestHint();
        else if (action.dataset.action==='retry') retryQuestion();
        else if (action.dataset.action==='next') continueQuestion();
        else if (action.dataset.action==='memory-hide') { app.session.memoryStage='recall'; app.session.answerDraft=''; app.session.confidence=3; persistSession(); renderQuestion(); }
        else if (action.dataset.action==='restart') startSession(getRecommendedModule(),'adaptive');
        else if (action.dataset.action==='review-mistakes') startSession(null,'review');
        else if (action.dataset.action==='to-dashboard') navigate('home');
        return;
      }
      const one = event.target.closest('[data-review-one]');
      if (one) { renderReviewOne(one.dataset.reviewOne); return; }
    });
    $('#start-adaptive').addEventListener('click',()=>startSession(getRecommendedModule(),'adaptive'));
    $('#start-random').addEventListener('click',startRandomChallenge);
    $('#start-elite').addEventListener('click',()=>{const candidates=MODULES.filter(m=>m.questions.some(q=>(q.level||1)>=7));const chosen=candidates[Math.floor(Math.random()*candidates.length)];startSession(chosen.id,'elite',3);});
    $('#home-review-button').addEventListener('click',()=>startSession(null,'review'));
    $('#start-review-page').addEventListener('click',()=>startSession(null,'review'));
    $('#start-campaign').addEventListener('click',()=>startSession(null,'campaign'));
    $('#back-to-modules').addEventListener('click',()=>navigate('modules'));
    $('#quit-session').addEventListener('click',()=>openModal('Encerrar esta sessão?', 'As respostas já enviadas ficam registradas, mas esta sessão não será marcada como concluída.', ()=>{app.session=null;MF.state.activeSession=null;MF.save();navigate('home');}));
    $('#mobile-menu').addEventListener('click',()=>{const sidebar=$('#sidebar');const open=sidebar.classList.toggle('is-open');$('#mobile-menu').setAttribute('aria-expanded',String(open));});
    $('#modal-cancel').addEventListener('click',closeModal); $('#modal-confirm').addEventListener('click',confirmModal);
    $('#modal-backdrop').addEventListener('click',event=>{if(event.target===$('#modal-backdrop'))closeModal();});
    $('#export-progress').addEventListener('click',exportProgress);
    $('#import-progress-file').addEventListener('change',event=>importProgress(event.target.files&&event.target.files[0]));
    ['setting-no-timer','setting-confidence','setting-reduced-motion','setting-difficulty','setting-session-length'].forEach(id=>$('#'+id).addEventListener('change',saveSettings));
    $('#reset-progress').addEventListener('click',()=>openModal('Apagar todo o progresso?', 'XP, estatísticas, histórico, fila de revisão, campanha e preferências serão redefinidos neste navegador.', ()=>{MF.reset();app.session=null;renderDashboard();renderProgress();renderReviewPage();renderCampaign();renderSettings();toast('Progresso redefinido.');}));
    $('#question-card').addEventListener('input',event=>{
      if (!app.session) return;
      if (event.target.classList.contains('answer-input')) { app.session.answerDraft=event.target.value; persistSession(); }
    });
    $('#question-card').addEventListener('keydown',event=>{
      if (event.key==='Enter' && event.target.id==='answer-field' && currentQuestion() && ['number','count'].includes(currentQuestion().type) && !app.session.feedback) { event.preventDefault(); submitCurrentAnswer(); }
    });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!$('#modal-backdrop').hidden)closeModal();else $('#sidebar').classList.remove('is-open');}});
  }
  function init() {
    bindEvents();
    MF.state.settings = MF.state.settings || {};
    MF.LearningUI?.init();
    MF.PythonLab?.init();
    renderDashboard(); renderModuleGrid('all-module-grid'); renderCampaign(); renderReviewPage(); renderProgress(); renderSettings();
    if (global.location && new URLSearchParams(global.location.search).get('test')==='1') {
      const result=MF.Tests.run();
      if (result.ok) toast(`Autotestes passaram: ${result.moduleCount} módulos e ${result.questionCount} questões.`);
      else toast(`Autotestes encontraram ${result.failures.length} problema(s). Veja o painel de testes.`,true);
    }
    const selfTests=MF.Tests.run();
    if (!selfTests.ok) console.error('[Mind Forge] Falhas no autoteste de conteúdo:',selfTests.failures);
    const savedSession = MF.state.activeSession;
    if (savedSession && Array.isArray(savedSession.questions) && savedSession.questions.length && Number.isInteger(savedSession.currentIndex) && savedSession.currentIndex < savedSession.questions.length) {
      app.session = savedSession;
      navigate('game');
      renderQuestion();
      toast('Sessão anterior restaurada a partir do progresso local.');
    }
  }
  init();
})(window, document);
