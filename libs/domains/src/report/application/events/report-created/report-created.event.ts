import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  reportId: string;

  type: string;

  refId: string;

  reportStatus: string;

  constructor(input: ReportCreatedInput) {
    this.reportId = input.reportId;
    this.type = input.type;
    this.refId = input.refId;
    this.reportStatus = input.reportStatus;
  }
}
