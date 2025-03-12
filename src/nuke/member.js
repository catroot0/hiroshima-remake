import logger from "../logging/logger.js";
import pc from "picocolors";
import { client } from "../index.js";

class member {
  async banEveryone(guild) {
    try {
      const bannableMembers = await guild.members.cache.filter((member) => {
        !member.bannable &&
          member.user.id !== guild.ownerId &&
          member.user.id !== client.user.id;
      });

      if (bannableMembers.size === 0) {
        await logger.warn("No bannable Member Found!");
      }

      for (const member of member.values()) {
        try {
          await logger.info(
            `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to ban: ${member.user.tag} (id: ${member.user.id})`
            )
          );

          await guild.bans.create(member.user.id);

          console.log(
            pc.green(`member ${member.user.tag} banned successfully`)
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
const MemberManager = new member();
export default MemberManager;
