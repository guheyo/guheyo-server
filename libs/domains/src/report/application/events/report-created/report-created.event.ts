import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  id: string;

  type: string;

  refId: string;

  constructor(input: ReportCreatedInput) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
  }
}
