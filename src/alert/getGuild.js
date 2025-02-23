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
  rl.question("Enter The Server Number: ", (number) => {});
}
export default getGuild;
