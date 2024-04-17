import { Injectable } from '@nestjs/common';
import { SellParser } from '../parsers/sell.parser';
import { OfferClient } from '../../clients/offer.client';

@Injectable()
export class SellClient extends OfferClient {
  constructor(protected readonly offerParser: SellParser) {
    super('sell', offerParser);
  }
}
