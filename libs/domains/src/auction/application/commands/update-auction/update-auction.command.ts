import { ICommand } from '@nestjs/cqrs/dist';
import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateAuctionInput } from './update-auction.input';

export class UpdateAuctionCommand implements ICommand {
  post: UpdatePostInput;

  id: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateAuctionInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.user = user;
  }
}
