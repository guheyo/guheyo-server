import { IEvent } from '@nestjs/cqrs';
import { ReportCommentCreatedInput } from './report-comment-created.input';

export class ReportCommentCreatedEvent implements IEvent {
  reportId: string;

  constructor(input: ReportCommentCreatedInput) {
    this.reportId = input.reportId;
  }
}
