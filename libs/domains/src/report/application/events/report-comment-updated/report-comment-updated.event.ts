import { IEvent } from '@nestjs/cqrs';
import { ReportCommentUpdatedInput } from './report-comment-updated.input';

export class ReportCommentUpdatedEvent implements IEvent {
  reportId: string;

  oldContent: string;

  newContent: string;

  constructor(input: ReportCommentUpdatedInput) {
    this.reportId = input.reportId;
    this.oldContent = input.oldContent;
    this.newContent = input.newContent;
  }
}
