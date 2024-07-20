import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindOfferPreviewsArgs } from './find-offer-previews.args';
import { FindOfferPreviewsWhereInput } from './find-offer-previews-where.input';
import { FindOfferPreviewsOrderByInput } from './find-offer-previews-order-by.input';

export class FindOfferPreviewsQuery extends PaginationQuery {
  where?: FindOfferPreviewsWhereInput;

  orderBy?: FindOfferPreviewsOrderByInput;

  keyword?: string;

  target?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindOfferPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
    this.userId = userId;
  }
}
