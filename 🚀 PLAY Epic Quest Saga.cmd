@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ========================================
echo    EPIC QUEST SAGA - Game Launcher
echo ========================================
echo.

REM Start the Python HTTP server in the background
echo [*] Starting local game server...
start "" python serve_epic_quest_saga.py "Epic-Quest-Saga\artifacts\continuity-app\dist\public" 4173

REM Wait for server to start
timeout /t 2 /nobreak > nul

REM Find Chrome
set "CHROME_EXE="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
) else if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" (
    set "CHROME_EXE=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
)

if defined CHROME_EXE (
    echo [*] Opening game in Chrome...
    start "" "!CHROME_EXE!" --new-window http://127.0.0.1:4173/
) else (
    echo [!] Chrome not found. Opening in default browser...
    start "" http://127.0.0.1:4173/
)

echo.
echo [✓] Game server running at: http://127.0.0.1:4173/
echo [*] You can close this window - the server will keep running
echo [*] To stop the server, use Task Manager to end python.exe
echo.
pause
