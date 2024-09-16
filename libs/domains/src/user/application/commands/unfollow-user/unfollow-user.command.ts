import { ICommand } from '@nestjs/cqrs';
import { UnfollowUserInput } from './unfollow-user.input';
import { MyUserResponse } from '../../dtos/my-user.response';

export class UnfollowUserCommand implements ICommand {
  followingId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UnfollowUserInput; user: MyUserResponse }) {
    this.followingId = input.followingId;
    this.user = user;
  }
}
