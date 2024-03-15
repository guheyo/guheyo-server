import { ICommand } from '@nestjs/cqrs/dist';
import { CreateReportInput } from './create-report.input';

export class CreateReportCommand implements ICommand {
  id: string;

  type: string;

  refId: string;

  authorId: string;

  title: string;

  content?: string;

  constructor(input: CreateReportInput) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.authorId = input.authorId;
    this.title = input.title;
    this.content = input.content;
  }
}
