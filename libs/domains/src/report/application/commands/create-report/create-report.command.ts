import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateReportInput } from './create-report.input';

export class CreateReportCommand implements ICommand {
  id: string;

  type: string;

  reportedPostId?: string;

  reportedCommentId?: string;

  reportedUserId: string;

  groupId: string;

  reason: string;

  description?: string;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CreateReportInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.type = input.type;
    this.reportedPostId = input.reportedPostId;
    this.reportedCommentId = input.reportedCommentId;
    this.reportedUserId = input.reportedUserId;
    this.groupId = input.groupId;
    this.reason = input.reason;
    this.description = input.description;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
