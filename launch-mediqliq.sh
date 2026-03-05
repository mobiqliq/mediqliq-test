#!/bin/bash
echo "🚀 Mediqliq Health OS: Syncing Body & Brain..."

# 1. Database Check
if ! pg_isready -h localhost -p 5432 >/dev/null 2>&1; then
    echo "❌ ERROR: PostgreSQL is not running."
    exit 1
fi

# 2. Launching with Synchronization
# This starts React, then waits for port 3000, then starts Electron
npx concurrently \
  --kill-others \
  "BROWSER=none npm run start:react" \
  "npx wait-on http://127.0.0.1:3000 && npm run start:electron"
