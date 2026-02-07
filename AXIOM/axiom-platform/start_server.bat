@echo off
echo Starting AXIOM Platform...
cd /d "%~dp0"
echo Server starting at http://localhost:3000
echo script bypass active...
cmd /c "npm run dev"
pause
