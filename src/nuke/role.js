import { selectedGuild } from "../alert/getGuild.js";
import { client } from "../index.js";
import pc from "picocolors";
import logger from "../logging/logger.js";
var guild = null;
var bot = null;
async function deleteAllRoles() {
  try {
    guild = await client.guilds.fetch(selectedGuild.id);
    bot = await guild.members.fetch(client.user.id);

    const deletableRoles = guild.roles.cache.filter(
      (role) => role.editable && role.name !== "@everyone"
    );

    if (deletableRoles.size === 0) {
      logger.warn("No roles available for deletion.");
      console.log(pc.yellow("No deletable roles found."));
      return;
    }

    let deletedRoles = 0;

    for (const role of deletableRoles.values()) {
      try {
        logger.info(
          `Attempting to delete role: '${role.name}', (id: ${role.id})`
        );
        console.log(
          pc.yellow(
            `Attempting to delete role: '${role.name}', (id: ${role.id})`
          )
        );
        await role.delete();
        logger.info(`Deleted role: '${role.name}' (${role.id})`);
        console.log(pc.green(`Deleted: '${role.name}'`));
        deletedRoles++;
      } catch (error) {
        logger.error(`Failed to delete '${role.name}': ${error.message}`);
        console.log(pc.red(`Skipping '${role.name}' due to error.`));
      }
    }

    logger.info(`Role deletion complete. Total deleted: ${deletedRoles}`);
    console.log(
      pc.cyan(`Role deletion finished. Deleted ${deletedRoles} roles.`)
    );
  } catch (error) {
    logger.error(`Error in deleteAllRoles: ${error.message}`);
    console.error(pc.red(`Unexpected error: ${error.message}`));
  }
}
export { guild, bot, deleteAllRoles };
