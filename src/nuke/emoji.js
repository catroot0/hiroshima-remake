import pc from "picocolors";
import logger from "../logging/logger.js";

class Emoji {
  async deleteEveryEmoji(guild) {
    try {
      const emojis = guild.emojis.cache;
      if (emojis.size === 0) {
        await logger.warn("no deletable emoji found!");
        console.log(pc.red(`no deletable emoji found!`));
        return;
      }

      for (const emoji of emojis.values()) {
        await logger.info(
          `Attempting to delete emoji: '${emoji.name}', (id: ${emoji.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete emoji: '${emoji.name}', (id: ${emoji.id})`
          )
        );

        await emoji.delete();

        await logger.info(`Deleted emoji: '${emoji.name}' (${emoji.id})`);
        console.log(pc.green(`Deleted emoji: '${emoji.name}'`));
      }
      console.log(pc.cyan(`emoji deletion finished.`));
    } catch (error) {
      await logger.error(`Error in deleteEveryEmoji: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  async deleteEverySticker(guild) {
    try {
      const stickers = guild.stickers.cache;
      if (stickers.size === 0) {
        await logger.warn("no deletable sticker found!");
        console.log(pc.red(`no deletable sticker found!`));
        return;
      }
      for (const sticker of stickers.values()) {
        await logger.info(
          `Attempting to delete sticker: '${sticker.name}', (id: ${sticker.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete sticker: '${sticker.name}', (id: ${sticker.id})`
          )
        );

        await sticker.delete();
        await logger.info(`Deleted sticker: '${sticker.name}' (${sticker.id})`);
        console.log(pc.green(`Deleted sticker: '${sticker.name}'`));
      }
      console.log(pc.cyan(`sticker deletion finished.`));
    } catch (error) {
      await logger.error(`Error in deleteEverySticker: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}
const EmojiManager = new Emoji();
export default EmojiManager;
