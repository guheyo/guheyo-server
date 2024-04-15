export class ReportCreatedInput {
  reportId: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportStatus: string;

  constructor({
    reportId,
    type,
    reportedPostId,
    reportedCommentId,
    reportStatus,
  }: {
    reportId: string;
    type: string;
    reportedPostId?: string;
    reportedCommentId?: string;
    reportStatus: string;
  }) {
    this.reportId = reportId;
    this.type = type;
    this.reportedPostId = reportedPostId;
    this.reportedCommentId = reportedCommentId;
    this.reportStatus = reportStatus;
  }
}
