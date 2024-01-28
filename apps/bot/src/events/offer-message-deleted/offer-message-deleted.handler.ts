import { Injectable, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithDeletedModelIdPipe } from '@app/bot/apps/user/pipes/parse-user-with-deleted-model-id.pipe';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { UserWithDeletedModelId } from '@app/bot/apps/user/parsers/user.types';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageDeletedHandler {
  constructor(private readonly offerClient: OfferClient) {}

  @On('messageDelete')
  public async onDeleteOfferMessage(
    @Context(ParseUserWithDeletedModelIdPipe)
    { user, deletedModelId }: UserWithDeletedModelId,
  ) {
    await this.offerClient.deleteDealFromMessage(deletedModelId);
  }
}
