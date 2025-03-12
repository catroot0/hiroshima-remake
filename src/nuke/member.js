import logger from "../logging/logger.js";
import pc from "picocolors";
import { client } from "../index.js";

class Member {
  async banEveryone(guild) {
    try {
      const members = await guild.members.fetch();

      for (const member of members.values()) {
        if (member.user.id === client.user.id) {
          console.log(pc.blue(`Skipping bot itself: ${member.user.tag}`));
          continue;
        }

        try {
          await logger.info(
            `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          await guild.members.ban(member);

          console.log(
            pc.green(`Member ${member.user.tag} banned successfully`)
          );
          await logger.info(`Member ${member.user.tag} banned successfully`);
        } catch (error) {
          await logger.error(
            `Failed to ban '${member.user.tag}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${member.user.tag}' due to error.`));
        }
      }
    } catch (error) {
      await logger.error(`Error in banEveryone: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }

  async changeNickname(guild) {
    try {
      const members = await guild.members.fetch();
      const newNickname = "Meow";
      for (const member of members.values()) {
        if (member.user.bot) {
          console.log(pc.blue(`Skipping bot: ${member.user.tag}`));
          continue;
        }

        try {
          await logger.info(
            `Changing nickname for: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Changing nickname for: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          await member.setNickname(newNickname);

          console.log(
            pc.green(
              `Nickname changed for ${member.user.tag} to '${newNickname}'`
            )
          );
          await logger.info(
            `Nickname changed for ${member.user.tag} to '${newNickname}'`
          );
        } catch (error) {
          await logger.error(
            `Failed to change nickname for '${member.user.tag}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${member.user.tag}' due to error.`));
        }
      }
    } catch (error) {
      await logger.error(`Error in changeNickname: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}

const MemberManager = new Member();
export default MemberManager;
