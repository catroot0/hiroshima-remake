@echo off
echo Checking dependencies...

:: Check if npm is available
where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed. Please install Node.js from https://nodejs.org.
  pause
  exit /b
)

:: Check if node_modules directory exists
if exist node_modules (
  echo Dependencies are installed.
) else (
  echo Dependencies are not installed...
  echo Installing dependencies...
  npm install
  if errorlevel 1 (
    echo Failed to install dependencies. Please check the error messages above.
    pause
    exit /b
  )
  echo Dependencies installed successfully.
  echo Please restart the bot.
  pause
)

echo Checking .env file...
if exist .env (
  echo .env file exists!
) else (
  echo .env does not exist.
  echo Creating .env file...
  echo token = "" > .env
)

timeout /t 3 >nul
cls

node ./src/index.js

pause >nul
