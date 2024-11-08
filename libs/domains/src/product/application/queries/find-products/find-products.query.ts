import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindProductsWhereInput } from './find-products-where.input';
import { FindProductsOrderByInput } from './find-products-order-by.input';
import { FindProductsArgs } from './find-products.args';

export class FindProductsQuery extends PaginationQuery {
  where?: FindProductsWhereInput;

  orderBy?: FindProductsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindProductsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
