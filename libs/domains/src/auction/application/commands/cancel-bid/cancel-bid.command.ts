import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CancelBidInput } from './cancel-bid.input';

export class CancelBidCommand implements ICommand {
  auctionId: string;

  bidId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CancelBidInput; user: MyUserResponse }) {
    this.auctionId = input.auctionId;
    this.bidId = input.bidId;
    this.user = user;
  }
}
