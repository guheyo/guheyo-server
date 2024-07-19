import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindUsersWhereInput } from './find-users-where.input';
import { FindUsersOrderByInput } from './find-users-order-by.input';
import { FindUsersArgs } from './find-users.args';

export class FindUsersQuery extends PaginationQuery {
  where?: FindUsersWhereInput;

  orderBy?: FindUsersOrderByInput;

  keyword?: string;

  constructor({ args }: { args: FindUsersArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
  }
}
