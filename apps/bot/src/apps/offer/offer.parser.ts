import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Message } from 'discord.js';
import { DealParser } from '../deal/abstracts/deal.parser';
import { OfferErrorMessage } from './offer.error-message';

@Injectable()
export class OfferParser extends DealParser {
  matchFormat(content: string): RegExpExecArray | null {
    const re = /^wts[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(content);
  }

  parse(userId: string, message: Message) {
    const offerId = this.generateUUID();
    return {
      createOfferInput: this.parseCreateDealInput(offerId, userId, message),
      createManyUserImageInput: this.parseCreateUserImagesInput(userId, message, 'offer', offerId),
    };
  }

  parseCreateDealInput(id: string, userId: string, message: Message): CreateOfferInput {
    const match = this.matchFormat(message.content);
    if (!match) throw new RpcException(OfferErrorMessage.INVALID_OFFER_FORMAT);

    return {
      id,
      name: match[1].trim(),
      price: this.parsePrice(match[2]),
      priceCurrency: 'KRW',
      description: match[3].trim(),
      businessFunction: 'SELL',
      status: 'ON_SALE',
      guildId: this.parseGuildIdFromMessage(message),
      productCategoryId: this.parseProductCategoryIdFromMessage(message),
      sellerId: userId,
    };
  }
}
