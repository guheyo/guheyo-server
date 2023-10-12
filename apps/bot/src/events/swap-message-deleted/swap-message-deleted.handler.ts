import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithDeletedModelIdPipe } from '@app/bot/apps/user/pipes/parse-user-with-deleted-model-id.pipe';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';
import { SwapClient } from '@app/bot/apps/swap/clients/swap.client';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wtt')
@Injectable()
export class SwapMessageDeletedHandler {
  private readonly logger = new Logger(SwapMessageDeletedHandler.name);

  constructor(private readonly swapClient: SwapClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserWithDeletedModelIdPipe)
    { user, deletedModelId }: UserWithDeletedModelId,
  ) {
    await this.swapClient.deleteSwap(deletedModelId);
    this.logger.log(`Swap<@${deletedModelId}> deleted`);
  }
}
