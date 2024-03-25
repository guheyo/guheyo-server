import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersOrderByArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-order-by.args';
import { FindSwapPreviewsArgs } from './find-swap-previews.args';
import { FindSwapsWhereArgs } from './find-swaps-where.args';

export class FindSwapPreviewsQuery extends PaginationQuery {
  where?: FindSwapsWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  distinct?: boolean;

  userId?: string;

  constructor({ args, userId }: { args: FindSwapPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.distinct = args.distinct;
    this.userId = userId;
  }
}
