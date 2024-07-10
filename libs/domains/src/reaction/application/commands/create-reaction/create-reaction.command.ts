import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateReactionInput } from './create-reaction.input';

export class CreateReactionCommand implements ICommand {
  id: string;

  emojiId: string;

  postId: string;

  commentId?: string;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CreateReactionInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.emojiId = input.emojiId;
    this.postId = input.postId;
    this.commentId = input.commentId;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;

  }
}
