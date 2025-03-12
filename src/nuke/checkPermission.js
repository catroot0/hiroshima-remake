import { PermissionsBitField } from "discord.js"; // Import PermissionsBitField for handling permissions
import pc from "picocolors"; // Import picocolors for colorful console output
import logger from "../logging/logger.js"; // Import custom logger for logging actions

// This function checks if the bot has the necessary permissions in the guild
export default async function checkPermissions(bot) {
  try {
    // Log and display that permission checking has started
    await logger.info("checking permissions...");
    console.log(pc.yellow("checking permissions..."));

    // Initialize an empty array to store missing permissions
    let missingPermissions = [];

    // Define a mapping of permissions to check
    const permissionsToCheck = {
      ManageRoles: "Manage Roles",
      ManageChannels: "Manage Channels",
      BanMembers: "Ban Members",
      ManageNicknames: "Manage Nicknames",
      ManageGuild: "Manage Guild (Server)",
    };

    // Loop through the permissions to check and verify if the bot has them
    for (const [flag, name] of Object.entries(permissionsToCheck)) {
      // Check if the bot has the specified permission
      if (bot.permissions.has(PermissionsBitField.Flags[flag])) {
        await logger.info(`bot has ${name} permission`); // Log that the bot has the permission
      } else {
        // Log and display that the bot is missing the permission
        await logger.error(`bot does not have ${name} permission`);
        console.log(pc.red(`Bot does not have '${name}' permission.`));
        missingPermissions.push(name); // Add the missing permission to the array
      }
    }

    // If there are any missing permissions, log the missing permissions and ask the user to fix them
    if (missingPermissions.length > 0) {
      // Log all the missing permissions
      logger.error(`missing permissions: ${missingPermissions.join(", ")}`);
      // Display the missing permissions in the console
      console.log(
        pc.red(
          `missing permissions: ${pc.blueBright(missingPermissions.join(", "))}`
        )
      );
      console.log("please update the permissions and restart the bot.");
      return 0; // Return 0 indicating the bot does not have all the required permissions
    } else {
      // If no permissions are missing, log and display that the bot has all the required permissions
      logger.info("bot has all required permissions");
      console.log(pc.green("bot has all required permissions"));
      return 1; // Return 1 indicating the bot has all the required permissions
    }
  } catch (error) {
    // Log any unexpected errors that occur during permission checking
    console.log("unexpected error happened: ", error);
    logger.error(`unexpected error happened: ${error}`);
  }
}
