import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CancelReactionInput } from './cancel-reaction.input';

export class CancelReactionCommand implements ICommand {
  reactionId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CancelReactionInput; user: MyUserResponse }) {
    this.reactionId = input.reactionId;
    this.user = user;
  }
}
