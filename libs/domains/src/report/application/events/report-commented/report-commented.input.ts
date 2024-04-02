export class ReportCommentedInput {
  reportId: string;

  constructor({ reportId }: { reportId: string }) {
    this.reportId = reportId;
  }
}
