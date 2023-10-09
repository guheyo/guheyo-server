import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/guards/guilds/guild.guard';
import { MarketChannelGuard } from '@app/bot/guards/channels/market-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { UserWithMessagePipe } from '@app/bot/pipes/user/user-with-message.pipe';
import { OfferPipe } from '@app/bot/pipes/offer/offer.pipe';
import { CreateOfferInputWithUploadUserImageInputList } from '@app/bot/apps/offer/offer.types';
import { OfferClient } from '@app/bot/apps/offer/offer.client';

@UseGuards(GuildGuard, MarketChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  private readonly logger = new Logger(OfferMessageCreatedHandler.name);

  constructor(private readonly offerClient: OfferClient) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(UserWithMessagePipe, OfferPipe)
    { createOfferInput, uploadUserImageInputList }: CreateOfferInputWithUploadUserImageInputList,
  ) {
    await this.offerClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.offerClient.createOffer(createOfferInput);
  }
}
