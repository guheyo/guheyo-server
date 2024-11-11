import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindCategoriesArgs } from './find-categories.args';
import { FindCategoriesWhereInput } from './find-categories-where.input';
import { FindCategoriesOrderByInput } from './find-categories-order-by.input';

export class FindCategoriesQuery extends PaginationQuery {
  where?: FindCategoriesWhereInput;

  orderBy?: FindCategoriesOrderByInput;

  keyword?: string;

  target?: string;

  constructor({ args }: { args: FindCategoriesArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
  }
}
