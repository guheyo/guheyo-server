import { IEvent } from '@nestjs/cqrs';
import { ReportStatusUpdatedInput } from './report-status-updated.input';

export class ReportStatusUpdatedEvent implements IEvent {
  type: string;

  refId: string;

  status: string;

  constructor(input: ReportStatusUpdatedInput) {
    this.type = input.type;
    this.refId = input.refId;
    this.status = input.status;
  }
}
