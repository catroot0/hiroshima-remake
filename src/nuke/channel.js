import { PermissionsBitField } from "discord.js";
import { bot, guild } from "./role.js";
import pc from "picocolors";
import logger from "../logging/logger.js";

export default async function deleteAllChannels() {
  let deletableChannels = guild.channels.cache.filter(
    (channel) => channel.deletable
  );
  if (deletableChannels.size === 0) {
    logger.warn("No channel available for deletion.");
    console.log(pc.yellow("No deletable channels found."));
    return;
  }
}
