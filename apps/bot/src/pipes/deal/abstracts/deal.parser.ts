import { DiscordIdConverter } from '@app/bot/shared/discord-id-converter';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Inject, Injectable } from '@nestjs/common';
import { Message, TextChannel } from 'discord.js';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export abstract class DealParser {
  @Inject()
  readonly discordIdConverter: DiscordIdConverter;

  id: string;

  userId: string;

  message: Message;

  type: string;

  match: RegExpExecArray | null;

  priceCurrency: string;

  guildId: string;

  productCategoryId: string;

  constructor() {
    this.id = uuid4();
    this.priceCurrency = 'KRW';
  }

  abstract matchFormat(): RegExpExecArray | null;

  abstract parse(): any;

  abstract parseCreateDealInput(): CreateOfferInput;

  set(userId: string, message: Message) {
    this.userId = userId;
    this.message = message;
    this.match = this.matchFormat();
    this.guildId = this.discordIdConverter.convertIdUsingDiscordNamespace(this.message.guildId!);
    const channel = this.message.channel as TextChannel;
    this.productCategoryId = this.discordIdConverter.convertIdUsingGuildNamespace(
      channel.parentId!,
    );
  }

  validate(): boolean {
    if (this.type === 'wtb') return this.isValidFormat();
    return this.isValidFormat() && this.hasAttachments();
  }

  isValidFormat() {
    return !!this.match;
  }

  hasAttachments() {
    return this.message.attachments.size > 0;
  }

  parseCreateUserImagesInput(): CreateUserImageInput[] {
    let position = 0;
    const createUserImageinputs: CreateUserImageInput[] = this.message.attachments.map(
      (attachment) => {
        const input = {
          id: uuid4(),
          name: attachment.name,
          url: attachment.url,
          contentType: attachment.contentType ?? undefined,
          description: attachment.description ?? undefined,
          height: attachment.height ?? undefined,
          width: attachment.width ?? undefined,
          position,
          type: this.type,
          refId: this.id,
          tracked: false,
          userId: this.userId,
        };
        position += 1;
        return input;
      },
    );
    return createUserImageinputs;
  }

  parsePrice(price: string) {
    return Number(price) * 10000;
  }
}
