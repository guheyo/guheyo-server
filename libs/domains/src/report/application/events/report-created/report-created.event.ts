import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  type: string;

  refId: string;

  reportStatus: string;

  reportedUserId?: string;

  constructor(input: ReportCreatedInput) {
    this.type = input.type;
    this.refId = input.refId;
    this.reportStatus = input.reportStatus;
    this.reportedUserId = input.reportedUserId;
  }
}
