import { Parser } from '@app/bot/shared/parser';
import { Injectable } from '@nestjs/common';
import { GuildMember } from 'discord.js';

@Injectable()
export class UserParser extends Parser {
  async parseCreateUserFromDiscordInput(
    id: string,
    guildMember: GuildMember,
    avatarURL: string | undefined,
  ) {
    return {
      id,
      username: guildMember.user.username,
      avatarURL,
      socialAccountId: this.discordIdConverter.convertIdUsingDiscordNamespace(guildMember.id),
      provider: 'discord',
      socialId: guildMember.id,
      guildId: this.discordIdConverter.convertIdUsingDiscordNamespace(guildMember.guild.id),
      memberId: this.discordIdConverter.convertIdUsingGuildNamespace(guildMember.id),
      roleIds: guildMember.roles.cache.map((role) =>
        this.discordIdConverter.convertIdUsingGuildNamespace(role.id),
      ),
    };
  }
}
