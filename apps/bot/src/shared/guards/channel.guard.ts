import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GuildMemberRoleManager, Message } from 'discord.js';
import { values } from 'lodash';

@Injectable()
export abstract class ChannelGuard {
  @Inject()
  private readonly configService: ConfigService;

  allowedChannelIds: string[];

  disallowedRoleIds: string[];

  allowedRoleIds: '*' | string[];

  private isValidChannel(channelId: string): boolean {
    const wtsChannel = this.allowedChannelIds.find(
      (allowedChannelId) => allowedChannelId === channelId,
    );
    return !!wtsChannel;
  }

  private hasValidRoles(roleManager: GuildMemberRoleManager): boolean {
    const hasDisallowedRole = roleManager.cache.some((role) =>
      this.disallowedRoleIds.includes(role.id),
    );
    if (hasDisallowedRole) return false;
    if (this.allowedRoleIds === '*') return true;
    const hasAllowedRole = roleManager.cache.some((role) => this.allowedRoleIds.includes(role.id));
    return !!hasAllowedRole;
  }

  validate(message: Message): boolean {
    if (!this.isValidChannel(message.channelId)) return false;
    if (!message.member) return false;
    if (!this.hasValidRoles(message.member.roles)) return false;
    return true;
  }

  setIds(
    allowedChannelsPath: string,
    disallowedRoleIdsPath: string,
    allowedRoleIdsPath: string,
  ): void {
    const allowedChannels: Record<string, string> = this.configService.get(allowedChannelsPath)!;
    this.allowedChannelIds = values(allowedChannels);
    this.disallowedRoleIds = this.configService.get(disallowedRoleIdsPath)!;
    this.allowedRoleIds = this.configService.get(allowedRoleIdsPath)!;
  }
}
