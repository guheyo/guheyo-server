import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { OfferParser } from '@app/bot/apps/offer/parsers/offer.parser';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageUpdatedHandler {
  private readonly logger = new Logger(OfferMessageUpdatedHandler.name);

  constructor(
    private readonly offerParser: OfferParser,
    private readonly offerClient: OfferClient,
  ) {}

  @On('messageUpdate')
  public async onUpdateOfferMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    const updateOfferInput = this.offerParser.parseUpdateDealInput(message);
    await this.offerClient.updateOffer(updateOfferInput);
    this.logger.log(`Offer<@${updateOfferInput.id}> updated`);
  }
}
