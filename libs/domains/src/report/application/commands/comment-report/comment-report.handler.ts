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
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_IS_NOT_FOUND);

    report = this.publisher.mergeObjectContext(report);
    if (!report.isAuthorized(command.input.authorId))
      throw new ForbiddenException(
        ReportErrorMessage.COMMENT_REPORT_REQUEST_FROM_UNAUTHORIZED_USER,
      );

    report.commentReport(command.input);
    report.commit();
  }
}