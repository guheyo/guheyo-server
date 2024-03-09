import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageUpdatedHandler {
  constructor(private readonly offerClient: OfferClient) {}

  @On('messageUpdate')
  public async onUpdateOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.offerClient.updateDealFromMessage(user.id, message);
  }
}
