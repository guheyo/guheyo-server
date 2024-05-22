import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindBidsWhereArgs } from './find-bids-where.args';
import { FindBidsOrderByArgs } from './find-bids-order-by.args';
import { FindBidsArgs } from './find-bids.args';

export class FindBidsQuery extends PaginationQuery {
  where?: FindBidsWhereArgs;

  orderBy?: FindBidsOrderByArgs;

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
