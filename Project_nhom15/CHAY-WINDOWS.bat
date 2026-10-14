@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 goto run_py
where python >nul 2>nul
if not errorlevel 1 goto run_python
echo May chua co Python. Mo thu muc bang VS Code va dung Live Server.
goto end
:run_py
py -3 server.py 8000 --open
goto end
:run_python
python server.py 8000 --open
:end
pause
