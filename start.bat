@echo off
color D
echo Checking dependencies...

if exist node_modules (
  echo Dependencies are installed.
) else (
  echo Dependencies are not installed...
  echo Installing dependencies...
  npm install
)

echo Checking .env file...
if exist .env (
  echo .env file exists!
) else (
  echo .env does not exist.
  echo Creating .env file...
  echo token = "" > .env
  echo clientID = "" >> .env
)
timeout /t 3 >nul
cls
node ./src/index.js
pause >nul
