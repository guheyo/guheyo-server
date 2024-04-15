import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  reportId: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportStatus: string;

  constructor(input: ReportCreatedInput) {
    this.reportId = input.reportId;
    this.type = input.type;
    this.reportedPostId = input.reportedPostId;
    this.reportedCommentId = input.reportedCommentId;
    this.reportStatus = input.reportStatus;
  }
}
