@echo off
setlocal
cd /d "%~dp0..\..\backend"
if not exist ".venv\Scripts\python.exe" (
  py -3 -m venv .venv
  if errorlevel 1 goto :error
)
".venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 goto :error
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto :error
".venv\Scripts\python.exe" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
exit /b %errorlevel%
:error
echo Falha ao preparar ou iniciar o backend. Confira se o Python 3.11+ esta instalado.
pause
exit /b 1
