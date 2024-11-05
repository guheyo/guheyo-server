import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Message, ThreadChannel } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from '../../channel/guards/channel.guard';

@Injectable()
export class ThreadChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate({ message });
  }

  async validate({ message }: { message: Message }): Promise<boolean> {
    const { channel, guild } = message;
    if (!(channel instanceof ThreadChannel)) {
      return false;
    }

    if (!channel.parentId) return false;

    const server = this.discordConfigService.findDiscordServerByThreadChannelId(channel.parentId);
    const thread = server?.thread;
    const member = await guild?.members.fetch(message.author.id);

    if (!thread || !member) return false;
    if (!this.hasValidRoles(thread.allowedRoleIds, thread.disallowedRoleIds, member.roles))
      return false;
    return true;
  }
}
