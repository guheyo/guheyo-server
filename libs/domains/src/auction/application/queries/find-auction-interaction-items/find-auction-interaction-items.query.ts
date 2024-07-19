import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuctionInteractionItemsWhereInput } from './find-auction-interaction-items-where.input';
import { FindAuctionInteractionItemsOrderByInput } from './find-auction-interaction-items-order-by.input';
import { FindAuctionInteractionItemsArgs } from './find-auction-interaction-items.args';

export class FindAuctionInteractionItemsQuery extends PaginationQuery {
  where?: FindAuctionInteractionItemsWhereInput;

  orderBy?: FindAuctionInteractionItemsOrderByInput;

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
