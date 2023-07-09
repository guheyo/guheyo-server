import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction } from 'discord.js';
import _ from 'lodash';
import roleService from '../../../../services/roleService';
import { isBotOwner } from '../../../lib/validate';

export default {
	data: new SlashCommandBuilder()
		.setName('upsert-roles')
		.setDescription('Upsert roles in the guild')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!isBotOwner(interaction.user.id)) return ;

    const guild = interaction.guild;
    if (!guild) return interaction.reply('404');

    try {
      const highestRole = guild.roles.highest;
      const roles = guild.roles.cache.map((role) => {
        return {
          ... _.pick(role, [
            'id',
            'createdAt',
            'name',
            'hexColor',
          ]),
          rank: highestRole.position - role.position 
        }
      });
      const upsertedRoles = await roleService.upsertRoles(roles);
      interaction.reply(upsertedRoles.length.toString());
    } catch(e) {
      console.log(e);
      interaction.reply('Error');
    }
	}
};