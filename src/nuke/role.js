import pc from "picocolors"; // Import the picocolors library for colorful console output
import logger from "../logging/logger.js"; // Import the custom logger for logging messages
import { getRandomString, getRandomEmoji } from "./channel.js";
// Define the Role class to handle role management in a guild

function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (0xFFFFFF)
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);

  // Pad the hex string with leading zeros if necessary to ensure it's 6 digits long
  return `#${hex.padStart(6, "0")}`;
}

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

  // Method to create a specified number of random roles in the guild
  async createRole(guild) {
    try {
      let guildSpace = 250 - guild.channels.cache.size;
      let createdRolesAmount = 0; // Keep track of how many roles were created

      // Log the attempt to create roles
      console.log(
        pc.yellow(`Attempting to create ${pc.red(guildSpace)} roles...`)
      );
      await logger.info(`Attempting to create ${guildSpace} roles...`);

      for (let x = 0; x < guildSpace; x++) {
        // Create a new roles with a random emoji and random string as its name and a random color
        await guild.roles.create({
          name: `${getRandomEmoji(1)}-${getRandomString(98)}`, // Random emoji + random alphanumeric string as the role name
          color: getRandomHexColor(), // Random Hex Color
        });

        createdRolesAmount++; // Increment the count of created roles

        // Log successful role creation
        console.log(pc.green(`${x + 1}th Role created successfully.`));
        await logger.info(`${x + 1}th Role created successfully.`);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Log completion of role creation
      console.log(
        pc.cyan(`Role creation finished. Created ${createdRolesAmount} roles.`)
      );
    } catch (error) {
      // Log any errors encountered during role creation
      await logger.error(`Failed to create role: ${error.message}`);
      console.log(pc.red(`Error creating role: ${error.message}`));
    }
  }
}

// Create an instance of the Role class for managing roles
const RoleManager = new Role();

// Export the RoleManager instance to use it elsewhere in the application
export { RoleManager };
