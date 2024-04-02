import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';
import { ParseUserFromDeletedMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-deleted-message.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageDeletedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserFromDeletedMessagePipe)
    user: MyUserResponse,
    @Context()
    [message]: ContextOf<'messageDelete'>,
  ) {
    await this.swapClient.deleteDealFromMessage(user.id, message);
  }
}
