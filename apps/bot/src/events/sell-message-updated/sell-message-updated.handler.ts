import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';
import { SellClient } from '@app/bot/apps/offer/sell/clients/sell.client';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wts')
@Injectable()
export class SellMessageUpdatedHandler {
  constructor(private readonly sellClient: SellClient) {}

  @On('messageUpdate')
  public async onUpdateOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.sellClient.updateOfferFromMessage(user, message);
  }
}
