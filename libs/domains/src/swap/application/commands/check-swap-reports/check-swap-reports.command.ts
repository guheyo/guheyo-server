import { ICommand } from '@nestjs/cqrs/dist';
import { CheckSwapReportsInput } from './check-swap-reports.input';

export class CheckSwapReportsCommand implements ICommand {
  type: string;

  refId: string;

  constructor(input: CheckSwapReportsInput) {
    this.type = input.type;
    this.refId = input.refId;
  }
}
