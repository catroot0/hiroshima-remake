import { PermissionsBitField } from "discord.js";
import { selectedGuild } from "../alert/getGuild.js";
import { client } from "../index.js";
import pc from "picocolors";
import logger from "../logging/logger.js";

export default async function deleteAllRoles() {
  try {
    const guild = await client.guilds.fetch(selectedGuild.id);
    const bot = await guild.members.fetch(client.user.id);

    logger.info("Checking bot permissions for 'Manage Roles'...");

    if (!bot.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      const errorMsg =
        "Bot lacks 'Manage Roles' permission! Please update permissions and restart.";
      logger.error(errorMsg);
      console.error(pc.red(errorMsg.toUpperCase()));
      process.exit(1);
    }

    logger.info(
      "Bot has 'Manage Roles' permission. Initiating role deletion..."
    );

    for (const role of guild.roles.cache.values()) {
      if (!role.editable || role.name === "@everyone") {
        console.log(pc.red(`Skipping: Cannot delete role '${role.name}'.`));
        continue;
      }

      try {
        console.log(pc.yellow(`Attempting to delete role: '${role.name}'`));
        await role.delete();
        logger.info(`Successfully deleted role: '${role.name}'`);
        console.log(pc.green(`Deleted role: '${role.name}'`));
      } catch (error) {
        logger.error(`Failed to delete role '${role.name}': ${error.message}`);
        console.log(pc.blueBright(`Skipping '${role.name}' due to an error.`));
      }
    }
  } catch (error) {
    logger.error(`Error in deleteAllRoles: ${error.message}`);
    console.error(pc.red(`Unexpected error: ${error.message}`));
  }
}
