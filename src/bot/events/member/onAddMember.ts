import _ from 'lodash';;
import { Client, GuildMember } from 'discord.js';
import { getOrCreateUser, setNickname } from '../../lib/user';
import { isAllowedGuild } from '../../lib/validate';

const onAddMember = async (client: Client) => {
  client.on('guildMemberAdd', async (member: GuildMember) => {
    try {
      if (!isAllowedGuild(member.guild.id)) return ;

      await getOrCreateUser(member);
      await setNickname(member);
    } catch(e) {
      console.log(e);
    }
  });
};

export default {
	on: onAddMember
};