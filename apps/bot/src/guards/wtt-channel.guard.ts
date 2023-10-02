import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Message } from 'discord.js';
import { values } from 'lodash';

@Injectable()
export class WttChannelGuard implements CanActivate {
  @Inject()
  private readonly configService: ConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [message]: [Message] = context.getArgByIndex(0);
    const allowedChannels: Record<string, string> = this.configService.get(
      'discord.server.market.wtt.channels',
    )!;
    const allowedChannelIds = values(allowedChannels);
    const wttChannel = allowedChannelIds.find((channelId) => channelId === message.channelId);
    return !!wttChannel;
  }
}
