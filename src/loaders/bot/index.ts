import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import handleEvents from '../../bot/lib/handleEvents';
import deployCommands from '../../bot/lib/deployCommands';

const bot = {
	sync: () => {
		const token = process.env.DISCORD_BOT_TOKEN;

		// Create a new client instance
		const client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildModeration,
				GatewayIntentBits.GuildMessageReactions
			],
			partials: [Partials.Message, Partials.Channel, Partials.Reaction],
		});

		// Log in to Discord with your client's token
		client.login(token);

		// When the client is ready, run this code (only once)
		// We use 'c' for the event parameter to keep it separate from the already defined 'client'
		client.once(Events.ClientReady, c => {
			console.log(`Ready! Logged in as ${c.user.tag}`);
		});
		handleEvents(client);
		deployCommands();
	}
};

export default bot;