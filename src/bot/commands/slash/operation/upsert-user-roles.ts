import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import _ from 'lodash';
import userService from '../../../../services/user-service';
import { getOrCreateUser } from '../../../lib/user';
import { isBotOwner } from '../../../lib/validate';

export default {
  data: new SlashCommandBuilder()
    .setName('upsert-user-roles')
    .setDescription('Upsert user roles')
    .addNumberOption((option) =>
      option
        .setName('size')
        .setDescription('Size of the chunk: default 100')
        .setRequired(false),
    )
    .addNumberOption((option) =>
      option
        .setName('ms')
        .setDescription('Batch execution term: default 1000')
        .setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!isBotOwner(interaction.user.id)) return;

    const { guild } = interaction;
    if (!guild) {
      interaction.reply('404');
      return;
    }

    const size = interaction.options.getNumber('size') || 100;
    const ms = interaction.options.getNumber('ms') || 1000;

    try {
      const members = await guild.members.fetch();
      const memberAndRoleIds = members.map((m) => {
        const roleIds = m.roles.cache.map((role) => role.id);
        return {
          member: m,
          roleIds,
        };
      });

      const chunks = _.chunk(memberAndRoleIds, size);
      chunks.forEach((chunk, i) => {
        setTimeout(() => {
          chunk.forEach(async (memberAndRoleIdsInChunk) => {
            try {
              const user = await getOrCreateUser(
                memberAndRoleIdsInChunk.member,
              );
              await userService.setRoles(
                user.id,
                memberAndRoleIdsInChunk.roleIds,
              );
            } catch (e) {
              console.log(e);
            }
          });
        }, ms * i);
      });
      interaction.reply(members.size.toString());
    } catch (e) {
      console.log(e);
      interaction.reply('Error');
    }
  },
};
