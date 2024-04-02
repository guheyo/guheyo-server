import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { ParseGroupPipe } from '@app/bot/apps/group/pipes/parse-group.pipe';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@UseGuards(GroupGuard, DealChannelGuard)
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
    await this.swapClient.createDealFromMessage(user, message, group);
  }
}
