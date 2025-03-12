import logger from "../logging/logger.js"; // Import the custom logger for logging actions
import pc from "picocolors"; // Import the picocolors library for colorful console output
import { client } from "../index.js"; // Import the bot client instance

// Define the Member class to handle member-related actions like banning and changing nicknames
class Member {
  // Async method to ban all members in the guild (except the bot)
  async banEveryone(guild) {
    try {
      // Fetch all members of the guild
      const members = await guild.members.fetch();

      // Iterate through each member in the guild
      for (const member of members.values()) {
        // Skip the bot itself to avoid banning the bot
        if (member.user.id === client.user.id) {
          console.log(pc.blue(`Skipping bot itself: ${member.user.tag}`));
          continue; // Skip to the next iteration
        }

        try {
          // Log and display the attempt to ban the current member
          await logger.info(
            `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          // Attempt to ban the member
          await guild.members.ban(member);

          // Log and display success message after banning the member
          console.log(
            pc.green(`Member ${member.user.tag} banned successfully`)
          );
          await logger.info(`Member ${member.user.tag} banned successfully`);
        } catch (error) {
          // Log and display error if the banning fails for a member
          await logger.error(
            `Failed to ban '${member.user.tag}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${member.user.tag}' due to error.`));
        }
      }
    } catch (error) {
      // Log and display error if fetching members or another unexpected error occurs
      await logger.error(`Error in banEveryone: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  // Async method to change the nickname of all members in the guild (except bots)
  async changeNickname(guild) {
    try {
      // Fetch all members of the guild
      const members = await guild.members.fetch();
      const newNickname = "Meow"; // Set the new nickname

      // Iterate through each member in the guild
      for (const member of members.values()) {
        // Skip bot users as their nickname doesn't need to be changed
        if (member.user.bot) {
          console.log(pc.blue(`Skipping bot: ${member.user.tag}`));
          continue; // Skip to the next iteration
        }

        try {
          // Log and display the attempt to change the nickname for the current member
          await logger.info(
            `Changing nickname for: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Changing nickname for: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          // Attempt to change the nickname to "Meow"
          await member.setNickname(newNickname);

          // Log and display success message after changing the nickname
          console.log(
            pc.green(
              `Nickname changed for ${member.user.tag} to '${newNickname}'`
            )
          );
          await logger.info(
            `Nickname changed for ${member.user.tag} to '${newNickname}'`
          );
        } catch (error) {
          // Log and display error if the nickname change fails for a member
          await logger.error(
            `Failed to change nickname for '${member.user.tag}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${member.user.tag}' due to error.`));
        }
      }
    } catch (error) {
      // Log and display error if fetching members or another unexpected error occurs
      await logger.error(`Error in changeNickname: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}

// Create an instance of the Member class for managing members
const MemberManager = new Member();

// Export the MemberManager instance for use elsewhere in the application
export default MemberManager;
