import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { UpdateOfferInput } from '@lib/domains/offer/application/commands/update-offer/update-offer.input';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { DealParser } from '../../deal/parsers/abstracts/deal.parser';
import { OfferErrorMessage } from './offer.error-message';

@Injectable()
export class OfferParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wts[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(content);
  }

  parseDealSummary(message: Message) {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(OfferErrorMessage.INVALID_OFFER_FORMAT);

    return {
      id: this.parseIdFromMessage(message),
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      description: match[3].trim(),
      source: 'discord',
    };
  }

  parseCreateDealInput(userId: string, message: Message, group: GroupResponse): CreateOfferInput {
    const dealSummary = this.parseDealSummary(message);

    return {
      ...dealSummary,
      priceCurrency: 'KRW',
      businessFunction: 'SELL',
      status: 'OPEN',
      groupId: group.id,
      productCategoryId: this.parseProductCategoryId(message, group),
      sellerId: userId,
    };
  }

  parseUpdateDealInput(message: Message<boolean>): UpdateOfferInput {
    return this.parseDealSummary(message);
  }
}
