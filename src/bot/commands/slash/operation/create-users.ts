import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import _ from 'lodash';
import { getOrCreateUser } from '../../../lib/user';
import { isBotOwner } from '../../../lib/validate';

export default {
  data: new SlashCommandBuilder()
    .setName('create-users')
    .setDescription('Get or create users')
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
      const members = (await guild.members.fetch()).map((m) => m);
      const chunks = _.chunk(members, size);
      chunks.forEach((chunk, i) => {
        setTimeout(() => {
          chunk.forEach(async (member) => {
            try {
              await getOrCreateUser(member);
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
