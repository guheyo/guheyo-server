import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindUserReviewPreviewsArgs } from './find-user-review-previews.args';
import { FindUserReviewPreviewsWhereArgs } from './find-user-review-previews-where.args';
import { FindUserReviewPreviewsOrderByArgs } from './find-user-review-previews-order-by.args';

export class FindUserReviewPreviewsQuery extends PaginationQuery {
  where?: FindUserReviewPreviewsWhereArgs;

  orderBy?: FindUserReviewPreviewsOrderByArgs;

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
