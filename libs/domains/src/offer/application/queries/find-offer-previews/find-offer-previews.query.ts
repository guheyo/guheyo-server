import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOfferPreviewsArgs } from './find-offer-previews.args';
import { FindOffersWhereArgs } from './find-offers-where.args';
import { FindOffersOrderByArgs } from './find-offers-order-by.args';

export class FindOfferPreviewsQuery extends PaginationQuery {
  where?: FindOffersWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindOfferPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
