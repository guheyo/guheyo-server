export class ReportCommentUpdatedInput {
  reportId: string;

  reportedUserId: string;

  oldContent: string;

  newContent: string;

  constructor({
    reportId,
    reportedUserId,
    oldContent,
    newContent,
  }: {
    reportId: string;
    reportedUserId: string;
    oldContent: string;
    newContent: string;
  }) {
    this.reportId = reportId;
    this.reportedUserId = reportedUserId;
    this.oldContent = oldContent;
    this.newContent = newContent;
  }
}
