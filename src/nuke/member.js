import logger from "../logging/logger.js";
import pc from "picocolors";
import { client } from "../index.js";

class Member {
  async banEveryone(guild) {
    try {
      // Ensure the filter method properly returns a boolean condition
      const bannableMembers = await guild.members.cache.filter((member) => {
        return (
          member.bannable &&
          member.user.id !== guild.ownerId &&
          member.user.id !== client.user.id
        );
      });

      if (bannableMembers.size === 0) {
        await logger.warn("No bannable members found!");
        console.log(pc.red("No bannable members found!"));
        return;
      }

      // Loop through the bannable members
      for (const member of bannableMembers.values()) {
        try {
          await logger.info(
            `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          // Ban the member
          await guild.bans.create(member.user.id);

          console.log(
            pc.green(`Member ${member.user.tag} banned successfully`)
          );
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
}

// Ensure class name starts with uppercase to follow JavaScript conventions
const MemberManager = new Member();
export default MemberManager;
