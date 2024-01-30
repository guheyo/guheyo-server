import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';

@UseGuards(GroupGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageUpdatedHandler {
  constructor(private readonly demandClient: DemandClient) {}

  @On('messageUpdate')
  public async onUpdateDemandMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    this.demandClient.updateDealFromMessage(message);
  }
}
