import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindReportPreviewsArgs } from './find-report-previews.args';
import { FindReportPreviewsWhereArgs } from './find-report-previews-where.args';
import { FindReportPreviewsOrderByArgs } from './find-report-previews.order-by.args';

export class FindReportPreviewsQuery extends PaginationQuery {
  where?: FindReportPreviewsWhereArgs;

  orderBy?: FindReportPreviewsOrderByArgs;

  keyword?: string;

  distinct?: boolean;

  constructor(findReportsArgs: FindReportPreviewsArgs) {
    super(findReportsArgs);
    this.where = findReportsArgs.where;
    this.orderBy = findReportsArgs.orderBy;
    this.keyword = findReportsArgs.keyword;
    this.distinct = findReportsArgs.distinct;
  }
}
