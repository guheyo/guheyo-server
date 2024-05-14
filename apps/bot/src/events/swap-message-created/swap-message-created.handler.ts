import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { OfferChannelGuard } from '@app/bot/apps/offer/guards/offer-channel.guard';
import { SwapClient } from '@app/bot/apps/offer/swap/clients/swap.client';

@UseGuards(GroupGuard, OfferChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageCreatedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageCreate')
  public async onCreateSwapMessage(
    @Context(ParseUserFromMessagePipe)
    user: MyUserResponse,
    @Context(ParseGroupPipe)
    group: GroupResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    await this.swapClient.createOfferFromMessage(user, message, group);
  }
}
