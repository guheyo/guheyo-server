export class ReportCommentUpdatedInput {
  reportId: string;

  oldContent: string;

  newContent: string;

  constructor({
    reportId,
    oldContent,
    newContent,
  }: {
    reportId: string;
    oldContent: string;
    newContent: string;
  }) {
    this.reportId = reportId;
    this.oldContent = oldContent;
    this.newContent = newContent;
  }
}
