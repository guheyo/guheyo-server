import { IEvent } from '@nestjs/cqrs';
import { ReportCommentUpdatedInput } from './report-comment-updated.input';

export class ReportCommentUpdatedEvent implements IEvent {
  reportId: string;

  reportedUserId: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  oldContent: string;

  newContent: string;

  constructor(input: ReportCommentUpdatedInput) {
    this.reportId = input.reportId;
    this.reportedUserId = input.reportedUserId;
    this.reportedUserUsername = input.reportedUserUsername;
    this.reportedUserAvatarURL = input.reportedUserAvatarURL;
    this.oldContent = input.oldContent;
    this.newContent = input.newContent;
  }
}
