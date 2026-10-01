@echo off
cd /d "%~dp0"
if not exist .env (
  echo Missing .env. Copy .env.example to .env, add your NVIDIA NIM key, then run this again.
  pause
  exit /b 1
)
start "Pathfinder local server" cmd /k "cd /d "%~dp0" ^&^& npm start"
timeout /t 2 /nobreak >nul
start "" http://localhost:3000
