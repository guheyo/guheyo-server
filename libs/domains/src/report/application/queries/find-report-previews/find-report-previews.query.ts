import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindReportPreviewsArgs } from './find-report-previews.args';
import { FindReportPreviewsWhereArgs } from './find-report-previews-where.args';
import { FindReportPreviewsOrderByArgs } from './find-report-previews.order-by.args';

export class FindReportPreviewsQuery extends PaginationQuery {
  where?: FindReportPreviewsWhereArgs;

  orderBy?: FindReportPreviewsOrderByArgs;

  keyword?: string;

  userId?: string;

  constructor({ args, userId }: { args: FindReportPreviewsArgs; userId?: string }) {
    super(args);
    this.where = args.where;
    this.orderBy = args.orderBy;
    this.keyword = args.keyword;
    this.userId = userId;
  }
}
