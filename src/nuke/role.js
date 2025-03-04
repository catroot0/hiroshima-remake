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
        "Bot lacks 'Manage Roles' permission! Update permissions and restart.";
      logger.error(errorMsg);
      console.error(pc.red(errorMsg.toUpperCase()));
      return;
    }

    logger.info(
      "Bot has 'Manage Roles' permission. Initiating role deletion..."
    );

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
        console.log(pc.yellow(`Attempting to delete role: '${role.name}'`));
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
