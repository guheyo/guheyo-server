import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { UpdateReportCommentCommand } from './update-report-comment.command';
import { ReportLoadPort } from '../../ports/out/report.load.port';
import { ReportSavePort } from '../../ports/out/report.save.port';

@CommandHandler(UpdateReportCommentCommand)
export class UpdateReportCommentHandler implements ICommandHandler<UpdateReportCommentCommand> {
  constructor(
    @Inject('ReportLoadPort') private loadPort: ReportLoadPort,
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateReportCommentCommand): Promise<void> {
    const report = await this.loadPort.findById(command.reportId);
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_NOT_FOUND);
    if (!report.validateCommenter(command.user.id))
      throw new ForbiddenException(
        ReportErrorMessage.COMMENT_REPORT_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    const comment = report.findComment(command.id);
    if (!comment) throw new NotFoundException(ReportErrorMessage.REPORT_COMMENT_NOT_FOUND);

    comment.update({ id: command.id, content: command.content });
    await this.savePort.updateComment(comment);
    report.commentReport();
    report.commit();
  }
}
