import { CheckReportCommentsHandler } from './check-report-comments/check-report-comments.handler';
import { CheckReportedUserHandler } from './check-reported-user/check-reported-user.handler';
import { CommentReportHandler } from './comment-report/comment-report.handler';
import { CreateReportHandler } from './create-report/create-report.handler';

export const REPORT_COMMAND_PROVIDERS = [
  CreateReportHandler,
  CheckReportCommentsHandler,
  CommentReportHandler,
  CheckReportedUserHandler,
];
