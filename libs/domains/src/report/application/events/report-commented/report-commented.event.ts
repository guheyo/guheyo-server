import { IEvent } from '@nestjs/cqrs';
import { ReportCommentedInput } from './report-commented.input';

export class ReportCommentedEvent implements IEvent {
  reportId: string;

  constructor(input: ReportCommentedInput) {
    this.reportId = input.reportId;
  }
}
