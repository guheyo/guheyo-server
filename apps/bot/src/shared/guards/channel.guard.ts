import { Inject, Injectable } from '@nestjs/common';
import { GuildMemberRoleManager, Message } from 'discord.js';
import { MarketChannelType } from '../types/market-channel.type';
import { ConfigParser } from '../parsers/config.parser';

@Injectable()
export abstract class ChannelGuard {
  @Inject()
  private readonly configParser: ConfigParser;

  private hasValidRoles(
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

  validate(type: MarketChannelType, message: Message): boolean {
    const market = this.configParser.findDiscordMarket(type, message);

    if (!market) return false;
    if (!message.member) return false;
    if (!this.hasValidRoles(market.allowedRoleIds, market.disallowedRoleIds, message.member.roles))
      return false;
    return true;
  }
}
