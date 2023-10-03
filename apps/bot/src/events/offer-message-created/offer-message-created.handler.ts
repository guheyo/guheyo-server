import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { MarketChannelGuard } from '@app/bot/guards/channels/market-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';

@UseGuards(GuildGuard, MarketChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  private readonly logger = new Logger(OfferMessageCreatedHandler.name);

  constructor(private readonly commandBus: CommandBus) {}

  @On('messageCreate')
  public async onCreateOfferMessage(@Context() [message]: ContextOf<'messageCreate'>) {
    // TODO: create created offer message
  }
}
