@echo off
cd /d "%~dp0"

echo === [1/3] Server: install and database ===
cd server
if not exist .env copy .env.example .env
call npm install
call npx prisma migrate dev --name init
cd ..

echo === [2/3] Client: install ===
cd client
call npm install
cd ..

echo === [3/3] Starting ===
start "SERVER" cmd /k "cd /d %~dp0server && npm run dev"
start "CLIENT" cmd /k "cd /d %~dp0client && npm run dev"
timeout /t 6 >nul
start http://localhost:5173

echo.
echo Done. Two windows opened (SERVER and CLIENT). Close them to stop.
pause
