import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithDeletedModelIdPipe } from '@app/bot/apps/user/pipes/parse-user-with-deleted-model-id.pipe';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';
import { DemandClient } from '@app/bot/apps/demand/clients/demand.client';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtb')
@Injectable()
export class DemandMessageDeletedHandler {
  private readonly logger = new Logger(DemandMessageDeletedHandler.name);

  constructor(private readonly demandClient: DemandClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserWithDeletedModelIdPipe)
    { user, deletedModelId }: UserWithDeletedModelId,
  ) {
    await this.demandClient.deleteDealFromMessage(deletedModelId);
  }
}
