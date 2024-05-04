import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CancelReactionInput } from './cancel-reaction.input';

export class CancelReactionCommand implements ICommand {
  emojiId: string;

  postId?: string;

  commentId?: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CancelReactionInput; user: MyUserResponse }) {
    this.emojiId = input.emojiId;
    this.postId = input.postId;
    this.commentId = input.commentId;
    this.user = user;
  }
}
