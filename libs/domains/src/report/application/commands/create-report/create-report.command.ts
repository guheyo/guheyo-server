import { ICommand } from '@nestjs/cqrs/dist';
import { CreateReportInput } from './create-report.input';

export class CreateReportCommand implements ICommand {
  id: string;

  type: string;

  offerId?: string;

  demandId?: string;

  swapId?: string;

  authorId: string;

  title: string;

  content?: string;

  status: string;

  constructor(input: CreateReportInput) {
    this.id = input.id;
    this.type = input.type;
    this.offerId = input.offerId;
    this.demandId = input.demandId;
    this.swapId = input.swapId;
    this.authorId = input.authorId;
    this.title = input.title;
    this.content = input.content;
    this.status = input.status;
  }
}
