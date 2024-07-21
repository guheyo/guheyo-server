import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindThreadPreviewsWhereInput } from './find-thread-previews-where.input';
import { FindThreadPreviewsOrderByInput } from './find-thread-previews-order-by.input';
import { FindThreadPreviewsArgs } from './find-thread-previews.args';

export class FindThreadPreviewsQuery extends PaginationQuery {
  where?: FindThreadPreviewsWhereInput;

  orderBy?: FindThreadPreviewsOrderByInput;

  keyword?: string;

  target?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindThreadPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
    this.userId = userId;
  }
}
