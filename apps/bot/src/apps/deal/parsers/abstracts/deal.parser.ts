import { Message, TextChannel } from 'discord.js';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { CreateDemandInput } from '@lib/domains/demand/application/commands/create-demand/create-demand.input';
import { UpdateDemandInput } from '@lib/domains/demand/application/commands/update-demand/update-demand.input';
import { CreateSwapInput } from '@lib/domains/swap/application/commands/create-swap/create-swap.input';
import { UpdateSwapInput } from '@lib/domains/swap/application/commands/update-swap/update-swap.input';
import { Parser } from '../../../../shared/parsers/parser';

export abstract class DealParser extends Parser {
  abstract matchFormat(content: string): RegExpExecArray | null;

  abstract parseCreateDealInput(
    userId: string,
    message: Message,
  ): CreateOfferInput | CreateDemandInput | CreateSwapInput;

  abstract parseUpdateDealInput(
    userId: string,
    message: Message,
  ): UpdateOfferInput | UpdateDemandInput | UpdateSwapInput;

  parsePrice(price: string) {
    return Number(price) * 10000;
  }

  parseProductCategoryIdFromMessage(message: Message) {
    const channel = message.channel as TextChannel;
    return this.discordIdConverter.convertIdUsingDiscordNamespace(channel.parentId!);
  }
}
