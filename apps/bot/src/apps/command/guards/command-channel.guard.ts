import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GuildName } from '@app/bot/decorators/guild-name.decorator';
import { Name } from '@app/bot/decorators/name.decorator';
import { Message } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from '../../channel/guards/channel.guard';

@Injectable()
export class CommandChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const guildName = this.reflector.get<string>(GuildName, context.getClass());
    const name = this.reflector.get<string>(Name, context.getClass());
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate(guildName, name, message);
  }

  validate(guildName: string, name: string, message: Message): boolean {
    const channel = this.discordConfigService.findCommandChannel(guildName, name);
    if (!channel) return false;
    if (channel.id !== message.channelId) return false;

    if (!message.member) return false;
    if (message.content.trim() !== `-${name}`) return false;

    if (
      !this.hasValidRoles(channel.allowedRoleIds, channel.disallowedRoleIds, message.member.roles)
    )
      return false;
    return true;
  }
}
