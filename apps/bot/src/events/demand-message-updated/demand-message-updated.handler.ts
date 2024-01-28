import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { DemandParser } from '@app/bot/apps/demand/parsers/demand.parser';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageUpdatedHandler {
  private readonly logger = new Logger(DemandMessageUpdatedHandler.name);

  constructor(
    private readonly demandParser: DemandParser,
    private readonly demandClient: DemandClient,
  ) {}

  @On('messageUpdate')
  public async onUpdateDemandMessage(
    @Context()
    [oldMessage, newMessage]: ContextOf<'messageUpdate'>,
  ) {
    const message = await newMessage.fetch();
    const updateDemandInput = this.demandParser.parseUpdateDealInput(message);
    await this.demandClient.updateDemand(updateDemandInput);
    this.logger.log(`Demand<@${updateDemandInput.id}> updated`);
  }
}
