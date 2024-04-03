import { ICommand } from '@nestjs/cqrs/dist';
import { AddBidInput } from './add-bid.input';

export class AddBidCommand implements ICommand {
  id: string;

  price: number;

  priceCurrency: string;

  auctionId: string;

  bidderId: string;

  source: string;

  constructor(input: AddBidInput) {
    this.id = input.id;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.auctionId = input.auctionId;
    this.bidderId = input.bidderId;
    this.source = input.source;
  }
}
