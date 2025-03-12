import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import logger from "./logging/logger.js";
import { welcome } from "./alert/welcome.js";
import pc from "picocolors";

// Load environment variables from .env file
config();

// Retrieve the bot token and client ID from environment variables
const token = process.env.token;
const clientID = process.env.clientID;

// Check if the token is missing
if (!token) {
  // Log error if token is missing
  await logger.error("Bot token is missing!");
  console.error("Bot token is missing! Please check your .env file.");
  console.error("Press any key to exit.");
  // Exit the process with a failure code
  process.exit(1);
}

// Create a new Discord client instance with specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Intent to access guilds
    GatewayIntentBits.GuildMembers, // Intent to access guild members
    GatewayIntentBits.GuildMessages, // Intent to access guild messages
    GatewayIntentBits.MessageContent, // Intent to access message content
    GatewayIntentBits.GuildModeration, // Intent for guild moderation (bans, kicks, etc.)
  ],
});

// Event handler for when the bot is ready and connected
client.once("ready", async () => {
  // Log when the bot is ready
  await logger.info("Bot is ready!");
  // Call the welcome function to send a welcome message
  welcome();
});

// Event handler for when the bot is removed from a guild (server)
client.on("guildDelete", async (guild) => {
  // Log and display a warning when the bot gets kicked from a guild
  await logger.warn(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
  console.log(pc.red(`Bot got kicked from ${guild.name}, (id: ${guild.id})`));
  console.log(
    pc.red(`Exiting the process, press any key to close the window.`)
  );
  // Exit the process when the bot is removed from the guild
  process.exit(1);
});

// Function to log in the bot
async function loginBot() {
  try {
    // Log that the bot is attempting to log in
    await logger.info("Logging in...");
    // Attempt to log in with the provided token
    await client.login(token);
    // Log success if login is successful
    await logger.info("Login successful!");
  } catch (error) {
    // Log error if login fails
    await logger.error("Login failed!");
    await logger.error(error.stack || error.message || error);

    // Specific error handling based on the type of error
    if (error.syscall === "connect") {
      console.error("Network error! Please check your internet connection.");
    } else if (error.name === "ConnectTimeoutError") {
      console.error("Network error! Please check your internet connection.");
    } else {
      console.error("An unexpected error occurred. Restart the bot.");
    }

    // After logging the error, prompt the user to exit the process
    setTimeout(() => {
      console.error("Press any key to exit.");
      process.exit(1);
    }, 500);
  }
}

// Call the login function to start the bot login process
loginBot();

// Export the client and clientID for use in other parts of the application
export { client, clientID };
