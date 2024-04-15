import { IEvent } from '@nestjs/cqrs';
import { ReportStatusUpdatedInput } from './report-status-updated.input';

export class ReportStatusUpdatedEvent implements IEvent {
  reportId: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportStatus: string;

  constructor(input: ReportStatusUpdatedInput) {
    this.reportId = input.reportId;
    this.type = input.type;
    this.reportedPostId = input.reportedPostId;
    this.reportedCommentId = input.reportedCommentId;
    this.reportStatus = input.reportStatus;
  }
}
