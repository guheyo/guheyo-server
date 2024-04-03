import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Type } from '@app/bot/decorators/type.decorator';
import { MarketChannelType } from '@app/bot/shared/types/market-channel.type';
import { Message } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from '../../../shared/guards/channel.guard';

@Injectable()
export class DealChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const type = this.reflector.get<MarketChannelType>(Type, context.getClass());
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate(type, message);
  }
}
