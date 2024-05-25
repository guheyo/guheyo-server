import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuctionInteractionItemsWhereArgs } from './find-auction-interaction-items-where.args';
import { FindAuctionInteractionItemsOrderByArgs } from './find-auction-interaction-items-order-by.args';
import { FindAuctionInteractionItemsArgs } from './find-auction-interaction-items.args';

export class FindAuctionInteractionItemsQuery extends PaginationQuery {
  where?: FindAuctionInteractionItemsWhereArgs;

  orderBy?: FindAuctionInteractionItemsOrderByArgs;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindAuctionInteractionItemsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
