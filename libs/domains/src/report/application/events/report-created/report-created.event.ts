import { IEvent } from '@nestjs/cqrs';
import { ReportCreatedInput } from './report-created.input';

export class ReportCreatedEvent implements IEvent {
  reportId: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  reason: string;

  reportStatus: string;

  constructor(input: ReportCreatedInput) {
    this.reportId = input.reportId;
    this.type = input.type;
    this.reportedPostId = input.reportedPostId;
    this.reportedCommentId = input.reportedCommentId;
    this.reportedUserUsername = input.reportedUserUsername;
    this.reportedUserAvatarURL = input.reportedUserAvatarURL;
    this.reason = input.reason;
    this.reportStatus = input.reportStatus;
  }
}
