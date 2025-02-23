import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import logger from "./logging/logger.js";
import { welcome } from "./alert/welcome.js";
config();
const token = process.env.TOKEN;

if (!token) {
  logger.error("Bot token is missing! Please check your .env file.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
});

client.once("ready", () => {
  logger.info("✅ Bot is ready!");
  welcome();
});

async function loginBot() {
  try {
    logger.info("🔄 Logging in...");
    await client.login(token);
    logger.info("✅ Login successful!");
  } catch (error) {
    logger.error("❌ Login failed!");
    logger.error(error.stack || error.message || error);

    if (error.syscall === "connect") {
      console.error("⚠️ Network error! Please check your internet connection.");
    } else {
      console.error("🚨 An unexpected error occurred. Restart the bot.");
    }
    setTimeout(() => {
      console.error("Press any key to exit.");
      process.exit(1);
    }, 500);
  }
}
loginBot();
export default client;
