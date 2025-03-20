export class ReportCommentCreatedInput {
  reportId: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  content: string;

  constructor({
    reportId,
    reportedUserUsername,
    reportedUserAvatarURL,
    content,
  }: {
    reportId: string;
    reportedUserUsername: string;
    reportedUserAvatarURL: string | undefined;
    content: string;
  }) {
    this.reportId = reportId;
    this.reportedUserUsername = reportedUserUsername;
    this.reportedUserAvatarURL = reportedUserAvatarURL;
    this.content = content;
  }
}
