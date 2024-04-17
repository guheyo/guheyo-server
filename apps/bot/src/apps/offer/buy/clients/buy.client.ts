import { Injectable } from '@nestjs/common';
import { BuyParser } from '../parsers/buy.parser';
import { OfferClient } from '../../clients/offer.client';

@Injectable()
export class BuyClient extends OfferClient {
  constructor(protected readonly offerParser: BuyParser) {
    super('buy', offerParser);
  }
}
