import { IEvent } from '@nestjs/cqrs';
import { ReportCommentUpdatedInput } from './report-comment-updated.input';

export class ReportCommentUpdatedEvent implements IEvent {
  reportId: string;

  constructor(input: ReportCommentUpdatedInput) {
    this.reportId = input.reportId;
  }
}
