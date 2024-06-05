import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateCommentInput } from './update-comment.input';

export class UpdateCommentCommand implements ICommand {
  id: string;

  content?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateCommentInput; user: MyUserResponse }) {
    this.id = input.id;
    this.content = input.content;
    this.user = user;
  }
}
