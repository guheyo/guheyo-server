import { Parser } from '@app/bot/shared/parser';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { CreateUserImageInput } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.input';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message, TextChannel } from 'discord.js';
import { DealErrorMessage } from '../deal.error-message';

@Injectable()
export abstract class DealParser extends Parser {
  abstract matchFormat(content: string): RegExpExecArray | null;

  abstract parse(userId: string, message: Message): any;

  abstract parseCreateDealInput(id: string, userId: string, message: Message): CreateOfferInput;

  isValidFormat(match: RegExpExecArray | null) {
    return !!match;
  }

  hasAttachments(message: Message) {
    return message.attachments.size > 0;
  }

  parseCreateUserImagesInput(
    userId: string,
    message: Message,
    type: string,
    refId: string,
  ): CreateUserImageInput[] {
    if (!this.hasAttachments(message))
      throw new RpcException(DealErrorMessage.NOT_FOUND_ATTACHMENTS);

    let position = 0;
    const createUserImageinputs: CreateUserImageInput[] = message.attachments.map((attachment) => {
      const input = {
        id: this.generateUUID(),
        name: attachment.name,
        url: attachment.url,
        contentType: attachment.contentType ?? undefined,
        description: attachment.description ?? undefined,
        height: attachment.height ?? undefined,
        width: attachment.width ?? undefined,
        position,
        type,
        refId,
        userId,
      };
      position += 1;
      return input;
    });
    return createUserImageinputs;
  }

  parsePrice(price: string) {
    return Number(price) * 10000;
  }

  parseGuildIdFromMessage(message: Message) {
    return this.discordIdConverter.convertIdUsingDiscordNamespace(message.guildId!);
  }

  parseProductCategoryIdFromMessage(message: Message) {
    const channel = message.channel as TextChannel;
    return this.discordIdConverter.convertIdUsingGuildNamespace(channel.parentId!);
  }
}
