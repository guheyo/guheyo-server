import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { CheckReportedUserCommand } from './check-reported-user.command';
import { ReportLoadPort } from '../../ports/out/report.load.port';
import { ReportSavePort } from '../../ports/out/report.save.port';

@CommandHandler(CheckReportedUserCommand)
export class CheckReportedUserHandler implements ICommandHandler<CheckReportedUserCommand> {
  constructor(
    @Inject('ReportLoadPort')
    private readonly loadPort: ReportLoadPort,
    @Inject('ReportSavePort')
    private readonly savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CheckReportedUserCommand): Promise<void> {
    let report = await this.loadPort.findById(command.reportId);
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_NOT_FOUND);

    report = this.publisher.mergeObjectContext(report);
    report.checkReportedUser();
    report.commit();
  }
}
