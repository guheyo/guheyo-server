import { ICommand } from '@nestjs/cqrs';
import { FollowUserInput } from './follow-user.input';
import { MyUserResponse } from '../../dtos/my-user.response';

export class FollowUserCommand implements ICommand {
  followingId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: FollowUserInput; user: MyUserResponse }) {
    this.followingId = input.followingId;
    this.user = user;
  }
}
