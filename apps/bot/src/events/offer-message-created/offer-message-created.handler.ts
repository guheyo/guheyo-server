import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  constructor(private readonly offerClient: OfferClient) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.offerClient.createDealFromMessage(user.id, message, group);
  }
}
