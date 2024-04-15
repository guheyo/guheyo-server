import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { AddBidInput } from './add-bid.input';

export class AddBidCommand implements ICommand {
  id: string;

  price: number;

  priceCurrency: string;

  auctionId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: AddBidInput; user: MyUserResponse }) {
    this.id = input.id;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.auctionId = input.auctionId;
    this.user = user;
  }
}
