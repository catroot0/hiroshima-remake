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

function askForServerNumber() {
  rl.question(pc.yellow("Enter The Server Number: "), (number) => {
    const guildNumber = Number(number);

    if (
      !Number.isInteger(guildNumber) ||
      guildNumber < 1 ||
      guildNumber >= guildIndex
    ) {
      console.log(pc.red("Invalid server number. Please try again."));
      logger.error(`Invalid server number: ${guildNumber}`);
      return askForServerNumber(); // Ask again if invalid
    }

    selectedGuild = guilds[guildNumber - 1];
    console.log(pc.green(`Nuking: ${selectedGuild.name}`));
    logger.info(
      `User selected ${selectedGuild.name} (ID: ${selectedGuild.id})`
    );

    rl.close();
    nuke();
  });
}

function getGuild() {
  logger.info("Fetching servers for nuking...");

  guilds = client.guilds.cache.map((guild) => ({
    index: guildIndex++,
    name: guild.name,
    id: guild.id,
  }));

  if (guilds.length === 0) {
    console.log(pc.red("No servers found."));
    logger.warn("No servers available.");
    rl.close();
    return;
  }

  guilds.forEach((guild) => {
    console.log(pc.cyan(centerText(`${guild.index}: ${guild.name}`)));
  });

  askForServerNumber();
}

export { getGuild, selectedGuild };
