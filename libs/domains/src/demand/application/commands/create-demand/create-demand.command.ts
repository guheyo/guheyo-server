import { ICommand } from '@nestjs/cqrs/dist';
import { CreateDemandInput } from './create-demand.input';

export class CreateDemandCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  price: number;

  priceCurrency: string;

  businessFunction: string;

  status: string;

  guildId: string;

  productCategoryId: string;

  buyerId: string;

  brandId?: string;

  constructor(input: CreateDemandInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.status = input.status;
    this.guildId = input.guildId;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.brandId = input.brandId;
  }
}
