import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message, PartialMessage } from 'discord.js';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DeleteOfferArgs } from '@lib/domains/offer/application/commands/delete-offer/delete-offer.args';
import { OFFER_OPEN } from '@lib/domains/offer/domain/offer.constants';
import { SHIPPING_FREE } from '@lib/shared/shipping/shipping.constants';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { OfferErrorMessage } from './offer.error-message';

@Injectable()
export class OfferParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wts[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+(?:\.\d+)?)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(userId: string, message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(OfferErrorMessage.INVALID_OFFER_FORMAT);

    return {
      sellerId: userId,
      id: this.parseIdFromMessage(message),
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      shippingCost: 0,
      shippingType: SHIPPING_FREE,
      description: match[3].trim(),
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateOfferInput {
    const dealSummary = this.parseDealSummary(userId, message);

    return {
      ...dealSummary,
      createdAt: message.createdAt,
      updatedAt: message.editedAt || message.createdAt,
      priceCurrency: 'krw',
      businessFunction: 'sell',
      status: OFFER_OPEN,
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
    };
  }

  parseUpdateDealInput(userId: string, message: Message<boolean>): UpdateOfferInput {
    return this.parseDealSummary(userId, message);
  }

  parseDeleteDealArgs(userId: string, message: Message | PartialMessage): DeleteOfferArgs {
    return {
      sellerId: userId,
      id: this.parseIdFromMessage(message),
    };
  }
}
