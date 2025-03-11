import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import logger from "./logging/logger.js";
import { welcome } from "./alert/welcome.js";
import pc from "picocolors";
config();
const token = process.env.token;
const clientID = process.env.clientID;

if (!token) {
  await logger.error("Bot token is missing!");
  console.error("Bot token is missing! Please check your .env file.");
  console.error("Press any key to exit.");
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

client.once("ready", async () => {
  await logger.info("Bot is ready!");
  welcome();
});
client.on("guildDelete", async (guild) => {
  await logger.warn(`bot got kicked from ${guild.name}, (id: ${guild.id})`);
  console.log(pc.red(`bot got kicked from ${guild.name}, (id: ${guild.id})`));
  console.log(
    pc.red(`exiting the process, press any key to close the window.`)
  );
  process.exit(1);
});
async function loginBot() {
  try {
    await logger.info("Logging in...");
    await client.login(token);
    await logger.info("Login successful!");
  } catch (error) {
    await logger.error("Login failed!");
    await logger.error(error.stack || error.message || error);

    if (error.syscall === "connect") {
      console.error("Network error! Please check your internet connection.");
    } else if (error.name === "ConnectTimeoutError") {
      console.error("Network error! Please check your internet connection.");
    } else {
      console.error("An unexpected error occurred. Restart the bot.");
    }
    setTimeout(() => {
      console.error("Press any key to exit.");
      process.exit(1);
    }, 500);
  }
}
loginBot();
export { client, clientID };
