import { ICommand } from '@nestjs/cqrs/dist';
import { CreateReportInput } from './create-report.input';

export class CreateReportCommand implements ICommand {
  id: string;

  type: string;

  refId: string;

  refVersionId: string;

  authorId: string;

  reportedUserId?: string;

  title: string;

  content?: string;

  constructor(input: CreateReportInput) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.refVersionId = input.refVersionId;
    this.authorId = input.authorId;
    this.reportedUserId = input.reportedUserId;
    this.title = input.title;
    this.content = input.content;
  }
}
