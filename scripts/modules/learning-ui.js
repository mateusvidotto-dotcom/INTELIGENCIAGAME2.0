(function (global, document) {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const state = { curriculum: null, selectedTrack: null };
  const moduleApi = {
    async init() {
      this.bind();
      try { await this.loadCurriculum(); }
      catch (error) { console.warn('[Mind Forge] Não foi possível carregar o mapa curricular:', error); }
      this.renderTracks();
    },
    bind() {
      document.addEventListener('click', event => {
        const track = event.target.closest('[data-track-id]');
        if (!track) return;
        state.selectedTrack = track.dataset.trackId;
        this.renderTracks();
      });
      $('#curriculum-search')?.addEventListener('input', () => this.renderTracks());
    },
    async loadCurriculum() {
      const response = await fetch('data/curriculum/tracks.json', {cache:'no-cache'});
      if (!response.ok) throw new Error('Não foi possível carregar o mapa curricular.');
      state.curriculum = await response.json();
      if (state.curriculum.tracks?.length && !state.selectedTrack) state.selectedTrack = state.curriculum.tracks[0].id;
    },
    renderTracks() {
      const container = $('#curriculum-track-list');
      if (!container) return;
      if (!state.curriculum) {
        container.innerHTML = '<p class="content-note">Mapa curricular indisponível. Confira a conexão e recarregue a página.</p>';
        return;
      }
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
    }
  };
  global.MindForge = global.MindForge || {};
  global.MindForge.LearningUI = moduleApi;
})(window, document);
