import { IQuery } from '@nestjs/cqrs';
import { FindBidCountArgs } from './find-bid-count.args';

export class FindBidCountQuery implements IQuery {
  auctionId: string;

  constructor(args: FindBidCountArgs) {
    this.auctionId = args.auctionId;
  }
}
