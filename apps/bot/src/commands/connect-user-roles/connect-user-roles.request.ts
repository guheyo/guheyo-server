import { GuildMember } from 'discord.js';
import { MemberOption } from 'necord';

export class ConnectUserRolesRequest {
  @MemberOption({
    name: 'member',
    description: 'Member',
    required: true,
  })
  discordMember: GuildMember;
}
