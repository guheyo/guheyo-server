import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOffersOrderByArgs } from '@lib/domains/offer/application/queries/find-offer-previews/find-offers-order-by.args';
import { FindDemandPreviewsArgs } from './find-demand-previews.args';
import { FindDemandsWhereArgs } from './find-demands-where.args';

export class FindDemandPreviewsQuery extends PaginationQuery {
  where?: FindDemandsWhereArgs;

  orderBy?: FindOffersOrderByArgs;

  keyword?: string;

  distinct?: boolean;

  userId?: string;

  constructor({ args, userId }: { args: FindDemandPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.distinct = args.distinct;
    this.userId = userId;
  }
}
