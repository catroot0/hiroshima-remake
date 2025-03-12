import { promises as fs } from "fs"; // Import the 'fs' module to handle file operations asynchronously
import path from "path"; // Import the 'path' module to work with file and directory paths

const logsDir = path.resolve("logs"); // Resolve the path to the 'logs' directory

class Logger {
  constructor() {
    // Initialize the log file path with a timestamp to avoid overwriting logs
    this.logFilePath = path.join(logsDir, `logs-${this.getTimestamp()}.log`);
    this.ensureLogsDir(); // Ensure the 'logs' directory exists (if not, it will be created)
  }

  // Ensure the 'logs' directory exists, creating it if necessary
  async ensureLogsDir() {
    try {
      await fs.mkdir(logsDir, { recursive: true }); // Create the logs directory if it doesn't exist
    } catch (err) {
      console.error("[Logger] Failed to create logs directory:", err); // Log an error if directory creation fails
    }
  }

  // Get a timestamp string formatted as ISO (replacing colons and periods for valid filenames)
  getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, "-"); // Convert timestamp to a valid string format for file naming
  }

  // General method to log messages to the log file
  async log(level, message) {
    const timestamp = new Date().toISOString(); // Generate a timestamp for the log entry
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`; // Format the log entry

    try {
      await fs.appendFile(this.logFilePath, logEntry, "utf8"); // Append the log entry to the log file asynchronously
    } catch (err) {
      console.error("[Logger] Failed to write log:", err); // Log an error if file writing fails
    }
  }

  // Method to log informational messages
  async info(message) {
    await this.log("info", message); // Call the log method with 'info' level
  }

  // Method to log warning messages
  async warn(message) {
    await this.log("warn", message); // Call the log method with 'warn' level
  }

  // Method to log error messages
  async error(message) {
    await this.log("error", message); // Call the log method with 'error' level
  }
}

// Instantiate the Logger class to create a logger instance
const logger = new Logger();
export default logger; // Export the logger instance for use in other parts of the application
