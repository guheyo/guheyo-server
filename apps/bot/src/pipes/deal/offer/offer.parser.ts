import { CreateOfferInput } from '@lib/domains/offer/application/commands/create-offer/create-offer.input';
import { Injectable } from '@nestjs/common';
import { DealParser } from '../abstracts/deal.parser';

@Injectable()
export class OfferParser extends DealParser {
  constructor() {
    super();
    this.type = 'wts';
  }

  matchFormat(): RegExpExecArray | null {
    const re = /^wts[\r\n](.*)-[ ()a-zA-Z가-힣]*(\d+)([\s\S]*)/i;
    return re.exec(this.message.content);
  }

  parse() {
    return {
      createOfferInput: this.parseCreateDealInput(),
      createUserImagesInput: this.parseCreateUserImagesInput(),
    };
  }

  parseCreateDealInput(): CreateOfferInput {
    return {
      id: this.id,
      name: this.match![1].trim(),
      price: this.parsePrice(this.match![2]),
      priceCurrency: this.priceCurrency,
      description: this.match![3].trim(),
      businessFunction: 'SELL',
      status: 'ON_SALE',
      guildId: this.guildId,
      productCategoryId: this.productCategoryId,
      sellerId: this.userId,
    };
  }
}
