import { GuildMember } from 'discord.js';
import { MemberOption } from 'necord';

export class RegisterDiscordUserRequest {
  @MemberOption({
    name: 'member',
    description: 'Member',
    required: true,
  })
  discordMember: GuildMember;
}
