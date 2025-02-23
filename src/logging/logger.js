import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

class Logger {
  constructor() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    this.logFilePath = path.join(logsDir, `logs-${timestamp}.txt`);
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFile(this.logFilePath, logEntry, (err) => {
      if (err) console.error("Failed to write log:", err);
    });
  }

  info(message) {
    this.log("INFO", message);
  }

  warn(message) {
    this.log("WARN", message);
  }

  error(message) {
    this.log("ERROR", message);
  }
}

export default new Logger();
