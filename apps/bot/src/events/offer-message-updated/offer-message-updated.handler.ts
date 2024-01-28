import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageUpdatedHandler {
  constructor(private readonly offerClient: OfferClient) {}

  @On('messageUpdate')
  public async onUpdateOfferMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.offerClient.updateDealFromMessage(message);
  }
}
