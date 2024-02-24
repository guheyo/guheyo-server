import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersWhereArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-where.args';
import { FindOffersOrderByArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-order-by.args';
import { FindSwapPreviewsArgs } from './find-swap-previews.args';

export class FindSwapPreviewsQuery extends PaginationQuery {
  where?: FindOffersWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  constructor(findSwapPreviewsArgs: FindSwapPreviewsArgs) {
    super(findSwapPreviewsArgs);
    this.where = findSwapPreviewsArgs.where;
    this.orderBy = findSwapPreviewsArgs.orderBy;
    this.keyword = findSwapPreviewsArgs.keyword;
  }
}
