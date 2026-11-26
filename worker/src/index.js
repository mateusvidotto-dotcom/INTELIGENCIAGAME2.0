const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

function corsHeaders(origin, env) {
  const allowed = env.SITE_ORIGIN || "https://mateusvidotto-dotcom.github.io";
  if (origin !== allowed) return { "Vary": "Origin" };
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...cors, "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);
    const url = new URL(request.url);

    if (origin !== (env.SITE_ORIGIN || "https://mateusvidotto-dotcom.github.io")) {
      return json({ error: "Origem não autorizada." }, 403, cors);
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "Mind Forge Tutor" }, 200, cors);
    }
    if (request.method !== "POST" || url.pathname !== "/api/tutor") {
      return json({ error: "Rota não encontrada." }, 404, cors);
    }
    if (!env.OPENAI_API_KEY) {
      return json({ error: "O segredo OPENAI_API_KEY ainda não foi configurado no Worker." }, 503, cors);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 12000) return json({ error: "Mensagem muito longa." }, 413, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Corpo JSON inválido." }, 400, cors);
    }

    const question = typeof body.question === "string" ? body.question.trim().slice(0, 3000) : "";
    const area = typeof body.area === "string" ? body.area.slice(0, 100) : "Estudo geral";
    const history = Array.isArray(body.history)
      ? body.history.slice(-8).map(item => ({
          role: item && item.role === "assistant" ? "Tutor" : "Estudante",
          content: typeof (item && item.content) === "string" ? item.content.slice(0, 1800) : ""
        })).filter(item => item.content)
      : [];

    if (!question) return json({ error: "Escreva uma pergunta antes de enviar." }, 400, cors);

    const transcript = history.map(item => item.role + ": " + item.content).join("\n\n");
    const input = [
      "Área escolhida: " + area,
      transcript ? "Contexto recente da conversa:\n" + transcript : "",
      "Nova pergunta do estudante:\n" + question
    ].filter(Boolean).join("\n\n");

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-6.2-astra",
        instructions: [
          "Você é o Tutor Mind Forge, um professor particular paciente, rigoroso e claro.",
          "Responda em português brasileiro, exceto quando ensinar inglês.",
          "Ensine o raciocínio, não apenas a resposta. Divida explicações difíceis em etapas e dê exemplos resolvidos.",
          "Quando o aluno pedir ajuda com um problema, comece com uma pista útil e ofereça a solução completa quando isso for apropriado.",
          "Em matemática olímpica, valorize provas, justificativas, casos e estratégias; não aceite apenas o resultado sem raciocínio.",
          "Em PAS/UEM e vestibulares, ajude com teoria, interpretação e prática; nunca invente que uma questão é oficial ou que um assunto está no edital sem evidência.",
          "Em inglês, ajuste a linguagem ao nível do estudante, corrija erros com gentileza e inclua exemplos naturais.",
          "Sinalize incertezas e recomende fontes oficiais quando a resposta depender de edital, data ou informação atual.",
          "Não afirme medir QI, inteligência geral ou diagnosticar condições. Não solicite dados pessoais."
        ].join(" "),
        input,
        max_output_tokens: 1000,
        store: false
      })
    });

    const raw = await upstream.text();
    let result;
    try { result = JSON.parse(raw); } catch { result = {}; }
    if (!upstream.ok) {
      return json({ error: "O provedor de IA respondeu com erro (" + upstream.status + "). Verifique o modelo e a configuração da API." }, 502, cors);
    }

    const answer = Array.isArray(result.output)
      ? result.output.flatMap(item => Array.isArray(item.content) ? item.content : [])
          .filter(item => item.type === "output_text" && typeof item.text === "string")
          .map(item => item.text).join("\n")
      : "";
    if (!answer) return json({ error: "A IA não retornou uma resposta em texto." }, 502, cors);

    return json({ answer }, 200, cors);
  }
};
