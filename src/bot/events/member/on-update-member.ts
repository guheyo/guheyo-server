import { Client, GuildMember, PartialGuildMember } from 'discord.js';
import { setUserRoles } from '../../lib/user';
import { isAllowedGuild } from '../../lib/validate';

const onUpdateMember = async (client: Client) => {
  client.on(
    'guildMemberUpdate',
    async (
      oldMember: GuildMember | PartialGuildMember,
      newMember: GuildMember,
    ) => {
      try {
        if (!isAllowedGuild(newMember.guild.id)) return;

        await setUserRoles(newMember);
      } catch (e) {
        console.log(e);
      }
    },
  );
};

export default {
  on: onUpdateMember,
};
