import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateCommentInput } from './create-comment.input';

export class CreateCommentCommand implements ICommand {
  id: string;

  createdAt?: Date;

  updatedAt?: Date;

  postId: string;

  content?: string;

  user: MyUserResponse;

  userAgent?: string;

  constructor({
    input,
    user,
    userAgent,
  }: {
    input: CreateCommentInput;
    user: MyUserResponse;
    userAgent?: string;
  }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.postId = input.postId;
    this.content = input.content;
    this.user = user;
    this.userAgent = userAgent;
  }
}
