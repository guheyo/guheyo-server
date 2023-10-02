import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Message } from 'discord.js';
import { values } from 'lodash';

@Injectable()
export class WtsChannelGuard implements CanActivate {
  @Inject()
  private readonly configService: ConfigService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const [message]: [Message] = context.getArgByIndex(0);
    const allowedChannels: Record<string, string> = this.configService.get(
      'discord.server.market.wts.channels',
    )!;
    const allowedChannelIds = values(allowedChannels);
    const wtsChannel = allowedChannelIds.find((channelId) => channelId === message.channelId);
    return !!wtsChannel;
  }
}
