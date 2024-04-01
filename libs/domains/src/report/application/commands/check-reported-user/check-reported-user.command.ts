import { ICommand } from '@nestjs/cqrs';
import { CheckReportedUserInput } from './check-reported-user.input';

export class CheckReportedUserCommand implements ICommand {
  reportId: string;

  constructor(input: CheckReportedUserInput) {
    this.reportId = input.reportId;
  }
}
