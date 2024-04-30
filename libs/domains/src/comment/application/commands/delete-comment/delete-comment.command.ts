import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { DeleteCommentInput } from './delete-comment.input';

export class DeleteCommentCommand implements ICommand {
  id: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: DeleteCommentInput; user: MyUserResponse }) {
    this.id = input.id;
    this.user = user;
  }
}
