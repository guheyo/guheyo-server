import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateReportCommentInput } from './update-report-comment.input';

export class UpdateReportCommentCommand implements ICommand {
  id: string;

  reportId: string;

  content: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateReportCommentInput; user: MyUserResponse }) {
    this.id = input.id;
    this.reportId = input.reportId;
    this.content = input.content;
    this.user = user;
  }
}
