import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { ParseUpdateDemandInputPipe } from '@app/bot/apps/demand/pipes/parse-update-demand-input.pipe';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageUpdatedHandler {
  private readonly logger = new Logger(DemandMessageUpdatedHandler.name);

  constructor(private readonly demandClient: DemandClient) {}

  @On('messageUpdate')
  public async onUpdateDemandMessage(
    @Context(ParseUserWithMessagePipe, ParseUpdateDemandInputPipe)
    updateDemandInput: UpdateDemandInput,
  ) {
    await this.demandClient.updateDemand(updateDemandInput);
    this.logger.log(`Demand<@${updateDemandInput.id}> updated`);
  }
}
