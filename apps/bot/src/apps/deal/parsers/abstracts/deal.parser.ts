import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { Message, TextChannel } from 'discord.js';
import { Parser } from '../../../../shared/parsers/parser';

export abstract class DealParser extends Parser {
  abstract matchFormat(content: string): RegExpExecArray | null;

  abstract parseCreateDealInput(userId: string, message: Message): CreateOfferInput;

  abstract parseUpdateDealInput(userId: string, message: Message): UpdateOfferInput;

  parsePrice(price: string) {
    return Number(price) * 10000;
  }

  parseProductCategoryIdFromMessage(message: Message) {
    const channel = message.channel as TextChannel;
    return this.discordIdConverter.convertIdUsingDiscordNamespace(channel.parentId!);
  }
}
