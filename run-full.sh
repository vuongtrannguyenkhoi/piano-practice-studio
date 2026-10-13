#!/bin/bash
# Full mode: one local server with everything: practice app, native SFZ / Ballad / NHIEN pianos, AI performance
# (VirtuosoNet, Pianist), sheet reading (PDF/SVG → MusicXML), DDSP audio and pre-rendered 30 fps video (FFmpeg, oXygen).
# Usage: ./run-full.sh            (Ctrl+C stops the server)
#        PORT=8800 ./run-full.sh  (preferred port; the next free one is used if taken)
#        NO_OPEN=1 ./run-full.sh  (do not open the browser)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

# Started from Finder or a bare shell, Homebrew tools (ffmpeg) may be missing from PATH.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
PYTHON="${PYTHON:-python3}"
PORT="${PORT:-8766}"

# VirtuosoNet / Pianist environment lives on a disk image; mount it when present and not mounted yet.
if [[ ! -x /Volumes/vnet-env/venv/bin/python && -f .virtuosonet/vnet-env.sparseimage ]]; then
  echo "Mounting the AI environment (vnet-env)..."
  hdiutil attach .virtuosonet/vnet-env.sparseimage -nobrowse >/dev/null || echo "Could not mount vnet-env: AI performance stays off."
fi

status_json() { curl -fsS --max-time 2 "http://127.0.0.1:$1/api/ai/status" 2>/dev/null; }

# AI Studio already running on the preferred port: just open it.
if status_json "$PORT" | grep -q '"composers"'; then
  echo "AI Studio is already running: http://127.0.0.1:${PORT}/ai-studio.html"
  [[ -n "${NO_OPEN:-}" ]] || open "http://127.0.0.1:${PORT}/ai-studio.html"
  exit 0
fi

# Otherwise take the first free port from the preferred one.
while ! "$PYTHON" - "$PORT" <<'PY'
import socket, sys
s = socket.socket()
try:
    s.bind(("127.0.0.1", int(sys.argv[1])))
except OSError:
    sys.exit(1)
else:
    s.close()
PY
do
  PORT=$((PORT + 1))
done

"$PYTHON" scripts/ai-studio-server.py --port "$PORT" &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null; wait "$SERVER" 2>/dev/null; echo; echo "Server stopped."' EXIT INT TERM

for _ in $(seq 1 60); do
  status_json "$PORT" >/dev/null && break
  kill -0 "$SERVER" 2>/dev/null || { echo "The server failed to start."; exit 1; }
  sleep 0.5
done

BASE="http://127.0.0.1:${PORT}"
echo
echo "Feature check:"
"$PYTHON" - "$BASE" <<'PY'
import json, sys, urllib.request
base = sys.argv[1]
get = lambda path: json.load(urllib.request.urlopen(base + path, timeout=5))
ai, video, piano = get('/api/ai/status'), get('/api/video/status'), get('/api/piano/status')
mark = lambda ok: 'ON ' if ok else 'off'
for model in ai.get('models', []):
    print(f"  [{mark(model.get('available'))}] AI performance · {model.get('name')}")
print(f"  [{mark(ai.get('omr', {}).get('available'))}] Sheet reading PDF/SVG → MusicXML (Audiveris)")
print(f"  [{mark(ai.get('ddsp', {}).get('available'))}] DDSP-Piano audio")
print(f"  [{mark(video.get('available'))}] Video pre-render 30 fps (FFmpeg)")
print(f"  [{mark(video.get('oxygen', {}).get('available'))}] oXygen piano mastering")
for item in piano.get('instruments', []):
    print(f"  [{mark(item.get('available'))}] Piano · {item.get('name', item.get('id'))}")
PY
echo
echo "Practice app: ${BASE}/"
echo "AI Studio:    ${BASE}/ai-studio.html"
echo "Press Ctrl+C to stop."
[[ -n "${NO_OPEN:-}" ]] || open "${BASE}/ai-studio.html"
wait "$SERVER"
