import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuctionWhereArgs } from './find-auction-where.args';
import { FindAuctionOrderByArgs } from './find-auction-order-by.args';
import { FindAuctionPreviewsArgs } from './find-auction-previews.args';

export class FindAuctionPreviewsQuery extends PaginationQuery {
  where?: FindAuctionWhereArgs;

  orderBy?: FindAuctionOrderByArgs;

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
