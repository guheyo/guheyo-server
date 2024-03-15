import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { ReportErrorMessage } from '@lib/domains/report/domain/report.error.message';
import { ReportLoadPort } from '../../ports/out/report.load.port';
import { ReportSavePort } from '../../ports/out/report.save.port';
import { CheckReportCommentsCommand } from './check-report-comments.command';

@EventsHandler(CheckReportCommentsCommand)
export class CheckReportCommentsHandler implements IEventHandler<CheckReportCommentsCommand> {
  constructor(
    @Inject('ReportLoadPort') private loadPort: ReportLoadPort,
    @Inject('ReportSavePort') private savePort: ReportSavePort,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(command: CheckReportCommentsCommand) {
    if (command.type !== 'report') return;

    let report = await this.loadPort.findById(command.refId);
    if (!report) throw new NotFoundException(ReportErrorMessage.REPORT_IS_NOT_FOUND);

    report = this.publisher.mergeObjectContext(report);
    report.checkComments();
    await this.savePort.save(report);
    report.commit();
  }
}
