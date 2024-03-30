import { ICommand } from '@nestjs/cqrs';
import { CheckReceivedReportsInput } from './check-received-reports.input';

export class CheckReceivedReportsCommand implements ICommand {
  userId: string;

  constructor(input: CheckReceivedReportsInput) {
    this.userId = input.userId;
  }
}
