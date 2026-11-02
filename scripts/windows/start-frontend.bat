@echo off
setlocal
cd /d "%~dp0..\.."
py -3 -m http.server 5500
