export class ReportCommentCreatedInput {
  reportId: string;

  content: string;

  constructor({ reportId, content }: { reportId: string; content: string }) {
    this.reportId = reportId;
    this.content = content;
  }
}
