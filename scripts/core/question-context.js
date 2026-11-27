(function (global) {
  'use strict';

  const DEPENDENCY_PATTERNS = [
    /de acordo com (?:o|a) texto/i,
    /segundo (?:o|a) autor/i,
    /no texto apresentado/i,
    /\\b(?:no|do|pelo) texto\\b/i,
    /a ideia central defendida no texto/i,
    /com base no texto/i,
    /a partir do texto/i,
    /no trecho/i,
    /o trecho (?:indica|sugere|apresenta|mostra)/i,
    /a expressão .{0,80} no texto/i,
    /com base no gráfico/i,
    /observando (?:o|a) tabela/i,
    /considerando os dados/i,
    /de acordo com a situação apresentada/i,
    /a partir do experimento/i,
    /segundo o modelo/i,
    /conforme (?:o|a) (?:texto|gráfico|tabela|modelo|experimento)/i
  ];

  function escapeHTML(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function promptOf(question) {
    if (Array.isArray(question)) return String(question[0] || '');
    return question && typeof question.prompt === 'string' ? question.prompt : '';
  }

  function requiresStimulus(question) {
    const prompt = promptOf(question);
    return DEPENDENCY_PATTERNS.some(pattern => pattern.test(prompt));
  }

  function imageSource(value) {
    const source = String(value || '').trim();
    if (/^(\.\/|\.\.\/|\/)[^\s"'<>]*$/.test(source)) return source;
    if (/^data:image\/(?:png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(source)) return source;
    return '';
  }

  function resolve(lesson, question) {
    if (!lesson || typeof lesson !== 'object') return null;
    const questionId = question && (question.stimulusId || question.contextId);
    if (questionId && Array.isArray(lesson.stimuli)) {
      const match = lesson.stimuli.find(item => item && item.id === questionId);
      if (match) return match;
    }
    if (question && question.stimulus && typeof question.stimulus === 'object') return question.stimulus;
    if (lesson.stimulus && typeof lesson.stimulus === 'object') return lesson.stimulus;
    if (typeof lesson.passage === 'string' && lesson.passage.trim()) {
      const firstLine = lesson.passage.trim().split(/\r?\n/, 1)[0];
      const title = firstLine.length <= 110 ? firstLine : 'Texto-base / situação-problema';
      return {
        kind: 'text',
        title,
        body: lesson.passage,
        author: lesson.authored ? 'Texto autoral do Mind Forge' : (lesson.author || 'Material de estudo'),
        sourceUrl: lesson.textSourceUrl || '',
        sourceLabel: lesson.textSourceLabel || '',
        referenceUrl: lesson.reference || '',
        referenceLabel: lesson.referenceLabel || ''
      };
    }
    if (typeof lesson.context === 'string' && lesson.context.trim()) {
      return { kind: 'text', title: lesson.contextTitle || 'Contexto da questão', body: lesson.context };
    }
    return null;
  }

  function hasStimulus(lesson, question) {
    const resolved = resolve(lesson, question);
    if (!resolved) return false;
    if (typeof resolved === 'string') return !!resolved.trim();
    return !!(resolved.body || resolved.text || resolved.content ||
      (Array.isArray(resolved.sections) && resolved.sections.length));
  }

  function textSection(section) {
    return '<section class="qc-section"><h4>' + escapeHTML(section.title || 'Informação') +
      '</h4><p>' + escapeHTML(section.content || section.text || '') + '</p></section>';
  }

  function tableSection(section) {
    const headers = Array.isArray(section.headers) ? section.headers : [];
    const rows = Array.isArray(section.rows) ? section.rows : [];
    if (!headers.length || !rows.length) return '';
    return '<div class="qc-table-wrap"><table class="qc-table">' +
      (section.caption ? '<caption>' + escapeHTML(section.caption) + '</caption>' : '') +
      '<thead><tr>' + headers.map(value => '<th scope="col">' + escapeHTML(value) + '</th>').join('') +
      '</tr></thead><tbody>' + rows.map(row => '<tr>' +
        headers.map((_, index) => '<td>' + escapeHTML(Array.isArray(row) ? row[index] : '') + '</td>').join('') +
      '</tr>').join('') + '</tbody></table></div>';
  }

  function chartSection(section) {
    const data = Array.isArray(section.data) ? section.data.filter(item =>
      item && Number.isFinite(Number(item.value))) : [];
    if (!data.length) return '';
    const maximum = Math.max(1, ...data.map(item => Math.max(0, Number(item.value))));
    if (section.chartType === 'line' && data.length > 1) {
      const points = data.map((item, index) => {
        const x = 24 + index * (252 / (data.length - 1));
        const y = 126 - (Math.max(0, Number(item.value)) / maximum) * 100;
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');
      const labels = data.map((item, index) => {
        const x = 24 + index * (252 / (data.length - 1));
        return '<text x="' + x.toFixed(1) + '" y="151" text-anchor="middle">' +
          escapeHTML(item.label || '') + '</text>';
      }).join('');
      return '<figure class="qc-chart"><figcaption>' + escapeHTML(section.caption || section.title || 'Gráfico') +
        '</figcaption><svg viewBox="0 0 300 160" role="img" aria-label="' +
        escapeHTML(section.alt || section.title || 'Gráfico de linhas') +
        '"><path d="M24 126H276" class="qc-axis"/><polyline points="' + points +
        '" class="qc-line"/>' + labels + '</svg></figure>';
    }
    return '<figure class="qc-chart"><figcaption>' + escapeHTML(section.caption || section.title || 'Gráfico') +
      '</figcaption><div class="qc-bars">' + data.map(item => {
        const width = Math.max(0, Math.min(100, Number(item.value) / maximum * 100));
        return '<div class="qc-bar-row"><span>' + escapeHTML(item.label || '') +
          '</span><div class="qc-bar-track" aria-hidden="true"><i style="width:' + width.toFixed(2) +
          '%"></i></div><b>' + escapeHTML(item.value) + '</b></div>';
      }).join('') + '</div></figure>';
  }

  function sectionMarkup(section) {
    if (!section || typeof section !== 'object') return '';
    switch (section.type) {
      case 'text': return textSection(section);
      case 'formula':
        return '<section class="qc-section"><h4>' + escapeHTML(section.title || 'Modelo / fórmula') +
          '</h4><div class="qc-formula"><code>' + escapeHTML(section.expression || section.content || '') +
          '</code></div>' + (section.explanation ? '<p>' + escapeHTML(section.explanation) + '</p>' : '') + '</section>';
      case 'table': return tableSection(section);
      case 'image': {
        const src = imageSource(section.src);
        return src ? '<figure class="qc-image"><img src="' + escapeHTML(src) + '" alt="' +
          escapeHTML(section.alt || 'Imagem de apoio') + '">' +
          (section.caption ? '<figcaption>' + escapeHTML(section.caption) + '</figcaption>' : '') +
          '</figure>' : '';
      }
      case 'chart': return chartSection(section);
      default: return '';
    }
  }

  function inspect(lesson, question) {
    const required = requiresStimulus(question);
    const available = hasStimulus(lesson, question);
    return {
      required,
      available,
      blocked: required && !available,
      stimulus: resolve(lesson, question)
    };
  }

  function render(lesson, question) {
    const state = inspect(lesson, question);
    if (state.blocked) {
      return '<aside class="qc-missing" role="alert"><strong>Questão indisponível.</strong> ' +
        'O material citado no enunciado não está cadastrado. Esta questão foi bloqueada para evitar uma resposta sem contexto.</aside>';
    }
    if (!state.available) return '';
    const stimulus = typeof state.stimulus === 'string' ? { body: state.stimulus } : state.stimulus;
    const sections = Array.isArray(stimulus.sections) ? stimulus.sections.map(sectionMarkup).join('') : '';
    const body = stimulus.body || stimulus.text || stimulus.content || '';
    const author = stimulus.author || '';
    const reference = stimulus.sourceUrl && /^https:\/\//i.test(stimulus.sourceUrl)
      ? '<a href="' + escapeHTML(stimulus.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHTML(stimulus.sourceLabel || 'Fonte do material') + ' ↗</a>' : '';
    const program = stimulus.referenceUrl && /^https:\/\//i.test(stimulus.referenceUrl)
      ? '<a href="' + escapeHTML(stimulus.referenceUrl) + '" target="_blank" rel="noopener noreferrer">' +
        escapeHTML(stimulus.referenceLabel || 'Referência de programa') + ' ↗</a>' : '';
    return '<section class="question-stimulus" aria-label="Texto-base e materiais necessários">' +
      '<div class="qc-heading"><span class="eyebrow">MATERIAL DE REFERÊNCIA</span>' +
      (stimulus.title ? '<h3>' + escapeHTML(stimulus.title) + '</h3>' : '') +
      (author ? '<p class="qc-author">' + escapeHTML(author) + '</p>' : '') + '</div>' +
      (body ? '<div class="qc-body">' + escapeHTML(body) + '</div>' : '') + sections +
      ((reference || program) ? '<div class="qc-source">' +
        (reference ? '<span>Fonte do material: ' + reference + '</span>' : '') +
        (program ? '<span>Programa de referência: ' + program + '</span>' : '') +
      '</div>' : '') + '</section>';
  }

  function audit(units) {
    const issues = [];
    (Array.isArray(units) ? units : []).forEach(lesson => {
      (Array.isArray(lesson && lesson.q) ? lesson.q : []).forEach((question, index) => {
        const state = inspect(lesson, question);
        if (state.blocked) issues.push({
          lessonId: lesson.id || 'unknown',
          questionIndex: index,
          prompt: promptOf(question)
        });
      });
    });
    return issues;
  }

  global.MindForgeQuestionContext = { resolve, requiresStimulus, hasStimulus, inspect, render, audit };
})(window);
