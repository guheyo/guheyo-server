import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { SHIPPING_FREE } from '@lib/shared/shipping/shipping.constants';
import { OFFER, OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { SwapErrorMessage } from './swap.error-message';
import { OfferParser } from '../../parsers/abstracts/offer.parser';

@Injectable()
export class SwapParser extends OfferParser {
  matchFormat(content: string): RegExpExecArray {
    const re = /^wtt[\r\n](.*)[\s\S]+wttf[\r\n](.*)([\s\S]*)/i;
    const match = re.exec(content);
    if (!match) throw new RpcException(SwapErrorMessage.INVALID_SWAP_FORMAT);
    return match;
  }

  parseCreateOfferInputFromMessage(message: Message, group: GroupResponse): CreateOfferInput {
    const match = this.matchFormat(message.content);
    const channelName = this.parseCategoryNameFromMessage(message);
    const post = {
      id: this.parsePostIdFromMessageId(message.id),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      type: OFFER,
      title: `${match[1].trim()} - ${match[2].trim()}`,
      groupId: group.id,
      categoryId: this.parseCategoryId(channelName, group),
      tagIds: [],
    };

    return {
      post,
      id: this.parseIdFromMessageId(message.id),
      businessFunction: 'swap',
      name0: match[1].trim(),
      name1: match[2].trim(),
      content: match[3].trim(),
      price: 0,
      priceCurrency: 'krw',
      shippingCost: 0,
      shippingType: SHIPPING_FREE,
      status: OFFER_OPEN,
    };
  }

  parseUpdateOfferInputFromMessage(message: Message<boolean>): UpdateOfferInput {
    const match = this.matchFormat(message.content);
    const post = {
      title: `${match[1].trim()} - ${match[2].trim()}`,
    };
    return {
      post,
      id: this.parseIdFromMessageId(message.id),
      name0: match[1].trim(),
      name1: match[2].trim(),
      content: match[3].trim(),
      price: this.parsePrice(match[2]),
    };
  }
}
