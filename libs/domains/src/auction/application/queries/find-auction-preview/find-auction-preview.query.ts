import { IQuery } from '@nestjs/cqrs';
import { FindAuctionPreviewArgs } from './find-auction-preview.args';

export class FindAuctionPreviewQuery implements IQuery {
  id?: string;

  slug?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindAuctionPreviewArgs; userId?: string }) {
    this.id = args.id;
    this.slug = args.slug;
    this.userId = userId;
  }
}
