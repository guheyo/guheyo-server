import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOfferPreviewsArgs } from './find-offer-previews.args';
import { FindOffersWhereInput } from './find-offers-where.input';
import { FindOffersOrderByInput } from './find-offers-order-by.input';

export class FindOfferPreviewsQuery extends PaginationQuery {
  where?: FindOffersWhereInput;

  orderBy?: FindOffersOrderByInput;

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
