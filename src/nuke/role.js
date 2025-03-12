import pc from "picocolors";
import logger from "../logging/logger.js";
class Role {
  async deleteEveryRole(guild) {
    try {
      const deletableRoles = guild.roles.cache.filter(
        (role) => role.editable && role.name !== "@everyone"
      );

      if (deletableRoles.size === 0) {
        await logger.warn("No roles available for deletion.");
        console.log(pc.red("No deletable roles found!"));
        return;
      }

      let deletedRoles = 0;

      for (const role of deletableRoles.values()) {
        try {
          await logger.info(
            `Attempting to delete role: '${role.name}', (id: ${role.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to delete role: '${role.name}', (id: ${role.id})`
            )
          );

          await role.delete();

          await logger.info(`Deleted role: '${role.name}' (${role.id})`);
          console.log(pc.green(`Deleted Role: '${role.name}'`));

          deletedRoles++;
        } catch (error) {
          await logger.error(
            `Failed to delete '${role.name}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${role.name}' due to error.`));
        }
      }

      await logger.info(
        `Role deletion complete. Total deleted: ${deletedRoles}`
      );
      console.log(
        pc.cyan(`Role deletion finished. Deleted ${deletedRoles} roles.`)
      );
    } catch (error) {
      await logger.error(`Error in deleteAllRoles: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}

const RoleManager = new Role();
export { RoleManager };
