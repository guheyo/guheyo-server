import { Parser } from '@app/bot/shared/parsers/parser';
import { Injectable } from '@nestjs/common';
import { GuildMember, RoleManager } from 'discord.js';
import _ from 'lodash';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';
import { CreateRoleInput } from '@lib/domains/role/application/commands/create-role/create-role.input';

@Injectable()
export class UserParser extends Parser {
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
      memberId: this.discordIdConverter.convertIdUsingGuildNamespace(guildMember.id),
      roleIds: guildMember.roles.cache.map((role) =>
        this.discordIdConverter.convertIdUsingDiscordNamespace(role.id),
      ),
    };
  }

  parseUpsertRolesInput(roleManager: RoleManager): CreateRoleInput[] {
    const highestRole = roleManager.highest;
    return roleManager.cache.map((role) => ({
      id: this.discordIdConverter.convertIdUsingDiscordNamespace(role.id),
      ..._.pick(role, ['name', 'hexColor']),
      position: highestRole.position - role.position,
      guildId: this.parseRootGuildId(),
    }));
  }
}
