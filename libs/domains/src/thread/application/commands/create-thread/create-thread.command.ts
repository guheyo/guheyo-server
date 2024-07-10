import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { CreateThreadInput } from './create-thread.input';

export class CreateThreadCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  content?: string;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CreateThreadInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.post = input.post;
    this.id = input.id;
    this.content = input.content;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
