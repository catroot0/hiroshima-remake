import readline from "readline";
import client from "../index.js";
import logger from "../logging/logger.js";
import { centerText } from "./welcome.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let guilds = [];
let guildIndex = 1;

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
    console.log(`${centerText(`${guild.index}: ${guild.name}`)}`);
  });

  function askForServerNumber() {
    rl.question("Enter The Server Number: ", (number) => {
      const guildNumber = Number(number);

      if (isNaN(guildNumber) || guildNumber < 1 || guildNumber >= guildIndex) {
        console.log("Invalid server number. Please try again.");
        logger.error(`invalid server number. (${guildNumber})`);
        askForServerNumber();
      } else {
        console.log(`Nuking: ${guilds[guildNumber - 1].name}`);
        logger.info(`user selected ${guilds[guildNumber - 1].name}`);
        rl.close();
      }
    });
  }

  askForServerNumber();
}

export default getGuild;
