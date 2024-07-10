import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CommentReportInput } from './comment-report.input';

export class CommentReportCommand implements ICommand {
  id: string;

  reportId: string;

  content: string;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CommentReportInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.reportId = input.reportId;
    this.content = input.content;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
