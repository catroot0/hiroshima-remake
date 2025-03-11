import { PermissionsBitField } from "discord.js";
import pc from "picocolors";
import logger from "../logging/logger.js";
export default async function checkPermissions(bot) {
  try {
    await logger.info("checking permissions...");
    console.log(pc.yellow("checking permissions..."));
    let missingPermissions = [];
    const permissionsToCheck = {
      ManageRoles: "Manage Roles",
      ManageChannels: "Manage Channels",
      BanMembers: "Ban Members",
      ManageNicknames: "Manage Nicknames",
      ManageGuild: "Manage Guild (Server)",
    };
    for (const [flag, name] of Object.entries(permissionsToCheck)) {
      if (bot.permissions.has(PermissionsBitField.Flags[flag])) {
        await logger.info(`bot has ${name} permission`);
      } else {
        await logger.error(`bot does not have ${name} permission`);
        console.log(pc.red(`Bot does not have '${name}' permission.`));
        missingPermissions.push(name);
      }
    }

    if (missingPermissions.length > 0) {
      logger.error(`missing permissions: ${missingPermissions.join(", ")}`);
      console.log(
        pc.red(
          `missing permissions: ${pc.blueBright(missingPermissions.join(", "))}`
        )
      );
      console.log("please update the permissions and restart the bot.");
      return 0;
    } else {
      logger.info("bot has all required permissions");
      console.log(pc.green("bot has all required permissions"));
      return 1;
    }
  } catch (error) {
    console.log("unexpected error happened: ", error);
    logger.error(`unexpected error happened: ${error}`);
  }
}
