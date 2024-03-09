import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageDeletedHandler {
  constructor(private readonly offerClient: OfferClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context()
    [message]: ContextOf<'messageDelete'>,
  ) {
    const fetchedMessage = await message.fetch();
    await this.offerClient.deleteDealFromMessage(user.id, fetchedMessage);
  }
}
