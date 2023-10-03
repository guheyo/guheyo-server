import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Type } from '@app/bot/decorators/type.decorator';
import { Message } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from './abstracts/channel.guard';

@Injectable()
export class MarketChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const type = this.reflector.get<string>(Type, context.getClass());
    this.setIds(
      `discord.server.market.${type}.channels`,
      'discord.server.market.disallowed-role-ids',
      'discord.server.market.allowed-role-ids',
    );

    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate(message);
  }
}
