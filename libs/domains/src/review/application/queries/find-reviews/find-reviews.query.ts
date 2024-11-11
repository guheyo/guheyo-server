import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindReviewsWhereInput } from './find-reviews-where.input';
import { FindReviewsOrderByInput } from './find-reviews-order-by.input';
import { FindReviewsArgs } from './find-reviews.args';

export class FindReviewsQuery extends PaginationQuery {
  where?: FindReviewsWhereInput;

  orderBy?: FindReviewsOrderByInput;

  keyword?: string;

  target?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindReviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
    this.userId = userId;
  }
}
