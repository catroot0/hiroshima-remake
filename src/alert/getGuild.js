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
  try {
    rl.question(pc.yellow("Enter The Server Number: "), (number) => {
      var guildNumber = Number(number);

      if (isNaN(guildNumber) || guildNumber < 1 || guildNumber >= guildIndex) {
        console.log(pc.red("Invalid server number. Please try again."));
        logger.error(`invalid server number. (${guildNumber})`);
        askForServerNumber();
      } else {
        selectedGuild = guilds[guildNumber - 1];
        console.log(pc.green(`Nuking: ${selectedGuild.name}`));
        logger.info(`user selected ${selectedGuild.name}`);
        rl.close();
        nuke();
        return selectedGuild;
      }
    });
  } catch (error) {
    console.log(pc.red("An unexpected error occurred. Restart the bot."));
    logger.error("An unexpected error occurred");
    logger.error(error);
  }
}
function getGuild() {
  logger.info("asking the user to nuke a server.");
  client.guilds.cache.forEach((guild) => {
    guilds.push({
      index: guildIndex,
      name: `${guild.name}`,
      id: `${guild.id}`,
    });
    guildIndex++;
  });

  guilds.forEach((guild) => {
    console.log(pc.cyan(`${centerText(`${guild.index}: ${guild.name}`)}`));
  });
  askForServerNumber();
}
export { getGuild, selectedGuild };
