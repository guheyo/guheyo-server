import { ICommand } from '@nestjs/cqrs/dist';
import { CancelBidInput } from './cancel-bid.input';

export class CancelBidCommand implements ICommand {
  auctionId: string;

  bidderId: string;

  constructor(input: CancelBidInput) {
    this.auctionId = input.auctionId;
    this.bidderId = input.bidderId;
  }
}
