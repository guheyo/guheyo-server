import { FindLastReportHandler } from './find-last-report/find-last-report.handler';
import { FindReportCommentHandler } from './find-report-comment/find-report-comment.handler';
import { FindReportPreviewsHandler } from './find-report-previews/find-report-previews.handler';
import { FindReportHandler } from './find-report/find-report.handler';

export const REPORT_QUERY_PROVIDERS = [
  FindReportHandler,
  FindReportPreviewsHandler,
  FindLastReportHandler,
  FindReportCommentHandler,
];
