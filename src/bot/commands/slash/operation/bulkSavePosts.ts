import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ChannelType } from 'discord.js';
import { bulkSavePosts } from '../../../lib/post';
import { isBotOwner } from '../../../lib/validate';

export default {
	data: new SlashCommandBuilder()
		.setName('bulk-save-posts')
		.setDescription('Bulk save posts')
    .addNumberOption(option =>
      option
      .setName('quantity')
      .setDescription("Number of posts to save per channel")
      .setRequired(true))
    .addNumberOption(option =>
      option
      .setName('ms')
      .setDescription("Batch execution term: default 1000")
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!isBotOwner(interaction.user.id)) return ;

    const quantity = interaction.options.getNumber('quantity');
    const ms = interaction.options.getNumber('ms') || 1000;
    if (!quantity) return ;
    if (!interaction.guild) return ;
    try {
      await bulkSavePosts(interaction.guild, quantity, ms);
      interaction.reply('Done');
    } catch(e) {
      console.log(e);
      interaction.reply('Error');
    }
	},
};