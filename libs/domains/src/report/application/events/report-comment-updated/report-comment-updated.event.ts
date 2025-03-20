import { IEvent } from '@nestjs/cqrs';
import { ReportCommentUpdatedInput } from './report-comment-updated.input';

export class ReportCommentUpdatedEvent implements IEvent {
  reportId: string;

  reportedUserId: string;

  oldContent: string;

  newContent: string;

  constructor(input: ReportCommentUpdatedInput) {
    this.reportId = input.reportId;
    this.reportedUserId = input.reportedUserId;
    this.oldContent = input.oldContent;
    this.newContent = input.newContent;
  }
}
