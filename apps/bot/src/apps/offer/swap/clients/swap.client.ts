import { Injectable } from '@nestjs/common';
import { SwapParser } from '../parsers/swap.parser';
import { OfferClient } from '../../clients/offer.client';

@Injectable()
export class SwapClient extends OfferClient {
  constructor(protected readonly offerParser: SwapParser) {
    super('swap', offerParser);
  }
}
