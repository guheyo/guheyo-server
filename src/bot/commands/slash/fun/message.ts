import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ChannelType } from 'discord.js';
import { isBotOwner } from '../../../lib/validate';

export default {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a message')
    .addStringOption(option =>
			option
			.setName('msg')
			.setDescription('Message')
			.setRequired(true)	
		)
		.addStringOption(option =>
			option
			.setName('channelid')
			.setDescription('Channel ID')
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: ChatInputCommandInteraction) {
		if (!isBotOwner(interaction.user.id)) return ;

		const msg = interaction.options.getString('msg');
		const channelId = interaction.options.getString('channelid');
	
		if (!msg || !channelId) return ;
		const channel = interaction.client.channels.cache.get(channelId);
		if (!channel) return ;
		if (channel.type !== ChannelType.GuildText) return ;
		channel.send({
			content: msg
		});
	},
};