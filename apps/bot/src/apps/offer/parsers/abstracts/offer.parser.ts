import { Message, PartialMessage, TextChannel } from 'discord.js';
import { RpcException } from '@nestjs/microservices';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { GroupParser } from '@app/bot/apps/group/parsers/group.parser';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { OfferErrorMessage } from './offer.error-message';

export abstract class OfferParser extends GroupParser {
  abstract parseMessageContent(content: string): RegExpExecArray;

  matchCategoryName(channelName: string): string | null {
    const re = /([a-zA-Z가-힣]*)-(삽니다|팝니다|교환합니다|의뢰합니다|구합니다)/;
    const match = re.exec(channelName);
    return match ? match[1] : null;
  }

  abstract parseCreateOfferInputFromMessage(
    message: Message,
    group: GroupResponse,
  ): CreateOfferInput;

  abstract parseCreateOfferInputFromThread({
    startMessage,
    group,
    threadTitle,
    categoryName,
  }: {
    startMessage: Message;
    group: GroupResponse;
    threadTitle: string;
    categoryName: string;
  }): CreateOfferInput;

  abstract parseUpdateOfferInputFromMessage(message: Message): UpdateOfferInput;

  parseDeleteOfferArgs(message: Message | PartialMessage): DeleteOfferArgs {
    return {
      id: this.parseIdFromMessageId(message.id),
    };
  }

  parsePrice(price: string) {
    return Number(Number(price).toFixed(1)) * 10000;
  }

  parseCategoryName(channelName: string): string {
    const categoryName = this.matchCategoryName(channelName);
    if (!categoryName) throw new RpcException(OfferErrorMessage.INVALID_CATEGORY_NAME_FORMAT);
    return categoryName;
  }

  parseCategoryNameFromMessage(message: Message): string {
    const channel = message.channel as TextChannel;
    return this.parseCategoryName(channel.name);
  }
}
