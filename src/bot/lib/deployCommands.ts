import { REST, Routes } from 'discord.js';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { Command } from '../../types';

const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.DISCORD_BOT_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

const loadCommands = async (): Promise<Command[]> => {
	// Grab all the command files from the commands directory you created earlier
	const foldersPath = path.join(__dirname, '../../bot/commands/slash');
	const commandFolders = fs.readdirSync(foldersPath);
	const commands: Command[] = [];

	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => /(\.ts$)|(\.js$)/.test(file));

		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		try {
			_.map(commandFiles, (file) => {
				const filePath = path.join(commandsPath, file);
				const { default:command } = require(filePath);

				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				} else {
					console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			});	
		} catch (err) {
			console.log(err);
		}
	};
	return commands;
};

// and deploy your commands!
const deployCommands = async () => {
	const commands: Command [] = await loadCommands();
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(token!);

	try {
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId!, guildId!),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${_.get(data, 'length')} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
};

export default deployCommands;