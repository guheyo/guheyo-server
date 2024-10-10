import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindGroupProfilesArgs } from './find-group-profiles.args';
import { FindGroupProfilesWhereInput } from './find-group-profiles-where.input';
import { FindGroupProfilesOrderByInput } from './find-group-profiles-order-by.input';

export class FindGroupProfilesQuery extends PaginationQuery {
  where?: FindGroupProfilesWhereInput;

  orderBy?: FindGroupProfilesOrderByInput;

  keyword?: string;

  target?: string;

  constructor({ args }: { args: FindGroupProfilesArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
  }
}
