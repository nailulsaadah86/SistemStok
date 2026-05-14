@echo off
echo ==========================================
echo    STARTING STOCK MANAGEMENT SYSTEM
echo ==========================================

echo [1/2] Starting Backend Server (Port 5000)...
start cmd /k "cd backend && npm install && npm run start"

echo [2/2] Starting Frontend Server (Port 5173)...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Aplikasi sedang dijalankan...
echo 1. Tampilan Dashboard: http://localhost:5173
echo 2. Server API: http://localhost:5000
echo.
echo Jika terminal menutup tiba-tiba, pastikan Node.js sudah terinstal.
pause
