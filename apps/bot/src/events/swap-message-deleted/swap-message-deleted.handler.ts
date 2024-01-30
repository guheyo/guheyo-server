import { Injectable, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithDeletedModelIdPipe } from '@app/bot/apps/user/pipes/parse-user-with-deleted-model-id.pipe';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageDeletedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserWithDeletedModelIdPipe)
    { user, deletedModelId }: UserWithDeletedModelId,
  ) {
    await this.swapClient.deleteDealFromMessage(deletedModelId);
  }
}
