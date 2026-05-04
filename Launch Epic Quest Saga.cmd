@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%Epic-Quest-Saga"
set "DIST_DIR=%PROJECT_ROOT%\artifacts\continuity-app\dist\public"
set "SERVER_SCRIPT=%SCRIPT_DIR%serve_epic_quest_saga.py"
set "MANIFEST=%SCRIPT_DIR%local_sources.json"
set "PORT=4173"
call :set_url

if not exist "%DIST_DIR%\index.html" (
  echo Build output was not found at:
  echo %DIST_DIR%
  echo.
  echo The app needs to be built before it can be launched.
  pause
  exit /b 1
)

if not exist "%SERVER_SCRIPT%" (
  echo Local server script was not found at:
  echo %SERVER_SCRIPT%
  pause
  exit /b 1
)

if not exist "%MANIFEST%" (
  echo Local source manifest was not found at:
  echo %MANIFEST%
  pause
  exit /b 1
)

set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_EXE%" set "CHROME_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME_EXE%" set "CHROME_EXE=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

call :check_spa_server
if errorlevel 1 (
  call :check_root_server
  if not errorlevel 1 (
    call :stop_python_on_port
  )
)

call :check_spa_server
if errorlevel 1 (
  call :start_server
  if errorlevel 1 exit /b 1
)

if exist "%CHROME_EXE%" (
  start "" "%CHROME_EXE%" --new-window "%URL%"
) else (
  start "" "%URL%"
)

exit /b 0

:set_url
set "ROOT_URL=http://127.0.0.1:%PORT%/"
set "SOURCES_URL=http://127.0.0.1:%PORT%/sources"
set "URL=%ROOT_URL%?v=%RANDOM%%RANDOM%"
exit /b 0

:check_spa_server
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -Uri '%ROOT_URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; Invoke-WebRequest -Uri '%SOURCES_URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; $source = Invoke-WebRequest -Uri '%ROOT_URL%source/upgrade-plan' -UseBasicParsing -TimeoutSec 2; if ($source.Content -notmatch '# Epic Quest Saga Upgrade Plan') { exit 1 }; exit 0 } catch { exit 1 }" >nul 2>&1
exit /b %errorlevel%

:check_root_server
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -Uri '%ROOT_URL%' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
exit /b %errorlevel%

:stop_python_on_port
powershell -NoProfile -ExecutionPolicy Bypass -Command "$connections = Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue; foreach ($connection in $connections) { $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue; if ($process -and $process.ProcessName -like 'python*') { Stop-Process -Id $process.Id -Force } }; Start-Sleep -Milliseconds 500" >nul 2>&1
exit /b 0

:start_server
where py >nul 2>&1
if not errorlevel 1 (
  start "Epic Quest Saga Server" /MIN py "%SERVER_SCRIPT%" "%DIST_DIR%" %PORT% --manifest "%MANIFEST%"
) else (
  where python >nul 2>&1
  if errorlevel 1 (
    echo Python was not found on this PC.
    echo Install Python or use a different local web server to launch the build.
    pause
    exit /b 1
  )
  start "Epic Quest Saga Server" /MIN python "%SERVER_SCRIPT%" "%DIST_DIR%" %PORT% --manifest "%MANIFEST%"
)

for /L %%I in (1,1,15) do (
  call :check_spa_server
  if not errorlevel 1 exit /b 0
  timeout /t 1 /nobreak >nul
)

echo The local server did not start at %URL%.
pause
exit /b 1
