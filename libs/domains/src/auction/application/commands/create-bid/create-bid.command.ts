import { ICommand } from '@nestjs/cqrs/dist';
import { CreateBidInput } from './create-bid.input';

export class CreateBidCommand implements ICommand {
  id: string;

  createdAt?: Date;

  updatedAt?: Date;

  canceledAt?: Date;

  price: number;

  priceCurrency: string;

  auctionId: string;

  userId: string;

  status: string;

  userAgent: string;

  constructor({ input }: { input: CreateBidInput }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.canceledAt = input.canceledAt;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.auctionId = input.auctionId;
    this.userId = input.userId;
    this.status = input.status;
    this.userAgent = input.userAgent;
  }
}
