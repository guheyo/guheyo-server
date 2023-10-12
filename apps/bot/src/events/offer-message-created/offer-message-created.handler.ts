import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { MarketChannelGuard } from '@app/bot/apps/deal/guards/market-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { ParseUserWithMessagePipe } from '@app/bot/apps/user/pipes/parse-user-with-message.pipe';
import { ParseCreateOfferInputWithUploadUserImageInputListPipe } from '@app/bot/apps/offer/pipes/parse-create-offer-input-with-upload-user-image-input-list.pipe';
import { CreateOfferInputWithUploadUserImageInputList } from '@app/bot/apps/offer/parsers/offer.types';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';

@UseGuards(GuildGuard, MarketChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  private readonly logger = new Logger(OfferMessageCreatedHandler.name);

  constructor(private readonly offerClient: OfferClient) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(ParseUserWithMessagePipe, ParseCreateOfferInputWithUploadUserImageInputListPipe)
    { createOfferInput, uploadUserImageInputList }: CreateOfferInputWithUploadUserImageInputList,
  ) {
    await this.offerClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.offerClient.createOffer(createOfferInput);
    this.logger.log(`Offer<@${createOfferInput.id}> created`);
  }
}
