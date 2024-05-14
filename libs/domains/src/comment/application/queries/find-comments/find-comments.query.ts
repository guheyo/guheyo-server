import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindCommentsArgs } from './find-comments.args';
import { FindCommentsWhereArgs } from './find-comments-where.args';
import { FindCommentsOrderByArgs } from './find-comments-order-by.args';

export class FindCommentsQuery extends PaginationQuery {
  where?: FindCommentsWhereArgs;

  orderBy?: FindCommentsOrderByArgs;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindCommentsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
