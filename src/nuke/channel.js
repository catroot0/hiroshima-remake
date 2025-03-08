import { guild } from "./role.js";
import pc from "picocolors";
import logger from "../logging/logger.js";

function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomEmojiString(length) {
  const emojiRanges = [
    [0x1f600, 0x1f64f], // Emoticons
    [0x1f300, 0x1f5ff], // Misc symbols and pictographs
    [0x1f680, 0x1f6ff], // Transport and map symbols
    [0x1f700, 0x1f77f], // Alchemical symbols
    [0x1f900, 0x1f9ff], // Supplemental symbols and pictographs
    [0x1fa70, 0x1faff], // More symbols
  ];
  let result = "";
  for (let i = 0; i < length; i++) {
    const range = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
    const emojiCode =
      Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    result += String.fromCodePoint(emojiCode);
  }
  return result;
}

class ChannelManager {
  async deleteAllChannels() {
    try {
      if (!guild || !guild.channels) {
        logger.error("Guild or channels not found.");
        console.log(pc.red("Error: Guild or channels not accessible."));
        return;
      }

      let deletableChannels = guild.channels.cache.filter(
        (channel) => channel.deletable
      );

      if (deletableChannels.size === 0) {
        logger.warn("No channel available for deletion.");
        console.log(pc.yellow("No deletable channels found."));
        return;
      }

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
          console.log(
            pc.green(`Deleted channel: '${channel.name}' (${channel.id})`)
          );
          deletedChannels++;
        } catch (error) {
          logger.error(`Failed to delete '${channel.name}': ${error.message}`);
          console.log(pc.red(`Skipping '${channel.name}' due to error.`));
        }
      }

      logger.info(
        `Channel deletion complete. Total deleted: ${deletedChannels}`
      );
      console.log(
        pc.cyan(
          `Channel deletion finished. Deleted ${deletedChannels} channels.`
        )
      );
    } catch (error) {
      logger.error(`Error in deleteAllChannels: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  async createChannel() {
    try {
      for (let x = 0; x < 15; x++) {
        await guild.channels.create({
          name: `${getRandomEmojiString(1)}-${getRandomString(98)}`,
          type: 0,
        });

        logger.info("Channel 'E' created successfully.");
        console.log(pc.green("Channel 'E' created successfully."));
      }
    } catch (error) {
      logger.error(`Failed to create channel: ${error.message}`);
      console.log(pc.red(`Error creating channel: ${error.message}`));
    }
  }
}

const Channel = new ChannelManager();
export default Channel;
