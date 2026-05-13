import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3000;
const DIR = path.dirname(fileURLToPath(import.meta.url));
const NVIDIA_KEY = process.env.NVIDIA_API_KEY;
if (!NVIDIA_KEY) {
  console.error('ERROR: NVIDIA_API_KEY environment variable not set.');
  console.error('Set it with:   $env:NVIDIA_API_KEY="nvapi-..."   (PowerShell)');
  process.exit(1);
}
const MIME = { '.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png' };

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Access-Control-Allow-Origin': '*' });
    res.end('Not found');
  }
}

async function proxyChat(req, res) {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const { prompt, temperature = 0.3, max_tokens = 300 } = JSON.parse(body);
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
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify(data));
          return;
        } catch (e) { lastErr = e.message; if (String(e).includes('429')) continue; }
      }

      res.writeHead(503, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: 'all_models_failed', detail: lastErr }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }
  if (req.method === 'POST' && req.url === '/api/chat') return proxyChat(req, res);

  // Serve static files
  let url = req.url.split('?')[0].split('#')[0];
  if (!url || url === '/') url = '/triage.html';
  const filePath = path.resolve(path.join(DIR, url));
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  serveFile(res, filePath);
}).listen(PORT, () => {
  console.log(`Carebridge Server on http://localhost:${PORT}`);
  console.log(`Static files: ${DIR}`);
  console.log(`AI: ${['mistralai/mistral-nemotron','meta/llama-4-maverick-17b-128e-instruct','step-3.5-flash'].join(', ')}`);
});
