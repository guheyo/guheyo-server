import { ICommand } from '@nestjs/cqrs/dist';
import { CheckReportCommentsInput } from './check-report-comments.input';

export class CheckReportCommentsCommand implements ICommand {
  reportId: string;

  constructor(input: CheckReportCommentsInput) {
    this.reportId = input.reportId;
  }
}
