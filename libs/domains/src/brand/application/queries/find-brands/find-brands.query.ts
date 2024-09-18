import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindBrandsWhereInput } from './find-brands-where.input';
import { FindBrandsOrderByInput } from './find-brands-order-by.input';
import { FindBrandsArgs } from './find-brands.args';

export class FindBrandsQuery extends PaginationQuery {
  where?: FindBrandsWhereInput;

  orderBy?: FindBrandsOrderByInput;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindBrandsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
