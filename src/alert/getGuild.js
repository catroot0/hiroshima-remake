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
let selectedGuild = null;

async function askForServerNumber() {
  rl.question(pc.yellow("Enter The Server Number: "), async (number) => {
    const guildNumber = Number(number);

    if (
      !Number.isInteger(guildNumber) ||
      guildNumber < 1 ||
      guildNumber > guilds.length
    ) {
      console.log(pc.red("Invalid server number. Please try again."));
      await logger.error(`Invalid server number: ${guildNumber}`);
      return askForServerNumber(); // Ask again if invalid
    }

    selectedGuild = guilds[guildNumber - 1];
    console.log(pc.green(`Nuking: ${selectedGuild.name}`));

    await logger.info(
      `User selected ${selectedGuild.name} (ID: ${selectedGuild.id})`
    );

    rl.close();
    nuke();
  });
}

async function getGuild() {
  try {
    await logger.info("Fetching servers for nuking...");

    guilds = client.guilds.cache.map((guild, index) => ({
      index: index + 1, // Ensure correct numbering
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
  } catch (error) {
    console.error(pc.red("Error fetching guilds:"), error);
    await logger.error(`Error fetching guilds: ${error.message}`);
    rl.close();
  }
}

export { getGuild, selectedGuild };
