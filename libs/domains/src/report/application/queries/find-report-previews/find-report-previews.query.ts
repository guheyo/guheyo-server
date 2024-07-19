import { PaginationQuery } from '@lib/shared/cqrs/queries/pagination/pagination.query';
import { FindReportPreviewsArgs } from './find-report-previews.args';
import { FindReportPreviewsWhereInput } from './find-report-previews-where.input';
import { FindReportPreviewsOrderByInput } from './find-report-previews-order-by.input';

export class FindReportPreviewsQuery extends PaginationQuery {
  where?: FindReportPreviewsWhereInput;

  orderBy?: FindReportPreviewsOrderByInput;

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
