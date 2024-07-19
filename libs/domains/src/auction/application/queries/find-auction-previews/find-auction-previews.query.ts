import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuctionPreviewsWhereInput } from './find-auction-previews-where.input';
import { FindAuctionPreviewsOrderByInput } from './find-auction-previews-order-by.input';
import { FindAuctionPreviewsArgs } from './find-auction-previews.args';

export class FindAuctionPreviewsQuery extends PaginationQuery {
  where?: FindAuctionPreviewsWhereInput;

  orderBy?: FindAuctionPreviewsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindAuctionPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
