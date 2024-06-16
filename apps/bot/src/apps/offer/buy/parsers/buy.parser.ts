import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { SHIPPING_FREE } from '@lib/shared/shipping/shipping.constants';
import { OFFER, OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { DISCORD } from '@lib/shared/discord/discord.constants';
import { BuyErrorMessage } from './buy.error-message';
import { OfferParser } from '../../parsers/abstracts/offer.parser';

@Injectable()
export class BuyParser extends OfferParser {
  matchFormat(content: string): RegExpExecArray {
    const re = /^wtb[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+(?:\.\d+)?)([\s\S]*)/i;
    const match = re.exec(content);
    if (!match) throw new RpcException(BuyErrorMessage.INVALID_BUY_FORMAT);
    return match;
  }

  parseCreateOfferInput(message: Message, group: GroupResponse): CreateOfferInput {
    const match = this.matchFormat(message.content);
    const channelName = this.parseCategoryNameFromMessage(message);
    const post = {
      id: this.parsePostIdFromMessage(message),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      type: OFFER,
      title: match[1].trim(),
      groupId: group.id,
      categoryId: this.parseCategoryId(channelName, group),
      tagIds: [],
      userAgent: DISCORD,
    };

    return {
      post,
      id: this.parseIdFromMessage(message),
      businessFunction: 'buy',
      name0: match[1].trim(),
      content: match[3].trim(),
      price: this.parsePrice(match[2]),
      priceCurrency: 'krw',
      shippingCost: 0,
      shippingType: SHIPPING_FREE,
      status: OFFER_OPEN,
    };
  }

  parseUpdateOfferInput(message: Message<boolean>): UpdateOfferInput {
    const match = this.matchFormat(message.content);
    const post = {
      title: match[1].trim(),
    };
    return {
      post,
      id: this.parseIdFromMessage(message),
      name0: match[1].trim(),
      content: match[3].trim(),
      price: this.parsePrice(match[2]),
    };
  }
}
