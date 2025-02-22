import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { welcome } from "./welcome.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
});
config();
const token = process.env.token;
client.on("ready", () => {
  welcome();
});
client.login(token);
