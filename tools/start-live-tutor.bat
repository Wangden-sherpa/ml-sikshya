@echo off
title ML Sikshya - Live Human Tutor (private key server)
echo Starting the private key server for the Live Human Tutor...
echo Keep this window open while you use the live tutor. Close it to stop.
echo.
python "%~dp0nuance_token_server.py"
pause
