# Carebridge Triage - Backend Proxy Server
# Serves static files + proxies AI requests to NVIDIA API (no CORS issues)

import http.server
import json
import urllib.request
import os
import mimetypes

# === CONFIG ===
PORT = 3000
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY")
if not NVIDIA_API_KEY:
    print("ERROR: NVIDIA_API_KEY environment variable not set.")
    print("Set it with:   $env:NVIDIA_API_KEY=\"nvapi-...\"   (PowerShell)")
    exit(1)
NVIDIA_BASE = "https://integrate.api.nvidia.com/v1"
AI_MODELS = ["mistralai/mistral-nemotron", "meta/llama-4-maverick-17b-128e-instruct", "step-3.5-flash"]
STATIC_DIR = os.path.dirname(os.path.abspath(__file__))

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/chat":
            self.handle_chat()
        else:
            self.send_error(404)

    def handle_chat(self):
        try:
            content_length = int(self.headers["Content-Length"])
            body = json.loads(self.rfile.read(content_length))
            prompt = body.get("prompt", "")
            max_tokens = body.get("max_tokens", 300)
            temperature = body.get("temperature", 0.3)

            # Try each model in order until one works
            last_error = None
            for model in AI_MODELS:
                try:
                    payload = json.dumps({
                        "model": model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": temperature,
                        "max_tokens": max_tokens
                    }).encode("utf-8")

                    req = urllib.request.Request(
                        NVIDIA_BASE + "/chat/completions",
                        data=payload,
                        headers={
                            "Authorization": "Bearer " + NVIDIA_API_KEY,
                            "Content-Type": "application/json"
                        },
                        method="POST"
                    )
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        result = json.loads(resp.read())
                        self.send_response(200)
                        self.send_cors_headers()
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(json.dumps(result).encode("utf-8"))
                        return
                except urllib.error.HTTPError as e:
                    last_error = str(e.code)
                    if e.code == 429:
                        continue  # Try next model
                    break
                except Exception as e:
                    last_error = str(e)
                    continue

            # All models failed
            self.send_response(503)
            self.send_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": "all_models_failed",
                "detail": last_error or "unknown",
                "fallback": True
            }).encode("utf-8"))

        except Exception as e:
            self.send_response(400)
            self.send_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    # Override to serve static files with correct paths
    def translate_path(self, path):
        path = path.split("?", 1)[0]
        path = path.split("#", 1)[0]
        if not path or path == "/":
            path = "/triage.html"
        # Remove leading / and join with static dir
        rel = path.lstrip("/")
        full = os.path.join(STATIC_DIR, rel)
        return full


if __name__ == "__main__":
    print("Carebridge Triage Server running on http://localhost:" + str(PORT))
    print("Static files from:", STATIC_DIR)
    print("AI models:", ", ".join(AI_MODELS))
    print("Press Ctrl+C to stop")
    server = http.server.HTTPServer(("0.0.0.0", PORT), ProxyHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
        server.server_close()
