import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { GuildGuard } from '@app/bot/apps/guild/guards/guild.guard';
import { DealChannelGuard } from '@app/bot/apps/deal/guards/deal-channel.guard';
import { Type } from '@app/bot/decorators/type.decorator';
import { OfferClient } from '@app/bot/apps/offer/clients/offer.client';
import { ParseUserFromMessagePipe } from '@app/bot/apps/user/pipes/parse-user-from-message.pipe';
import { SimpleUser } from '@app/bot/apps/user/parsers/user.types';
import { ParseGuildPipe } from '@app/bot/apps/guild/pipes/parse-guild.pipe';
import { GuildResponse } from '@lib/domains/guild/application/dtos/guild.response';
import { OfferParser } from '@app/bot/apps/offer/parsers/offer.parser';
import { UserImageParser } from '@app/bot/apps/user-image/parsers/user-image.parser';

@UseGuards(GuildGuard, DealChannelGuard)
@Type('wts')
@Injectable()
export class OfferMessageCreatedHandler {
  private readonly logger = new Logger(OfferMessageCreatedHandler.name);

  constructor(
    private readonly offerParser: OfferParser,
    private readonly userImageParser: UserImageParser,
    private readonly offerClient: OfferClient,
  ) {}

  @On('messageCreate')
  public async onCreateOfferMessage(
    @Context(ParseUserFromMessagePipe)
    user: SimpleUser,
    @Context(ParseGuildPipe)
    guild: GuildResponse,
    @Context()
    [message]: ContextOf<'messageCreate'>,
  ) {
    const uploadUserImageInputList = this.userImageParser.parseUploadUserImageInputList(
      user.id,
      message,
      'offer',
    );
    const createOfferInput = this.offerParser.parseCreateDealInput(user.id, message, guild.id);
    await this.offerClient.uploadAndCreateAttachments(uploadUserImageInputList);
    await this.offerClient.createOffer(createOfferInput);
    this.logger.log(`Offer<@${createOfferInput.id}> created`);
  }
}
