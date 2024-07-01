import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Name } from '@app/bot/decorators/name.decorator';
import { Message, ThreadChannel } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from '../../channel/guards/channel.guard';

@Injectable()
export class CommunityChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const guildName = this.reflector.get<string>(Name, context.getClass());
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate({ guildName, message });
  }

  async validate({
    guildName,
    message,
  }: {
    guildName: string;
    message: Message;
  }): Promise<boolean> {
    const { channel, guild } = message;
    if (!(channel instanceof ThreadChannel)) {
      return false;
    }

    const server = this.discordConfigService.findDiscordServerByName(guildName);
    const community = server?.community;
    const member = await guild?.members.fetch(message.author.id);

    if (!community?.channels.some((c) => c.id === channel.parentId)) return false;
    if (!member) return false;
    if (!this.hasValidRoles(community.allowedRoleIds, community.disallowedRoleIds, member.roles))
      return false;
    return true;
  }
}
