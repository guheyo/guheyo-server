import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { ReportCommentEntity } from '@lib/domains/report/domain/report-comment.entity';
import { CreateReportCommentInput } from '../../commands/create-report-comment/create-report-comment.input';

export interface ReportSavePort extends SavePort<ReportEntity> {
  createComment(input: CreateReportCommentInput): Promise<ReportCommentEntity>;
  updateComment(reportComment: ReportCommentEntity): Promise<ReportCommentEntity>;
}
