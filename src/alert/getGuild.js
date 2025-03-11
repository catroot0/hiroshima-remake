import readline from "readline";
import { client } from "../index.js";
import logger from "../logging/logger.js";
import { centerText } from "./welcome.js";
import pc from "picocolors";
import nuke from "../nuke/nuke.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let guilds = [];
let guildIndex = 1;
var selectedGuild = null;

async function askForServerNumber() {
  rl.question(pc.yellow("Enter The Server Number: "), async (number) => {
    const guildNumber = Number(number);

    if (
      !Number.isInteger(guildNumber) ||
      guildNumber < 1 ||
      guildNumber >= guildIndex
    ) {
      console.log(pc.red("Invalid server number. Please try again."));
      await logger.error(`Invalid server number: ${guildNumber}`);
      return askForServerNumber(); // Ask again if invalid
    }

    selectedGuild = guilds[guildNumber - 1];
    await logger.info(
      `User selected ${selectedGuild.name} (ID: ${selectedGuild.id})`
    );

    rl.close();
    nuke();
  });
}

async function getGuild() {
  await logger.info("Fetching servers for nuking...");

  // Reset guildIndex to 1 each time we fetch guilds
  guildIndex = 1;

  guilds = client.guilds.cache.map((guild) => ({
    index: guildIndex++,
    name: guild.name,
    id: guild.id,
  }));

  if (guilds.length === 0) {
    console.log(pc.red("No servers found."));
    await logger.warn("No servers available.");
    rl.close();
    return;
  }

  guilds.forEach((guild) => {
    console.log(pc.cyan(centerText(`${guild.index}: ${guild.name}`)));
  });

  askForServerNumber();
}

export { getGuild, selectedGuild };
