import { Injectable } from '@nestjs/common';
import { GuildMember, Role, RoleManager, User } from 'discord.js';
import { CreateRoleInput } from '@lib/domains/role/application/commands/create-role/create-role.input';
import { SignInUserInput } from '@lib/domains/user/application/commands/sign-in-user/sing-in-user.input';
import { DEFAULT_ROLE_COLOR } from '@lib/domains/role/domain/role.constants';
import { GroupParser } from '../../group/parsers/group.parser';

@Injectable()
export class UserParser extends GroupParser {
  parseSignInUserInput(provider: string, discordUser: User): SignInUserInput {
    return {
      id: this.generateUUID(),
      username: discordUser.username,
      avatarURL: discordUser.avatarURL() || discordUser.displayAvatarURL(),
      provider,
      socialId: discordUser.id,
    };
  }

  parseUpsertRolesInput(roleManager: RoleManager): CreateRoleInput[] {
    const highestRole = roleManager.highest;
    return roleManager.cache.map((role) => ({
      id: this.discordIdConverter.convertIdUsingDiscordNamespace(role.id),
      name: role.name,
      hexColor: role.hexColor === '#000000' ? DEFAULT_ROLE_COLOR : role.hexColor,
      position: highestRole.position - role.position,
      groupId: this.parseRootGroupId(),
    }));
  }

  parseRoleNames(discordMember: GuildMember): string[] {
    return discordMember.roles.cache.map((role) => role.name);
  }

  parseMemberMensionsMessage(members: GuildMember[]): string {
    return members.map((member) => `<@${member.id}>`).join(' ');
  }

  parseRoleNamesMessage(roles: Role[]): string {
    return roles.map((role) => role.name).join(', ');
  }
}
