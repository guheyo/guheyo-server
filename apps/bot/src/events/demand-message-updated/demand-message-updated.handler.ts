import { Injectable, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';

@UseGuards(GuildGuard, DealChannelGuard)
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
    this.demandClient.updateDemandFromMessage(message);
  }
}
