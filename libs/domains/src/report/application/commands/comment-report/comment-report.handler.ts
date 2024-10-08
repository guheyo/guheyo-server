import { CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { PrismaCommandHandler } from '@lib/shared/cqrs/commands/handlers/prisma-command.handler';
import { CommentReportCommand } from './comment-report.command';
import { ReportLoadPort } from '../../ports/out/report.load.port';
import { ReportSavePort } from '../../ports/out/report.save.port';
import { ReportCommentResponse } from '../../dtos/report-comment.response';

@CommandHandler(CommentReportCommand)
export class CommentReportHandler extends PrismaCommandHandler<
  CommentReportCommand,
  ReportCommentResponse
> {
  constructor(
    @Inject('ReportLoadPort') private loadPort: ReportLoadPort,
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {
    super(ReportCommentResponse);
  }

  async execute(command: CommentReportCommand): Promise<void> {
    let report = await this.loadPort.findById(command.reportId);
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_NOT_FOUND);
    if (!report.validateCommenter(command.user.id))
      throw new ForbiddenException(
        ReportErrorMessage.COMMENT_REPORT_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    report = this.publisher.mergeObjectContext(report);
    await this.savePort.createComment(command);
    report.commentReport();
    report.commit();
  }
}
