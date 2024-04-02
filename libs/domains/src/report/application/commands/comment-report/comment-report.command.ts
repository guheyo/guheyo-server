import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommentReportInput } from './comment-report.input';

export class CommentReportCommand implements ICommand {
  input: CommentReportInput;

  user: MyUserResponse;

  constructor({ input, user }: { input: CommentReportInput; user: MyUserResponse }) {
    this.input = input;
    this.user = user;
  }
}
