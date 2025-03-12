import { getGuild } from "./getGuild.js"; // Import the function to fetch guild data
import pc from "picocolors"; // Import the 'picocolors' library for colored console output

// Array containing the ASCII art and welcome lines
const welcomeLines = [
  "========================================================================",
  "██╗░░██╗███████╗██████╗░░█████╗░░██████╗██╗░░██╗██╗███╗░░░███╗░█████╗░",
  "██║░░██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║░░██║██║████╗░████║██╔══██╗",
  "███████║█████╗░░██████╔╝██║░░██║╚█████╗░███████║██║██╔████╔██║███████║",
  "██╔══██║██╔══╝░░██╔══██╗██║░░██║░╚═══██╗██╔══██║██║██║╚██╔╝██║██╔══██║",
  "██║░░██║███████╗██║░░██║╚█████╔╝██████╔╝██║░░██║██║██║░╚═╝░██║██║░░██║",
  "╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝",
  "",
  "██████╗░███████╗███╗░░░███╗░█████╗░██╗░░██╗███████╗",
  "██╔══██╗██╔════╝████╗░████║██╔══██╗██║░██╔╝██╔════╝",
  "██████╔╝█████╗░░██╔████╔██║███████║█████═╝░█████╗░░",
  "██╔══██╗██╔══╝░░██║╚██╔╝██║██╔══██║██╔═██╗░██╔══╝░░",
  "██║░░██║███████╗██║░╚═╝░██║██║░░██║██║░╚██╗███████╗",
  "╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝",
  "========================================================================",
  "",
  "",
];

// Function to center text in the console based on terminal width
function centerText(text) {
  const terminalWidth = process.stdout.columns || 80; // Get the current terminal width, default to 80 if not available
  const textWidth = text.length; // Get the length of the text
  const padding = Math.max(0, Math.floor((terminalWidth - textWidth) / 2)); // Calculate padding to center the text
  return " ".repeat(padding) + text; // Add spaces for centering and return the final centered text
}

// Display a colorful ASCII art header with centered text
console.log(
  pc.magenta(`
${centerText("░██████╗████████╗░█████╗░██████╗░████████╗██╗███╗░░██╗░██████╗░")}
${centerText("██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║████╗░██║██╔════╝░")}
${centerText("╚█████╗░░░░██║░░░███████║██████╔╝░░░██║░░░██║██╔██╗██║██║░░██╗░")}
${centerText("░╚═══██╗░░░██║░░░██╔══██║██╔══██╗░░░██║░░░██║██║╚████║██║░░╚██╗")}
${centerText("██████╔╝░░░██║░░░██║░░██║██║░░██║░░░██║░░░██║██║░╚███║╚██████╔╝")}
${centerText("╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░╚══╝░╚═════╝░")}
`)
);

let isDone = false; // Flag to indicate when the welcome process is complete

// Function to print welcome messages line by line with a delay
function welcome() {
  console.clear(); // Clear the console before printing the welcome lines
  for (let x = 0; x < welcomeLines.length; x++) {
    // Loop through the lines in the welcome message array
    setTimeout(() => {
      console.log(pc.magenta(centerText(welcomeLines[x]))); // Log each line with a delay and center it
      if (x == welcomeLines.length - 1) {
        // Check if it's the last line
        isDone = true; // Set the flag to true when all lines are printed
      }
      if (isDone) {
        // Once all lines are printed, call the getGuild function
        getGuild();
      }
    }, 300 * x); // Add a delay of 300ms between each line
  }
}

// Exporting the functions for use in other modules
export { welcome, centerText };
