import { promises as fs } from "fs";
import path from "path";

const logsDir = path.resolve("logs");

class Logger {
  constructor() {
    this.logFilePath = path.join(logsDir, `logs-${this.getTimestamp()}.log`);
    this.ensureLogsDir();
  }

  async ensureLogsDir() {
    try {
      await fs.mkdir(logsDir, { recursive: true });
    } catch (err) {
      console.error("[Logger] Failed to create logs directory:", err);
    }
  }

  getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, "-");
  }

  async log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    try {
      await fs.appendFile(this.logFilePath, logEntry, "utf8");
    } catch (err) {
      console.error("[Logger] Failed to write log:", err);
    }
  }

  async info(message) {
    await this.log("info", message);
  }

  async warn(message) {
    await this.log("warn", message);
  }

  async error(message) {
    await this.log("error", message);
  }
}

const logger = new Logger();
export default logger;
