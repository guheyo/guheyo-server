import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { ReportCommentEntity } from '@lib/domains/report/domain/report-comment.entity';
import { CommentReportCommand } from '../../commands/comment-report/comment-report.command';

export interface ReportSavePort extends SavePort<ReportEntity> {
  createComment(command: CommentReportCommand): Promise<ReportCommentEntity>;
  updateComment(reportComment: ReportCommentEntity): Promise<ReportCommentEntity>;
}
