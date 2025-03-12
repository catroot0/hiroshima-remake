import pc from "picocolors"; // Import the picocolors library for colorful console output
import logger from "../logging/logger.js"; // Import the custom logger for logging messages

// Define the Role class to handle role management in a guild
class Role {
  // Async method to delete all editable roles except '@everyone' in a given guild
  async deleteEveryRole(guild) {
    try {
      // Filter the roles in the guild to find those that are editable and not '@everyone'
      const deletableRoles = guild.roles.cache.filter(
        (role) => role.editable && role.name !== "@everyone"
      );

      // If there are no deletable roles, log a warning and return
      if (deletableRoles.size === 0) {
        await logger.warn("No roles available for deletion.");
        console.log(pc.red("No deletable roles found!"));
        return;
      }

      let deletedRoles = 0; // Counter to track how many roles are successfully deleted

      // Iterate through each deletable role
      for (const role of deletableRoles.values()) {
        try {
          // Log an attempt to delete the current role
          await logger.info(
            `Attempting to delete role: '${role.name}', (id: ${role.id})`
          );
          console.log(
            pc.yellow(
              `Attempting to delete role: '${role.name}', (id: ${role.id})`
            )
          );

          // Attempt to delete the role
          await role.delete();

          // Log the successful deletion of the role
          await logger.info(`Deleted role: '${role.name}' (${role.id})`);
          console.log(pc.green(`Deleted Role: '${role.name}'`));

          // Increment the counter for deleted roles
          deletedRoles++;
        } catch (error) {
          // Log an error if deletion fails for the current role
          await logger.error(
            `Failed to delete '${role.name}': ${error.message}`
          );
          console.log(pc.red(`Skipping '${role.name}' due to error.`));
        }
      }

      // After attempting to delete all roles, log the total number of deleted roles
      await logger.info(
        `Role deletion complete. Total deleted: ${deletedRoles}`
      );
      console.log(
        pc.cyan(`Role deletion finished. Deleted ${deletedRoles} roles.`)
      );
    } catch (error) {
      // Log any unexpected errors that occur during the entire process
      await logger.error(`Error in deleteAllRoles: ${error.message}`);
      console.error(pc.red(`Unexpected error: ${error.message}`));
    }
  }
}

// Create an instance of the Role class for managing roles
const RoleManager = new Role();

// Export the RoleManager instance to use it elsewhere in the application
export { RoleManager };
