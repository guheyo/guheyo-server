export class ReportCommentUpdatedInput {
  reportId: string;

  constructor({ reportId }: { reportId: string }) {
    this.reportId = reportId;
  }
}
