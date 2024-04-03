import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
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

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateReportInput; user: MyUserResponse }) {
    this.id = input.id;
    this.type = input.type;
    this.refId = input.refId;
    this.refVersionId = input.refVersionId;
    this.authorId = input.authorId;
    this.reportedUserId = input.reportedUserId;
    this.title = input.title;
    this.content = input.content;
    this.user = user;
  }
}
