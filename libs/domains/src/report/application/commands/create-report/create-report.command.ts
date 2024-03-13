import { ICommand } from '@nestjs/cqrs/dist';
import { CreateReportInput } from './create-report.input';

export class CreateReportCommand implements ICommand {
  id: string;

  type: string;

  offerId?: string;

  demandId?: string;

  swapId?: string;

  reporterId: string;

  title: string;

  content?: string;

  constructor(input: CreateReportInput) {
    this.id = input.id;
    this.type = input.type;
    this.offerId = input.offerId;
    this.demandId = input.demandId;
    this.swapId = input.swapId;
    this.reporterId = input.reporterId;
    this.title = input.title;
    this.content = input.content;
  }
}
