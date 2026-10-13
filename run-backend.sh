#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

PYTHON="${PYTHON:-python3}"
PORT="${PORT:-8765}"

# Pick the first available local port starting at the preferred port.
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

echo "Starting piano backend at http://127.0.0.1:${PORT}/"
exec "$PYTHON" "$ROOT/scripts/full-piano-server.py" --port "$PORT" --open
