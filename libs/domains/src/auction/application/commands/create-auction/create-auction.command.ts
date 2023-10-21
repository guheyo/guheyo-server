import { ICommand } from '@nestjs/cqrs/dist';
import { CreateAuctionInput } from './create-auction.input';

export class CreateAuctionCommand implements ICommand {
  id: string;

  createdAt: Date;

  endedAt: Date;

  name: string;

  description?: string;

  businessFunction: string;

  status: string;

  source: string;

  guildId: string;

  productCategoryId: string;

  sellerId: string;

  brandId?: string;

  constructor(input: CreateAuctionInput) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.endedAt = input.endedAt;
    this.name = input.name;
    this.description = input.description;
    this.businessFunction = input.businessFunction;
    this.status = input.status;
    this.source = input.source;
    this.guildId = input.guildId;
    this.productCategoryId = input.productCategoryId;
    this.sellerId = input.sellerId;
    this.brandId = input.brandId;
  }
}
