import { IEvent } from '@nestjs/cqrs';
import { ReportCommentCreatedInput } from './report-comment-created.input';

export class ReportCommentCreatedEvent implements IEvent {
  reportId: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  content: string;

  constructor(input: ReportCommentCreatedInput) {
    this.reportId = input.reportId;
    this.reportedUserUsername = input.reportedUserUsername;
    this.reportedUserAvatarURL = input.reportedUserAvatarURL;
    this.content = input.content;
  }
}
