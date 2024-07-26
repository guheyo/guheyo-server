import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateCommentInput } from './create-comment.input';

export class CreateCommentCommand implements ICommand {
  id: string;

  createdAt?: Date;

  updatedAt?: Date;

  postId: string;

  content?: string;

  pinned: boolean;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CreateCommentInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.postId = input.postId;
    this.content = input.content;
    this.pinned = input.pinned;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
