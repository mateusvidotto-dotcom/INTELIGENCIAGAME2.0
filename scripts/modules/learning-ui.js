(function (global, document) {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const state = { curriculum: null, catalog: null, selectedTrack: null, tab: 'curriculum' };
  const moduleApi = {
    async init() {
      this.bind();
      const results = await Promise.allSettled([this.loadCurriculum(), this.loadCatalog()]);
      if (results.some(result => result.status === 'rejected')) console.warn('[Mind Forge] Parte da biblioteca não pôde ser carregada:', results.filter(result=>result.status==='rejected').map(result=>result.reason));
      this.renderTracks();
      this.renderObmep();
    },
    bind() {
      document.addEventListener('click', event => {
        const tab = event.target.closest('[data-learning-tab]');
        if (tab) { this.setTab(tab.dataset.learningTab); return; }
        const track = event.target.closest('[data-track-id]');
        if (track) { state.selectedTrack = track.dataset.trackId; this.renderTracks(); this.renderTrackDetail(); return; }
      });
      $('#curriculum-search')?.addEventListener('input', () => this.renderTracks());
      $('#obmep-search')?.addEventListener('input', () => this.renderObmep());
    },
    setTab(tabName) {
      state.tab = tabName;
      document.querySelectorAll('[data-learning-tab]').forEach(node => {
        const active = node.dataset.learningTab === tabName;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-selected', String(active));
      });
      $('#learning-panel-curriculum')?.classList.toggle('is-visible', tabName === 'curriculum');
      $('#learning-panel-curriculum')?.toggleAttribute('hidden', tabName !== 'curriculum');
      $('#learning-panel-obmep')?.classList.toggle('is-visible', tabName === 'obmep');
      $('#learning-panel-obmep')?.toggleAttribute('hidden', tabName !== 'obmep');
    },
    async loadCurriculum() {
      const response = await fetch('data/curriculum/tracks.json', {cache:'no-cache'});
      if (!response.ok) throw new Error('Não foi possível carregar o mapa curricular.');
      state.curriculum = await response.json();
      if (state.curriculum.tracks?.length && !state.selectedTrack) state.selectedTrack = state.curriculum.tracks[0].id;
    },
    async loadCatalog() {
      const response = await fetch('assets/obmep/catalog.json', {cache:'no-cache'});
      if (!response.ok) throw new Error('Não foi possível carregar o catálogo OBMEP.');
      state.catalog = await response.json();
    },
    renderTracks() {
      const container = $('#curriculum-track-list');
      if (!container) return;
      if (!state.curriculum) { container.innerHTML = '<p class="content-note">Mapa curricular indisponível. Confira a conexão e recarregue a página.</p>'; return; }
      const query = ($('#curriculum-search')?.value || '').trim().toLocaleLowerCase('pt-BR');
      const tracks = state.curriculum.tracks.filter(track => [track.title,track.area,track.description,...(track.units||[]).map(unit=>unit.title)].join(' ').toLocaleLowerCase('pt-BR').includes(query));
      $('#curriculum-count').textContent = `${tracks.length} de ${state.curriculum.tracks.length} trilhas`;
      container.innerHTML = tracks.map(track => `<button type="button" class="curriculum-track-card ${track.id===state.selectedTrack?'is-selected':''}" data-track-id="${escapeHTML(track.id)}"><strong>${escapeHTML(track.title)}</strong><small>${escapeHTML(track.area || 'Área geral')} · ${(track.units||[]).length} tópicos mapeados</small><div class="track-progress"><span style="width:0%"></span></div></button>`).join('') || '<p class="content-note">Nenhuma trilha corresponde à busca.</p>';
      if (!tracks.some(track => track.id === state.selectedTrack)) state.selectedTrack = tracks[0]?.id || null;
      this.renderTrackDetail();
    },
    renderTrackDetail() {
      const target = $('#curriculum-detail');
      if (!target || !state.curriculum) return;
      const track = state.curriculum.tracks.find(item => item.id === state.selectedTrack);
      if (!track) { target.innerHTML = '<div class="empty-state">Selecione uma trilha para consultar os tópicos.</div>'; return; }
      const prereqs = (track.prerequisites || []).map(id => state.curriculum.tracks.find(item=>item.id===id)?.title || id);
      target.innerHTML = `<div class="eyebrow">${escapeHTML(track.area || 'TRILHA')}</div><h2>${escapeHTML(track.title)}</h2><p>${escapeHTML(track.description || '')}</p><div class="track-chip-row"><span class="track-chip">Prioridade: ${escapeHTML(track.priority || 'não definida')}</span><span class="track-chip">${(track.units||[]).length} tópicos mapeados</span><span class="track-chip">Mapa curricular, não curso completo</span></div><h3>Pré-requisitos</h3><p>${prereqs.length ? prereqs.map(escapeHTML).join(' · ') : 'Nenhum pré-requisito registrado.'}</p><div class="curriculum-units">${(track.units||[]).map((unit,index)=>`<div class="curriculum-unit"><b>${String(index+1).padStart(2,'0')}</b><div><span>${escapeHTML(unit.title)}</span><small>${escapeHTML(unit.status || 'Tópico mapeado')} · ${unit.content_available ? 'Conteúdo disponível' : 'Aula ainda não desenvolvida'}</small></div></div>`).join('')}</div>`;
    },
    renderObmep() {
      const container = $('#obmep-results');
      if (!container) return;
      if (!state.catalog) { container.innerHTML = '<p class="content-note">Catálogo OBMEP indisponível. Confira se os arquivos assets/obmep foram enviados.</p>'; return; }
      const query = ($('#obmep-search')?.value || '').trim().toLocaleLowerCase('pt-BR');
      const rows = [];
      state.catalog.missions.forEach(mission => {
        (mission.pages || []).forEach(page => {
          const haystack = `${mission.title} ${mission.source_title} ${page.text || ''}`.toLocaleLowerCase('pt-BR');
          if (!query || haystack.includes(query)) rows.push({mission,page});
        });
      });
      $('#obmep-count').textContent = `${rows.length} página(s) encontradas · ${state.catalog.coverage?.documents || state.catalog.missions.length} PDFs`;
      container.innerHTML = rows.map(({mission,page})=>`<article class="obmep-card"><h3>${escapeHTML(mission.title)}</h3><div class="obmep-meta">Missão ${mission.mission} · Nível ${mission.level} · Página ${page.page} · ${escapeHTML(mission.year_range || 'ano não informado')}</div><div class="obmep-pages"><div class="obmep-page"><strong>${page.searchable ? 'Texto pesquisável' : 'Extração textual limitada'}</strong><p>${escapeHTML(page.text || 'Não foi possível extrair texto confiável desta página. Consulte o PDF original.')}</p><div class="obmep-page-actions"><a href="${escapeHTML(mission.file)}#page=${Number(page.page)}" target="_blank" rel="noopener noreferrer">Abrir PDF na página ${Number(page.page)} ↗</a><a href="${escapeHTML(mission.file)}" download>Baixar PDF ↓</a></div></div></div></article>`).join('') || '<p class="content-note">Nenhuma página encontrada. Tente outro termo ou limpe a busca.</p>';
    }
  };
  global.MindForge = global.MindForge || {};
  global.MindForge.LearningUI = moduleApi;
})(window, document);
