import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { CommentReportCommand } from './comment-report.command';
import { ReportLoadPort } from '../../ports/out/report.load.port';
import { ReportSavePort } from '../../ports/out/report.save.port';

@CommandHandler(CommentReportCommand)
export class CommentReportHandler implements ICommandHandler<CommentReportCommand> {
  constructor(
    @Inject('ReportLoadPort') private loadPort: ReportLoadPort,
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CommentReportCommand): Promise<void> {
    let report = await this.loadPort.findById(command.input.reportId);
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_NOT_FOUND);
    if (!report.validateCommenter(command.user.id))
      throw new ForbiddenException(
        ReportErrorMessage.COMMENT_REPORT_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    report = this.publisher.mergeObjectContext(report);
    const input = report.parseCreateReportCommentInput({
      input: command.input,
      userId: command.user.id,
    });
    await this.savePort.createComment(input);
    report.commentReport();
    report.commit();
  }
}
