import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { BuyClient } from '@app/bot/apps/offer/buy/clients/buy.client';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wtb')
@Injectable()
export class BuyMessageUpdatedHandler {
  constructor(private readonly buyClient: BuyClient) {}

  @On('messageUpdate')
  public async onUpdateDemandMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.buyClient.updateOfferFromMessage(user, message);
  }
}
