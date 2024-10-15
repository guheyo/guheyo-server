import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindAuthorsWhereInput } from './find-authors-where.input';
import { FindAuthorsOrderByInput } from './find-authors-order-by.input';
import { FindAuthorsArgs } from './find-authors.args';

export class FindAuthorsQuery extends PaginationQuery {
  where?: FindAuthorsWhereInput;

  orderBy?: FindAuthorsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindAuthorsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
