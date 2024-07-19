import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindBidsWhereInput } from './find-bids-where.input';
import { FindBidsOrderByInput } from './find-bids-order-by.input';
import { FindBidsArgs } from './find-bids.args';

export class FindBidsQuery extends PaginationQuery {
  where?: FindBidsWhereInput;

  orderBy?: FindBidsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindBidsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
