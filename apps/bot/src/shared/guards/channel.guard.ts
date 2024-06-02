import { Inject, Injectable } from '@nestjs/common';
import { GuildMemberRoleManager } from 'discord.js';
import { DiscordConfigService } from '../discord/discord.config.service';

@Injectable()
export abstract class ChannelGuard {
  @Inject()
  protected readonly discordConfigService: DiscordConfigService;

  protected hasValidRoles(
    allowedRoleIds: string[],
    disallowedRoleIds: string[],
    roleManager: GuildMemberRoleManager,
  ): boolean {
    const hasDisallowedRole = roleManager.cache.some((role) => disallowedRoleIds.includes(role.id));
    if (hasDisallowedRole) return false;
    if (allowedRoleIds.length === 0) return true;
    const hasAllowedRole = roleManager.cache.some((role) => allowedRoleIds.includes(role.id));
    return !!hasAllowedRole;
  }
}
