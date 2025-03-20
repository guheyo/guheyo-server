export class ReportCommentCreatedInput {
  reportId: string;

  constructor({ reportId }: { reportId: string }) {
    this.reportId = reportId;
  }
}
