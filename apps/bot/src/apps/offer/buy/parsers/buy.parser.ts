import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { SHIPPING_FREE } from '@lib/shared/shipping/shipping.constants';
import { OFFER, OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { BuyErrorMessage } from './buy.error-message';
import { OfferParser } from '../../parsers/abstracts/offer.parser';

@Injectable()
export class BuyParser extends OfferParser {
  private readonly messageFormatRegex = /^wtb[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+(?:\.\d+)?)([\s\S]*)/i;

  private readonly threadFormatRegex = /^(.*)-[ ()a-zA-Z가-힣]*(\d+(?:\.\d+)?)/i;

  parseMessageContent(content: string): RegExpExecArray {
    const match = this.messageFormatRegex.exec(content);
    if (!match) throw new RpcException(BuyErrorMessage.INVALID_BUY_FORMAT);
    return match;
  }

  parseThreadContent(content: string): RegExpExecArray {
    const match = this.threadFormatRegex.exec(content);
    if (!match) throw new RpcException(BuyErrorMessage.INVALID_BUY_FORMAT);
    return match;
  }

  parseCreateOfferInputFromMessage(message: Message, group: GroupResponse): CreateOfferInput {
    const match = this.parseMessageContent(message.content);
    const channelName = this.parseCategoryNameFromMessage(message);
    const post = {
      id: this.parsePostIdFromMessageId(message.id),
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      type: OFFER,
      title: match[1].trim(),
      groupId: group.id,
      categoryId: this.parseCategoryId(channelName, group),
      tagIds: [],
    };

    return {
      post,
      id: this.parseIdFromMessageId(message.id),
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

  parseCreateOfferInputFromThread({
    startMessage,
    group,
    threadTitle,
    categoryName,
  }: {
    startMessage: Message;
    group: GroupResponse;
    threadTitle: string;
    categoryName: string;
  }): CreateOfferInput {
    const match = this.parseThreadContent(threadTitle);
    const post = {
      id: this.parsePostIdFromMessageId(startMessage.id),
      createdAt: startMessage.createdAt,
      updatedAt: startMessage.editedAt || startMessage.createdAt,
      type: OFFER,
      title: match[1].trim(),
      groupId: group.id,
      categoryId: this.parseCategoryId(categoryName, group),
      tagIds: [],
    };

    return {
      post,
      id: this.parseIdFromMessageId(startMessage.id),
      businessFunction: 'buy',
      name0: match[1].trim(),
      content: startMessage.content,
      price: this.parsePrice(match[2]),
      priceCurrency: 'krw',
      shippingCost: 0,
      shippingType: SHIPPING_FREE,
      status: OFFER_OPEN,
    };
  }

  parseUpdateOfferInputFromMessage(message: Message<boolean>): UpdateOfferInput {
    const match = this.parseMessageContent(message.content);
    const post = {
      title: match[1].trim(),
    };
    return {
      post,
      id: this.parseIdFromMessageId(message.id),
      name0: match[1].trim(),
      content: match[3].trim(),
      price: this.parsePrice(match[2]),
    };
  }

  parseUpdateOfferInputFromThread({
    startMessage,
    group,
    threadTitle,
    categoryName,
  }: {
    startMessage: Message;
    group: GroupResponse;
    threadTitle: string;
    categoryName: string;
  }): UpdateOfferInput {
    const match = this.parseThreadContent(threadTitle);
    const post = {
      title: match[1].trim(),
      categoryId: this.parseCategoryId(categoryName, group),
    };
    return {
      post,
      id: this.parseIdFromMessageId(startMessage.id),
      name0: match[1].trim(),
      content: startMessage.content,
      price: this.parsePrice(match[2]),
    };
  }
}
