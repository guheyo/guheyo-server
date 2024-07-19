import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindCommentsArgs } from './find-comments.args';
import { FindCommentsOrderByInput } from './find-comments-order-by.input';
import { FindCommentsWhereInput } from './find-comments-where.input';

export class FindCommentsQuery extends PaginationQuery {
  where?: FindCommentsWhereInput;

  orderBy?: FindCommentsOrderByInput;

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
