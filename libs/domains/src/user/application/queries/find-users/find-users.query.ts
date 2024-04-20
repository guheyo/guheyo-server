import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindUsersWhereArgs } from './find-users-where.args';
import { FindUsersOrderByArgs } from './find-users-order-by.args';
import { FindUsersArgs } from './find-users.args';

export class FindUsersQuery extends PaginationQuery {
  where?: FindUsersWhereArgs;

  orderBy?: FindUsersOrderByArgs;

  keyword?: string;

  constructor({ args }: { args: FindUsersArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
  }
}
