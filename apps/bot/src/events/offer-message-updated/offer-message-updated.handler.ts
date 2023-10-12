import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { ParseUpdateOfferInputPipe } from '@app/bot/apps/offer/pipes/parse-update-offer-input.pipe';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageUpdatedHandler {
  private readonly logger = new Logger(OfferMessageUpdatedHandler.name);

  constructor(private readonly offerClient: OfferClient) {}

  @On('messageUpdate')
  public async onUpdateOfferMessage(
    @Context(ParseUserWithMessagePipe, ParseUpdateOfferInputPipe)
    updateOfferInput: UpdateOfferInput,
  ) {
    await this.offerClient.updateOffer(updateOfferInput);
    this.logger.log(`Offer<@${updateOfferInput.id}> updated`);
  }
}
