import pc from "picocolors";
import logger from "../logging/logger.js";

class Emoji {
  async deleteAllEmojis(guild) {
    try {
      const emojis = guild.emojis.cache;
      if (emojis.size === 0) {
        await logger.info("no deletable emoji found!");
        console.log(pc.red(`no deletable emoji found!`));
        return;
      }
      for (const emoji of emojis.values()) {
        await emoji.delete();
      }
    } catch (error) {
      await logger.error(`Error in deleteAllEmojis: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  async deleteAllSticker(guild) {
    try {
      const stickers = guild.stickers.cache;
      if (stickers.size === 0) {
        await logger.info("no deletable sticker found!");
        console.log(pc.red(`no deletable sticker found!`));
        return;
      }
      for (const sticker of stickers.values()) {
        await sticker.delete();
      }
    } catch (error) {
      await logger.error(`Error in deleteAllStickers: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}
const EmojiManager = new Emoji();
export default EmojiManager;
