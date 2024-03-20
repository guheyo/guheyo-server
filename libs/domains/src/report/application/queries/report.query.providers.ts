import { FindReportHandler } from './find-report/find-report.handler';
import { FindReportPreviewsHandler } from './find-report-previews/find-report-previews.handler';

export const REPORT_QUERY_PROVIDERS = [FindReportHandler, FindReportPreviewsHandler];
