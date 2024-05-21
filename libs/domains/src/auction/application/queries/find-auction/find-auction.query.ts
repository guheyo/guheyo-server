import { IQuery } from '@nestjs/cqrs';
import { FindAuctionArgs } from './find-auction.args';

export class FindAuctionQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindAuctionArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
