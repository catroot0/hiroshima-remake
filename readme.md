# Hiroshima Bot - Server Nuker (Remake)

Hiroshima Bot is a Discord bot designed to perform server moderation tasks, including deleting channels, roles, emojis, and stickers. It also offers options to ban all members, change their nicknames, and reset the server's name and icon.

> **Warning:** This bot performs destructive actions (nuking a server) and should be used responsibly and only in servers where you have permission to perform these actions.

## Features

- **Change Server Name and Icon**: Change the server's name and icon to custom values.
- **Delete Channels and Roles**: Delete all user-created channels and roles (excluding \`@everyone\`).
- **Delete Emojis and Stickers**: Delete all custom emojis and stickers.
- **Ban Everyone**: Ban all members in the guild except the bot.
- **Change Nicknames**: Change all member nicknames to "Meow" (or any other name you specify).
- **Customizable**: Easily configure the bot and its actions through environment variables and interaction prompts.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- A Discord bot token (generated from the Discord Developer Portal)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/drowning14/hiroshima-remake.git
   cd hiroshima-remake
   ```

2. **Install Dependencies**:

   Ensure you have Node.js installed. If you don’t have the required dependencies installed, the bot will automatically install them for you.

   If you have node.js, just run start.bat file and the bot will install other things for you.

3. **Set Up Environment Variables**:

   - After running the start.bat file you should see the .env file.
   - Add your bot token to the `.env` file like so:

   ```env
   token="YOUR_BOT_TOKEN_HERE"
   ```

   > Make sure to replace \`YOUR_BOT_TOKEN_HERE\` with your actual bot token from the Discord Developer Portal.

4. **Run the Bot**:
   Just run start.bat file.

## Usage

### Available Commands and Actions:

1. **Nuke Server**:
   The bot will prompt you to perform a "nuke" operation. This involves:

   - Changing the server name and icon.
   - Deleting all channels, roles, emojis, and stickers.
   - Optionally banning all members or changing their nicknames to a custom value.

2. **Interactive Prompts**:
   The bot will ask if you want to:

   - Ban everyone in the server.
   - Change everyone's nickname to "Meow".

   Respond with \`y\` or \`n\` to perform these actions.

### Warning

This bot will permanently delete server data such as channels, roles, emojis, and stickers, and may ban all members. Use it only in a server where you have the appropriate permissions to do so.

- **Permissions**: Ensure that the bot has the necessary permissions in the server, including:

  - Manage Channels
  - Manage Roles
  - Manage Emojis
  - Manage Server
  - Ban Members

## Contributing

Contributions are welcome! If you want to help improve the bot, follow these steps:

1. Fork the repository.
2. Create a new branch (\`git checkout -b feature-branch\`).
3. Make your changes.
4. Commit your changes (\`git commit -am 'Add new feature'\`).
5. Push to your branch (\`git push origin feature-branch\`).
6. Open a pull request.

## License

Distributed under the MIT License. See \`LICENSE\` for more information.

## Contact

- GitHub: [https://github.com/drowning14/hiroshima-remake](https://github.com/drowning14/hiroshima-remake)
- Email: drowning.dev1@gmail.com
