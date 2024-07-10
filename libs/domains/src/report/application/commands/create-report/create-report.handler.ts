import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ForbiddenException, Inject } from '@nestjs/common';
import { pick } from 'lodash';
import { ReportEntity } from '@lib/domains/report/domain/report.entity';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { CreateReportCommand } from './create-report.command';
import { ReportSavePort } from '../../ports/out/report.save.port';
import { ReportLoadPort } from '../../ports/out/report.load.port';

@CommandHandler(CreateReportCommand)
export class CreateReportHandler implements ICommandHandler<CreateReportCommand> {
  constructor(
    @Inject('ReportLoadPort') private loadPort: ReportLoadPort,
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateReportCommand): Promise<void> {
    const lastSubmittedReport = await this.loadPort.findLastSubmittedReport(command.user.id);
    if (lastSubmittedReport && !lastSubmittedReport.validateSubmitTerm())
      throw new ForbiddenException(ReportErrorMessage.REPORT_COOLDOWN_NOT_PASSED);

    await this.savePort.create(
      new ReportEntity({
        ...pick(command, [
          'id',
          'type',
          'reportedPostId',
          'reportedCommentId',
          'reportedUserId',
          'groupId',
          'reason',
          'description',
          'userAgent',
          'ipAddress',
        ]),
        userId: command.user.id,
      }),
    );
    let report = await this.loadPort.findById(command.id);
    if (!report) throw new ForbiddenException(ReportErrorMessage.FAILED_CREATE_REPORT);

    report = this.publisher.mergeObjectContext(report);
    report.create();
    report.commit();
  }
}
