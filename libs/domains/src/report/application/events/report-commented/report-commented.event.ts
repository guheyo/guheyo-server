import { IEvent } from '@nestjs/cqrs';
import { ReportCommentedInput } from './report-commented.input';

export class ReportCommentedEvent implements IEvent {
  id: string;

  reportId: string;

  authorId: string;

  content: string;

  source: string;

  constructor(input: ReportCommentedInput) {
    this.id = input.id;
    this.reportId = input.reportId;
    this.authorId = input.authorId;
    this.content = input.content;
    this.source = input.source;
  }
}
