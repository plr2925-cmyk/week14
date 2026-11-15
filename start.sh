#!/bin/bash
cd "$(dirname "$0")"

echo "=== [1/3] Server: install and database ==="
cd server
[ -f .env ] || cp .env.example .env
npm install
npx prisma migrate dev --name init
cd ..

echo "=== [2/3] Client: install ==="
cd client
npm install
cd ..

echo "=== [3/3] Starting ==="
(cd server && npm run dev) &
(cd client && npm run dev) &
sleep 6
echo "Open http://localhost:5173 (Ctrl+C to stop)"
wait
