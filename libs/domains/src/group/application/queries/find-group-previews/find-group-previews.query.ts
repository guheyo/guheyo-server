import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindGroupPreviewsWhereInput } from './find-group-previews-where.input';
import { FindGroupPreviewsOrderByInput } from './find-group-previews-order-by.input';
import { FindGroupPreviewsArgs } from './find-group-previews.args';

export class FindGroupPreviewsQuery extends PaginationQuery {
  where?: FindGroupPreviewsWhereInput;

  orderBy?: FindGroupPreviewsOrderByInput;

  keyword?: string;

  target?: string;

  constructor({ args }: { args: FindGroupPreviewsArgs }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.target = args.target;
  }
}
