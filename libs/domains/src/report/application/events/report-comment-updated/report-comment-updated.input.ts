export class ReportCommentUpdatedInput {
  reportId: string;

  reportedUserId: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  oldContent: string;

  newContent: string;

  constructor({
    reportId,
    reportedUserId,
    reportedUserUsername,
    reportedUserAvatarURL,
    oldContent,
    newContent,
  }: {
    reportId: string;
    reportedUserId: string;
    reportedUserUsername: string;
    reportedUserAvatarURL: string | undefined;
    oldContent: string;
    newContent: string;
  }) {
    this.reportId = reportId;
    this.reportedUserId = reportedUserId;
    this.reportedUserUsername = reportedUserUsername;
    this.reportedUserAvatarURL = reportedUserAvatarURL;
    this.oldContent = oldContent;
    this.newContent = newContent;
  }
}
