import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindUserReviewPreviewsArgs } from './find-user-review-previews.args';
import { FindUserReviewPreviewsWhereInput } from './find-user-review-previews-where.input';
import { FindUserReviewPreviewsOrderByInput } from './find-user-review-previews-order-by.input';

export class FindUserReviewPreviewsQuery extends PaginationQuery {
  where?: FindUserReviewPreviewsWhereInput;

  orderBy?: FindUserReviewPreviewsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindUserReviewPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
