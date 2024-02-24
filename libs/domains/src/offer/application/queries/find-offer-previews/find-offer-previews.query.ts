import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOfferPreviewsArgs } from './find-offer-previews.args';
import { FindOffersWhereArgs } from './find-offers-where.args';
import { FindOffersOrderByArgs } from './find-offers-order-by.args';

export class FindOfferPreviewsQuery extends PaginationQuery {
  where?: FindOffersWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  constructor(findOfferPreviewsArgs: FindOfferPreviewsArgs) {
    super(findOfferPreviewsArgs);
    this.where = findOfferPreviewsArgs.where;
    this.orderBy = findOfferPreviewsArgs.orderBy;
    this.keyword = findOfferPreviewsArgs.keyword;
  }
}
