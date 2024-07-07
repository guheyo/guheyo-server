import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { UpdateThreadInput } from './update-thread.input';

export class UpdateThreadCommand implements ICommand {
  post: UpdatePostInput;

  id: string;

  content?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateThreadInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.content = input.content;
    this.user = user;
  }
}
