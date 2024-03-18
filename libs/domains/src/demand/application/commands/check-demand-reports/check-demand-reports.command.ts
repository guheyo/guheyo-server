import { ICommand } from '@nestjs/cqrs/dist';
import { CheckDemandReportsInput } from './check-demand-reports.input';

export class CheckDemandReportsCommand implements ICommand {
  type: string;

  refId: string;

  constructor(input: CheckDemandReportsInput) {
    this.type = input.type;
    this.refId = input.refId;
  }
}
