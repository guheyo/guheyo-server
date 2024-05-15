import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromDeletedMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-deleted-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';
import { SellClient } from '@app/bot/apps/offer/sell/clients/sell.client';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wts')
@Injectable()
export class SellMessageDeletedHandler {
  constructor(private readonly sellClient: SellClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserFromDeletedMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageDelete'>,
  ) {
    await this.sellClient.deleteOfferFromMessage(user, message);
  }
}
