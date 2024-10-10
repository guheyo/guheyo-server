import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindBiddersWhereInput } from './find-bidders-where.input';
import { FindBiddersOrderByInput } from './find-bidders-order-by.input';
import { FindBiddersArgs } from './find-bidders.args';

export class FindBiddersQuery extends PaginationQuery {
  where: FindBiddersWhereInput;

  orderBy?: FindBiddersOrderByInput;

  keyword?: string;

  user?: MyUserResponse;

  constructor({ args, user }: { args: FindBiddersArgs; user: MyUserResponse }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.user = user;
  }
}
