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
    const lastestSubmittedReport = await this.loadPort.findLatestSubmittedReport(command.authorId);
    if (lastestSubmittedReport && !lastestSubmittedReport.validateSubmitTerm())
      throw new ForbiddenException(ReportErrorMessage.REPORT_COOLDOWN_NOT_PASSED);

    const report = this.publisher.mergeObjectContext(
      new ReportEntity({
        ...pick(command, [
          'id',
          'type',
          'refId',
          'refVersionId',
          'authorId',
          'reportedUserId',
          'title',
          'content',
        ]),
      }),
    );

    report.create();
    await this.savePort.create(report);
    report.commit();
  }
}
