@echo off
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo Git is not installed. Install it from git-scm.com and run this file again.
  pause
  exit /b
)

echo.
echo Create a NEW EMPTY repository on GitHub (name: notes-app, no README), then paste its URL.
set /p URL=Repository URL (https://github.com/.../notes-app.git): 
set /p NAME=Your name in latin letters: 
set /p EMAIL=Your GitHub email: 

git init
git config user.name "%NAME%"
git config user.email "%EMAIL%"
git add .
git commit -m "Notes app with auth"
git branch -M main
git remote add origin %URL%
git push -u origin main

echo.
echo DONE. Your code is on GitHub. Now go to Render and Vercel.
pause
