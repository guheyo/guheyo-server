import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';
import _ from 'lodash';
import { updateUsername } from '../../../lib/user';
import { isBotOwner } from '../../../lib/validate';

export default {
	data: new SlashCommandBuilder()
		.setName('update-usernames')
		.setDescription('Update usernames')
    .addNumberOption(option =>
      option
      .setName('size')
      .setDescription("Size of the chunk: default 100")
      .setRequired(false))
    .addNumberOption(option =>
      option
      .setName('ms')
      .setDescription("Batch execution term: default 1000")
      .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!isBotOwner(interaction.user.id)) return ;

    const guild = interaction.guild;
    if (!guild) return interaction.reply('404');

    const size = interaction.options.getNumber('size') || 100;
    const ms = interaction.options.getNumber('ms') || 1000;

    try {
      const members = (await guild.members.fetch()).map((m) => m);
      const chunks = _.chunk(members, size);
      chunks.map((chunk, i) => {
        setTimeout(() => {
          chunk.map(async (member) => {
            try {
              await updateUsername(member);
            } catch (e) {
              console.log(e);
            }
          });
        }, ms * i);
      });
      interaction.reply(members.length.toString());
    } catch (e) {
      console.log(e);
      interaction.reply('Error');
    }
	},
};