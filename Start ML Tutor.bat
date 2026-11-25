@echo off
rem ML Tutor - run your own copy properly (ChatGPT sign-in and the AI tutor need a web address, not a file).
title ML Tutor - keep this window open while you learn
cd /d "%~dp0"
set "PORT=8770"
set "URL=http://127.0.0.1:%PORT%/"

rem Already running? Just open it in the browser.
curl -s -o nul "%URL%" && (start "" "%URL%" & exit /b 0)

set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY (where py >nul 2>nul && set "PY=py")
if not defined PY (
  echo Python was not found, so opening the online version instead...
  start "" "https://wangdencerpa12345-star.github.io/ml-sikshya/"
  timeout /t 5 >nul
  exit /b 0
)

echo.
echo    ML Tutor is running at %URL%
echo    Keep this window open while you learn. Close it to stop.
echo.
start "" /min cmd /c "ping -n 3 127.0.0.1 >nul & start %URL%"
%PY% -m http.server %PORT% --bind 127.0.0.1
