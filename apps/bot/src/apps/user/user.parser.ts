import { Parser } from '@app/bot/shared/parser';
import { Injectable } from '@nestjs/common';
import { GuildMember } from 'discord.js';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';

@Injectable()
export class UserParser extends Parser {
  parseCreateUserFromDiscordInput(
    id: string,
    guildMember: GuildMember,
  ): CreateUserFromDiscordInput {
    return {
      id,
      username: guildMember.user.username,
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
