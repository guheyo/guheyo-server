import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';
import { SellClient } from '@app/bot/apps/offer/sell/clients/sell.client';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wts')
@Injectable()
export class SellMessageCreatedHandler {
  constructor(private readonly sellClient: SellClient) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.sellClient.createOfferFromMessage(user, message, group);
  }
}
