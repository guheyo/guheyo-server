import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersWhereArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-where.args';
import { FindOffersOrderByArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-order-by.args';
import { FindDemandPreviewsArgs } from './find-demand-previews.args';

export class FindDemandPreviewsQuery extends PaginationQuery {
  where?: FindOffersWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  distinct?: boolean;

  constructor(findDemandPreviewsArgs: FindDemandPreviewsArgs) {
    super(findDemandPreviewsArgs);
    this.where = findDemandPreviewsArgs.where;
    this.orderBy = findDemandPreviewsArgs.orderBy;
    this.keyword = findDemandPreviewsArgs.keyword;
    this.distinct = findDemandPreviewsArgs.distinct;
  }
}
