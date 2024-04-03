import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateAuctionInput } from './update-auction.input';

export class UpdateAuctionCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  businessFunction?: string;

  productCategoryId?: string;

  brandId?: string;

  constructor(input: UpdateAuctionInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.brandId = input.brandId;
  }
}
