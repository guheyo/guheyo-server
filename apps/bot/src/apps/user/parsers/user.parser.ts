import { Injectable } from '@nestjs/common';
import { GuildMember, RoleManager } from 'discord.js';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';
import { CreateRoleInput } from '@lib/domains/role/application/commands/create-role/create-role.input';
import { GuildParser } from '../../guild/parsers/guild.parser';

@Injectable()
export class UserParser extends GuildParser {
  parseCreateUserFromDiscordInput(guildMember: GuildMember): CreateUserFromDiscordInput {
    const id = this.generateUUID();
    return {
      id,
      username: guildMember.user.username,
      avatarURL: guildMember.avatarURL() || guildMember.displayAvatarURL(),
      socialAccountId: this.discordIdConverter.convertIdUsingDiscordNamespace(guildMember.id),
      provider: 'discord',
      socialId: guildMember.id,
      // NOTE: 임시로 root guildId 지정
      guildId: this.parseRootGuildId(),
      memberId: this.parseMemberId(guildMember.id),
      roleIds: guildMember.roles.cache.map((role) =>
        this.discordIdConverter.convertIdUsingDiscordNamespace(role.id),
      ),
    };
  }

  parseUpsertRolesInput(roleManager: RoleManager): CreateRoleInput[] {
    const highestRole = roleManager.highest;
    return roleManager.cache.map((role) => ({
      id: this.discordIdConverter.convertIdUsingDiscordNamespace(role.id),
      name: role.name,
      hexColor: role.hexColor === '#000000' ? '#7f838e' : role.hexColor,
      position: highestRole.position - role.position,
      guildId: this.parseRootGuildId(),
    }));
  }

  parseMemberId(discordMemberId: string): string {
    return this.discordIdConverter.convertIdUsingGuildNamespace(discordMemberId);
  }

  parseRoleId(discordRoleId: string): string {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(discordRoleId);
  }
}
