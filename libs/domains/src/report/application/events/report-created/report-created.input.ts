export class ReportCreatedInput {
  reportId: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportedUserUsername: string;

  reportedUserAvatarURL?: string;

  reason: string;

  reportStatus: string;

  constructor({
    reportId,
    type,
    reportedPostId,
    reportedCommentId,
    reportedUserUsername,
    reportedUserAvatarURL,
    reason,
    reportStatus,
  }: {
    reportId: string;
    type: string;
    reportedPostId?: string;
    reportedCommentId?: string;
    reportedUserUsername: string;
    reportedUserAvatarURL: string;
    reason: string;
    reportStatus: string;
  }) {
    this.reportId = reportId;
    this.type = type;
    this.reportedPostId = reportedPostId;
    this.reportedCommentId = reportedCommentId;
    this.reportedUserUsername = reportedUserUsername;
    this.reportedUserAvatarURL = reportedUserAvatarURL;
    this.reason = reason;
    this.reportStatus = reportStatus;
  }
}
