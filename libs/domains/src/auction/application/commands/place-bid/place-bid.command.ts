import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { PlaceBidInput } from './place-bid.input';

export class PlaceBidCommand implements ICommand {
  id: string;

  price: number;

  priceCurrency: string;

  auctionId: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: PlaceBidInput; user: MyUserResponse }) {
    this.id = input.id;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.auctionId = input.auctionId;
    this.user = user;
  }
}
