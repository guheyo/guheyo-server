import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Type } from '@app/bot/decorators/type.decorator';
import { MarketChannelType } from '@app/bot/shared/types/market-channel.type';
import { Message } from 'discord.js';
import { Observable } from 'rxjs';
import { ChannelGuard } from '../../../shared/guards/channel.guard';

@Injectable()
export class OfferChannelGuard extends ChannelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const type = this.reflector.get<MarketChannelType>(Type, context.getClass());
    const [message]: [Message] = context.getArgByIndex(0);
    return this.validate(type, message);
  }

  validate(type: MarketChannelType, message: Message): boolean {
    const market = this.discordConfigService.findDiscordMarket(type, message);

    if (!market) return false;
    if (!message.member) return false;
    if (!this.hasValidRoles(market.allowedRoleIds, market.disallowedRoleIds, message.member.roles))
      return false;
    return true;
  }
}
