import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  type: string;

  refId: string;

  reportedUserId?: string;

  reportStatus: string;

  constructor(input: ReportCreatedInput) {
    this.type = input.type;
    this.refId = input.refId;
    this.reportedUserId = input.reportedUserId;
    this.reportStatus = input.reportStatus;
  }
}
