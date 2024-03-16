import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindReportsArgs } from './find-reports.args';
import { FindReportsWhereArgs } from './find-reports-where.args';
import { FindReportsOrderByArgs } from './find-reports.order-by.args';

export class FindReportsQuery extends PaginationQuery {
  where?: FindReportsWhereArgs;

  orderBy?: FindReportsOrderByArgs;

  keyword?: string;

  distinct?: boolean;

  constructor(findReportsArgs: FindReportsArgs) {
    super(findReportsArgs);
    this.where = findReportsArgs.where;
    this.orderBy = findReportsArgs.orderBy;
    this.keyword = findReportsArgs.keyword;
    this.distinct = findReportsArgs.distinct;
  }
}
