import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateCommentInput } from './update-comment.input';

export class UpdateCommentCommand implements ICommand {
  id: string;

  authorId: string;

  content: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateCommentInput; user: MyUserResponse }) {
    this.id = input.id;
    this.authorId = input.authorId;
    this.content = input.content;
    this.source = input.source;
    this.user = user;
  }
}
