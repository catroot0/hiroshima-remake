import { getRandomEmoji, getRandomString } from "./channel.js";
import pc from "picocolors";
import logger from "../logging/logger.js";

class Role {
  async deleteAllRoles(guild) {
    try {
      const deletableRoles = guild.roles.cache.filter(
        (role) => role.editable && role.name !== "@everyone"
      );

      if (deletableRoles.size === 0) {
        await logger.warn("No roles available for deletion.");
        console.log(pc.yellow("No deletable roles found."));
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
          console.log(pc.green(`Deleted: '${role.name}'`));
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

  async createRole(guild) {
    try {
      let guildRoleSpace = 250 - guild.roles.cache.size;
      let createdRolesAmount = 0;

      console.log(
        pc.yellow(`Attempting to create ${pc.red(guildRoleSpace)} role...`)
      );
      await logger.info(`Attempting to create ${guildRoleSpace} role...`);

      for (let x = 1; x < guildRoleSpace; x++) {
        await guild.roles.create({
          name: `${getRandomEmoji(1)}-${getRandomString(98)}`,
          color: `${this.getRandomHexColor()}`,
          permissions: [],
        });

        guildRoleSpace--;
        createdRolesAmount++;

        await logger.info(`${x}th Role created successfully.`);
        console.log(
          pc.green(`${x}th Role created successfully. ${guildRoleSpace} left.`)
        );
      }
      console.log(
        `Role creation finished. created ${createdRolesAmount} Role.`
      );
    } catch (error) {
      await logger.error(`Failed to create channel: ${error.message}`);
      console.log(pc.red(`Error creating channel: ${error.message}`));
    }
  }
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }
}
const RoleManager = new Role();
export { RoleManager };
