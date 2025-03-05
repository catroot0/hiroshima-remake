import { promises as fs } from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "logs");

async function ensureLogsDir() {
  try {
    await fs.mkdir(logsDir, { recursive: true });
  } catch (err) {
    console.error("Failed to create logs directory:", err);
  }
}

await ensureLogsDir();

class Logger {
  constructor() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    this.logFilePath = path.join(logsDir, `logs-${timestamp}.txt`);
  }

  async log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    try {
      await fs.appendFile(this.logFilePath, logEntry);
    } catch (err) {
      console.error("Failed to write log:", err);
    }
  }

  async info(message) {
    await this.log("INFO", message);
  }

  async warn(message) {
    await this.log("WARN", message);
  }

  async error(message) {
    await this.log("ERROR", message);
  }
}
const logger = new Logger();
export default logger;
