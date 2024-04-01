import { IEvent } from '@nestjs/cqrs';
import { ReportStatusUpdatedInput } from './report-status-updated.input';

export class ReportStatusUpdatedEvent implements IEvent {
  reportId: string;

  type: string;

  refId: string;

  reportStatus: string;

  constructor(input: ReportStatusUpdatedInput) {
    this.reportId = input.reportId;
    this.type = input.type;
    this.refId = input.refId;
    this.reportStatus = input.reportStatus;
  }
}
