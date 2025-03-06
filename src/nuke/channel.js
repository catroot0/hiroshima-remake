import { guild } from "./role.js";
import pc from "picocolors";
import logger from "../logging/logger.js";

export default async function deleteAllChannels() {
  try {
    let deletableChannels = guild.channels.cache.filter(
      (channel) => channel.deletable
    );
    let deletedChannels = 0;
    for (const channel of deletableChannels.values()) {
      try {
        logger.info(
          `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
          )
        );
        await channel.delete();
        logger.info(`Deleted channel: '${channel.name}' (${channel.id})`);
        deletedChannels++;
      } catch (error) {
        logger.error(`Failed to delete '${channel.name}': ${error.message}`);
        console.log(pc.red(`Skipping '${channel.name}' due to error.`));
      }
    }

    logger.info(`Channel deletion complete. Total deleted: ${deletedChannels}`);
    console.log(
      pc.cyan(`Channel deletion finished. Deleted ${deletedChannels} channels.`)
    );

    if (deletableChannels.size === 0) {
      logger.warn("No channel available for deletion.");
      console.log(pc.yellow("No deletable channels found."));
      return;
    }
  } catch (error) {
    logger.error(`Error in deleteAllChannels: ${error.message}`);
    console.error(pc.red(`Unexpected error: ${error.message}`));
  }
}
