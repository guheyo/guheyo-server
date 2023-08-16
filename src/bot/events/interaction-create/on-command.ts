import { Client, Collection, Events, Interaction } from 'discord.js';
import path from 'path';
import fs from 'fs';

const onCommand = async (client: Client) => {
  client.commands = new Collection();
  const foldersPath = path.join(__dirname, '../../commands/slash');
  const commandFolders = fs.readdirSync(foldersPath);

  commandFolders.forEach((folder) => {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => /(\.ts$)|(\.js$)/.test(file));
    // for (const file of commandFiles) {
    commandFiles.forEach(async (file) => {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module

      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    });
  });

  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  });
};

export default {
  on: onCommand,
};
