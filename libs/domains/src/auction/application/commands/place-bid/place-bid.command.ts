import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { PlaceBidInput } from './place-bid.input';

export class PlaceBidCommand implements ICommand {
  id: string;

  price: number;

  priceCurrency: string;

  auctionId: string;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: PlaceBidInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.auctionId = input.auctionId;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
