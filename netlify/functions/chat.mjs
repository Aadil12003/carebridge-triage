const NVIDIA_KEY = process.env.NVIDIA_API_KEY;

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { prompt, temperature = 0.3, max_tokens = 300 } = JSON.parse(event.body);
    const models = ['mistralai/mistral-nemotron', 'meta/llama-4-maverick-17b-128e-instruct', 'step-3.5-flash'];
    let lastErr = null;

    for (const model of models) {
      try {
        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + NVIDIA_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }], temperature, max_tokens })
        });
        if (!response.ok) { if (response.status === 429) continue; throw new Error('HTTP ' + response.status); }
        const data = await response.json();
        return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) };
      } catch (e) { lastErr = e.message; if (String(e).includes('429')) continue; }
    }

    return { statusCode: 503, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'all_models_failed', detail: lastErr }) };
  } catch (e) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: e.message }) };
  }
}
