import pc from "picocolors"; // Import the picocolors library for colorful console output
import logger from "../logging/logger.js"; // Import the custom logger for logging actions

// Define the Emoji class for managing emoji and sticker deletions in the guild
class Emoji {
  // Async method to delete all emojis in the guild
  async deleteEveryEmoji(guild) {
    try {
      // Fetch all emojis in the guild
      const emojis = guild.emojis.cache;

      // Check if there are any emojis to delete
      if (emojis.size === 0) {
        await logger.warn("no deletable emoji found!"); // Log warning if no emojis are found
        console.log(pc.red(`no deletable emoji found!`)); // Display message in the console
        return; // Exit the method as no emojis need to be deleted
      }

      // Loop through each emoji and delete it
      for (const emoji of emojis.values()) {
        // Log and display the attempt to delete the current emoji
        await logger.info(
          `Attempting to delete emoji: '${emoji.name}', (id: ${emoji.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete emoji: '${emoji.name}', (id: ${emoji.id})`
          )
        );

        // Delete the emoji
        await emoji.delete();

        // Log and display the success message after deleting the emoji
        await logger.info(`Deleted emoji: '${emoji.name}' (${emoji.id})`);
        console.log(pc.green(`Deleted emoji: '${emoji.name}'`));
      }
      console.log(pc.cyan(`emoji deletion finished.`)); // Indicate that emoji deletion is finished
    } catch (error) {
      // Log and display error if any issue occurs while deleting emojis
      await logger.error(`Error in deleteEveryEmoji: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  // Async method to delete all stickers in the guild
  async deleteEverySticker(guild) {
    try {
      // Fetch all stickers in the guild
      const stickers = guild.stickers.cache;

      // Check if there are any stickers to delete
      if (stickers.size === 0) {
        await logger.warn("no deletable sticker found!"); // Log warning if no stickers are found
        console.log(pc.red(`no deletable sticker found!`)); // Display message in the console
        return; // Exit the method as no stickers need to be deleted
      }

      // Loop through each sticker and delete it
      for (const sticker of stickers.values()) {
        // Log and display the attempt to delete the current sticker
        await logger.info(
          `Attempting to delete sticker: '${sticker.name}', (id: ${sticker.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete sticker: '${sticker.name}', (id: ${sticker.id})`
          )
        );

        // Delete the sticker
        await sticker.delete();

        // Log and display the success message after deleting the sticker
        await logger.info(`Deleted sticker: '${sticker.name}' (${sticker.id})`);
        console.log(pc.green(`Deleted sticker: '${sticker.name}'`));
      }
      console.log(pc.cyan(`sticker deletion finished.`)); // Indicate that sticker deletion is finished
    } catch (error) {
      // Log and display error if any issue occurs while deleting stickers
      await logger.error(`Error in deleteEverySticker: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}

// Create an instance of the Emoji class for managing emojis and stickers
const EmojiManager = new Emoji();

// Export the EmojiManager instance for use elsewhere in the application
export default EmojiManager;
