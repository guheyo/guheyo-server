import { ICommand } from '@nestjs/cqrs/dist';
import { CheckOfferReportsInput } from './check-offer-reports.input';

export class CheckOfferReportsCommand implements ICommand {
  type: string;

  refId: string;

  constructor(input: CheckOfferReportsInput) {
    this.type = input.type;
    this.refId = input.refId;
  }
}
