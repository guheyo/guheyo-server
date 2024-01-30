import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';

@UseGuards(GroupGuard, DealChannelGuard)
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
