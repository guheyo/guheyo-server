export class ReportCommentedInput {
  id: string;

  reportId: string;

  authorId: string;

  content: string;

  source: string;

  constructor({
    id,
    reportId,
    authorId,
    content,
    source,
  }: {
    id: string;
    reportId: string;
    authorId: string;
    content: string;
    source: string;
  }) {
    this.id = id;
    this.reportId = reportId;
    this.authorId = authorId;
    this.content = content;
    this.source = source;
  }
}
