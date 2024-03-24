import { ICommand } from '@nestjs/cqrs/dist';
import { CheckReportCommentsInput } from './check-report-comments.input';

export class CheckReportCommentsCommand implements ICommand {
  type: string;

  refId: string;

  constructor(input: CheckReportCommentsInput) {
    this.type = input.type;
    this.refId = input.refId;
  }
}
