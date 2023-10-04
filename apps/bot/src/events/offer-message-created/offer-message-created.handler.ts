import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { MarketChannelGuard } from '@app/bot/guards/channels/market-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { UserWithMessagePipe } from '@app/bot/pipes/user/user-with-message.pipe';
import { OfferPipe } from '@app/bot/pipes/deal/offer/offer.pipe';
import { OfferWithUserImagesCreateInput } from '@app/bot/pipes/deal/offer/offer.types';

@UseGuards(GuildGuard, MarketChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  private readonly logger = new Logger(OfferMessageCreatedHandler.name);

  constructor(private readonly commandBus: CommandBus) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(UserWithMessagePipe, OfferPipe)
    { createOfferInput, createUserImagesInput }: OfferWithUserImagesCreateInput,
  ) {
    // TODO: create created offer message
  }
}
