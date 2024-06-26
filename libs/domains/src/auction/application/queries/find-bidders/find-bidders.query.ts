import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindBiddersWhereInput } from './find-bidders-where.input';
import { FindBiddersOrderByInput } from './find-bidders-order-by.input';
import { FindBiddersArgs } from './find-bidders.args';

export class FindBiddersQuery extends PaginationQuery {
  where: FindBiddersWhereInput;

  orderBy?: FindBiddersOrderByInput;

  keyword?: string;

  constructor({ args }: { args: FindBiddersArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
  }
}
