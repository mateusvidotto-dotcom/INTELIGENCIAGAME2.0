(function (global, document) {
  'use strict';
  const MF = global.MindForge = global.MindForge || {};
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const state = { current: null, hintsUsed: 0, answered: false, diagnosticId: null, diagnosticItem: null, diagnosticBusy: false };
  const setStatus = (message, error=false) => {
    const node = $('#python-connection-status');
    if (node) { node.textContent = message; node.classList.toggle('is-error', error); }
  };
  async function withStatus(action) {
    try { return await action(); }
    catch (error) { setStatus(error.message || 'Falha ao executar a operação.', true); return null; }
  }
  async function checkConnection() {
    if (!MF.PythonCore) return;
    try { MF.PythonCore.configure($('#python-api-url')?.value || ''); }
    catch (error) { setStatus(error.message,true); return; }
    const result = await withStatus(() => MF.PythonCore.health());
    if (result) setStatus(`Conectado: ${result.service} ${result.version}. Armazenamento: ${result.storage}. ${result.ai?.message || ''}`);
  }
  function renderExercise(item) {
    const panel = $('#python-exercise-panel');
    if (!panel) return;
    state.current = item; state.hintsUsed = 0; state.answered = false;
    const isChoice = item.type === 'choice' && Array.isArray(item.options) && item.options.length;
    panel.innerHTML = `<div class="eyebrow">${escapeHTML(item.competency_id)} · NÍVEL ${Number(item.level)}</div><h2>Desafio gerado</h2><p class="python-prompt">${escapeHTML(item.prompt)}</p>${isChoice?`<div class="python-options">${item.options.map((option,index)=>`<label class="python-option"><input type="radio" name="python-answer" value="${index}"><span>${escapeHTML(option)}</span></label>`).join('')}</div>`:`<div class="python-answer-row"><input class="text-input" id="python-answer" type="text" maxlength="1000" placeholder="Digite sua resposta" autocomplete="off"><button type="button" class="button button-primary" id="python-submit-answer">Verificar</button></div>`}<div class="button-row"><button type="button" class="button button-secondary" id="python-hint">Solicitar pista</button>${isChoice?'<button type="button" class="button button-primary" id="python-submit-answer">Verificar</button>':''}<button type="button" class="button button-ghost" id="python-new-exercise">Novo desafio</button></div><div id="python-hint-output" aria-live="polite"></div><div id="python-feedback-output" aria-live="polite"></div>`;
    $('#python-submit-answer')?.addEventListener('click', submitAnswer);
    $('#python-hint')?.addEventListener('click', requestHint);
    $('#python-new-exercise')?.addEventListener('click', generate);
    $('#python-answer')?.addEventListener('keydown', event => { if (event.key==='Enter') submitAnswer(); });
  }
  function readAnswer() {
    if (state.current?.type === 'choice') {
      const selected = $('input[name="python-answer"]:checked');
      if (!selected) throw new Error('Selecione uma alternativa antes de verificar.');
      return state.current.options[Number(selected.value)];
    }
    const value = $('#python-answer')?.value.trim();
    if (!value) throw new Error('Digite uma resposta antes de verificar.');
    return value;
  }
  async function generate() {
    if (!MF.PythonCore?.isConfigured()) { setStatus('Configure e teste a URL da API primeiro.',true); return; }
    const payload = {competency_id:$('#python-skill').value,level:Number($('#python-level').value)};
    const item = await withStatus(() => MF.PythonCore.generate(payload));
    if (item) { renderExercise(item); setStatus('Exercício gerado. O gabarito permanece no servidor até a tentativa.'); }
  }
  async function requestHint() {
    if (!state.current || state.answered) return;
    const result = await withStatus(() => MF.PythonCore.hint(state.current.id,state.hintsUsed+1));
    if (!result) return;
    state.hintsUsed = result.step;
    $('#python-hint-output').insertAdjacentHTML('beforeend',`<div class="python-hint"><strong>Pista ${result.step}/${result.total}:</strong> ${escapeHTML(result.hint)}</div>`);
    if (result.step >= result.total) $('#python-hint').setAttribute('disabled','disabled');
  }
  async function submitAnswer() {
    if (!state.current || state.answered) return;
    let answer;
    try { answer = readAnswer(); } catch(error) { setStatus(error.message,true); return; }
    const result = await withStatus(() => MF.PythonCore.answer(state.current.id,{answer,hints_used:state.hintsUsed,confidence:null,transfer:false}));
    if (!result) return;
    state.answered = true;
    const output = $('#python-feedback-output');
    output.innerHTML = `<div class="python-feedback ${result.correct?'':'is-wrong'}"><h3>${result.correct?'Resposta correta':'Resposta ainda não está correta'}</h3><p>${escapeHTML(result.explanation)}</p><ol>${(result.solution_steps||[]).map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol><p><strong>Resposta:</strong> ${escapeHTML(result.expected_answer)}</p><p><strong>Estimativa heurística de domínio:</strong> ${escapeHTML(result.mastery?.status || 'sem dados')} · confiança ${escapeHTML(result.mastery?.confidence || 'não estimada')} · ${Number(result.mastery?.evidence_count || 0)} evidências.</p><p>Essa estimativa descreve apenas as tentativas registradas nesta competência; não é uma medida psicométrica.</p></div>`;
    setStatus('Resposta registrada no banco SQLite local.');
    $('#python-submit-answer')?.setAttribute('disabled','disabled');
    $('#python-hint')?.setAttribute('disabled','disabled');
  }
  async function loadRecommendations() {
    const result = await withStatus(() => MF.PythonCore.recommendations());
    const target = $('#python-recommendations');
    if (!result || !target) return;
    target.innerHTML = (result.items||[]).map(item=>`<article class="python-recommendation"><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.reason)}</p></article>`).join('') || '<p class="muted-label">Ainda não há recomendações suficientes; registre algumas tentativas.</p>';
  }
  async function loadAnalytics() {
    const result = await withStatus(() => MF.PythonCore.analytics());
    const target = $('#python-analytics');
    if (!result || !target) return;
    const entries = Object.entries(result.competencies||{});
    target.innerHTML = entries.map(([name,item])=>`<article class="python-recommendation"><strong>${escapeHTML(name)}</strong><p>Status: ${escapeHTML(item.status)} · Precisão: ${item.accuracy==null?'—':Math.round(item.accuracy*100)+'%'} · Evidências: ${Number(item.evidence_count||0)} · Confiança: ${escapeHTML(item.confidence)}</p></article>`).join('') || '<p class="muted-label">Nenhuma tentativa registrada no motor Python.</p>';
  }

  function renderDiagnosticItem(item, index, total) {
    state.diagnosticItem = item;
    const target = $('#python-diagnostic-content');
    if (!target) return;
    const choices = item.type === 'choice' && Array.isArray(item.options);
    const open = item.type === 'open' || item.type === 'self_report';
    target.innerHTML = `<article class="python-recommendation"><div class="eyebrow">ITEM ${Number(index)} DE ${Number(total)} · ${escapeHTML(item.competency_id)}</div><p class="python-prompt">${escapeHTML(item.prompt)}</p>${choices?`<div class="python-options">${item.options.map((option,i)=>`<label class="python-option"><input type="radio" name="python-diagnostic-answer" value="${i}"><span>${escapeHTML(option)}</span></label>`).join('')}</div>`:`<textarea id="python-diagnostic-answer" class="text-input" rows="3" maxlength="4000" placeholder="${open?'Explique sua resposta...':'Digite sua resposta...'}"></textarea>`}<button type="button" class="button button-primary" id="python-diagnostic-submit">Registrar resposta</button><div id="python-diagnostic-feedback" aria-live="polite"></div></article>`;
    $('#python-diagnostic-submit')?.addEventListener('click', submitDiagnosticAnswer);
  }
  async function startDiagnostic() {
    if (!MF.PythonCore.isConfigured()) { setStatus('Configure a API Python para iniciar o diagnóstico.',true); return; }
    const result = await withStatus(() => MF.PythonCore.diagnosticStart());
    if (!result) return;
    state.diagnosticId = result.session_id;
    renderDiagnosticItem(result.item, 1, result.total_items);
    setStatus(result.note || 'Diagnóstico iniciado.');
  }
  async function submitDiagnosticAnswer() {
    if (!state.diagnosticId || !state.diagnosticItem || state.diagnosticBusy) return;
    const item = state.diagnosticItem;
    let answer = '';
    if (item.type === 'choice') {
      const selected = $('input[name="python-diagnostic-answer"]:checked');
      if (!selected) { setStatus('Selecione uma alternativa.',true); return; }
      answer = item.options[Number(selected.value)];
    } else answer = $('#python-diagnostic-answer')?.value.trim() || '';
    if (!answer) { setStatus('Preencha a resposta antes de continuar.',true); return; }
    state.diagnosticBusy = true;
    const result = await withStatus(() => MF.PythonCore.diagnosticAnswer(state.diagnosticId,{item_id:item.id,answer}));
    state.diagnosticBusy = false;
    if (!result) return;
    const target = $('#python-diagnostic-content');
    const correct = result.feedback?.correct;
    const verdict = correct === null ? 'Resposta registrada para reflexão; sem correção automática.' : correct ? 'Resposta correta.' : 'Resposta incorreta.';
    if (result.completed) {
      const summary = result.summary || {};
      target.innerHTML = `<article class="python-feedback"><h3>Diagnóstico concluído</h3><p>${escapeHTML(verdict)}</p><p>${escapeHTML(result.feedback?.explanation || '')}</p><p><strong>Itens objetivos:</strong> ${Number(summary.scoreable_correct||0)} de ${Number(summary.scoreable_total||0)} · <strong>Precisão:</strong> ${summary.accuracy==null?'não calculada':Math.round(summary.accuracy*100)+'%'}</p><p>${escapeHTML(summary.limitations || 'Amostra exploratória, não psicométrica.')}</p><button type="button" class="button button-secondary" id="python-diagnostic-start">Refazer diagnóstico</button></article>`;
      $('#python-diagnostic-start')?.addEventListener('click', startDiagnostic);
      state.diagnosticItem = null;
      return;
    }
    const feedback = $('#python-diagnostic-feedback');
    const next = result.next_item;
    if (feedback) {
      feedback.innerHTML = `<p>${escapeHTML(verdict)} ${escapeHTML(result.feedback?.explanation || '')}</p>${next?'<button type="button" class="button button-secondary" id="python-diagnostic-next">Próxima questão</button>':''}`;
      if (next) $('#python-diagnostic-next')?.addEventListener('click', () => renderDiagnosticItem(next,Number(result.index),Number(result.total)));
    }
  }

  MF.PythonLab = {
    init() {
      const urlInput = $('#python-api-url');
      if (urlInput && MF.PythonCore) urlInput.value = MF.PythonCore.getBase();
      $('#python-save-url')?.addEventListener('click', () => {
        try { MF.PythonCore.configure($('#python-api-url').value); setStatus('Endereço salvo neste navegador. Teste a conexão.'); }
        catch (error) { setStatus(error.message,true); }
      });
      $('#python-check-connection')?.addEventListener('click', checkConnection);
      $('#python-generate')?.addEventListener('click', generate);
      $('#python-load-recommendations')?.addEventListener('click', loadRecommendations);
      $('#python-load-analytics')?.addEventListener('click', loadAnalytics);
      $('#python-diagnostic-start')?.addEventListener('click', startDiagnostic);
    },
    render() { if ($('#python-api-url') && MF.PythonCore) $('#python-api-url').value = MF.PythonCore.getBase(); }
  };
})(window, document);
