import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageUpdatedHandler {
  constructor(private readonly swapClient: SwapClient) {}

  @On('messageUpdate')
  public async onUpdateSwapMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    await this.swapClient.updateDealFromMessage(message);
  }
}
