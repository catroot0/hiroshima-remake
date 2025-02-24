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
var guild = null;
function askForServerNumber() {
  rl.question("Enter The Server Number: ", (number) => {
    var guildNumber = Number(number);

    if (isNaN(guildNumber) || guildNumber < 1 || guildNumber >= guildIndex) {
      console.log("Invalid server number. Please try again.");
      logger.error(`invalid server number. (${guildNumber})`);
      askForServerNumber();
    } else {
      guild = guilds[guildNumber - 1];
      console.log(`Nuking: ${guild.name}`);
      logger.info(`user selected ${guild.name}`);
      rl.close();
      return guild;
    }
  });
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
    console.log(`${centerText(`${guild.index}: ${guild.name}`)}`);
  });
  askForServerNumber();
}
export { getGuild, guild };
