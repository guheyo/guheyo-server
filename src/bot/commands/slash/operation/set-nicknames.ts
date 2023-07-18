import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  GuildMember,
} from 'discord.js';
import _ from 'lodash';
import { getServerNickname, setNickname } from '../../../lib/user';
import { isBotOwner } from '../../../lib/validate';

export default {
  data: new SlashCommandBuilder()
    .setName('set-nicknames')
    .setDescription("Set all users' nickname to username")
    .addNumberOption((option) =>
      option
        .setName('limit')
        .setDescription('Request limit per batch: default 1')
        .setRequired(false),
    )
    .addNumberOption((option) =>
      option
        .setName('ms')
        .setDescription('Batch execution term: default 1000')
        .setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('user-id').setDescription('User Id').setRequired(false),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: ChatInputCommandInteraction) {
    if (!isBotOwner(interaction.user.id)) return;

    const { guild } = interaction;
    if (!guild) {
      interaction.reply('404');
      return;
    }

    const limit = interaction.options.getNumber('limit') || 1;
    const ms = interaction.options.getNumber('ms') || 1000;
    const userId = interaction.options.getString('user-id');

    try {
      if (userId) {
        const member = (await guild.members.fetch()).get(userId);
        const user = member?.user;
        if (!user) {
          interaction.reply(`Unmatched User ID: ${userId}`);
          return;
        }
        const m = await setNickname(member);
        interaction.reply(`Changed nickname to ${m.nickname}`);
      } else {
        const members = await guild.members.fetch();
        const newMembers = members.filter((m) => {
          const nickname = getServerNickname(m.user);
          return m.nickname !== nickname && !m.user.bot;
        });
        interaction.reply(`${newMembers.size}`);

        const groups: MemberGroups = {};
        let c = 0;

        newMembers.forEach((m) => {
          const key = Math.floor(c / limit);
          if (_.isEmpty(groups[key])) {
            groups[key] = [m];
          } else {
            groups[key].push(m);
          }
          c += 1;
        });

        _.forEach(groups, (membersInGroup, i) => {
          setTimeout(
            () => {
              _.map(membersInGroup, async (m) => {
                try {
                  await setNickname(m);
                } catch (e) {
                  console.log(e);
                }
              });
            },
            _.toNumber(i) * ms,
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

interface MemberGroups {
  [key: number]: GuildMember[];
}
