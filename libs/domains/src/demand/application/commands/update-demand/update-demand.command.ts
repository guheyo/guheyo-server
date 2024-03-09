import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateDemandInput } from './update-demand.input';

export class UpdateDemandCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  businessFunction?: string;

  productCategoryId?: string;

  buyerId: string;

  brandId?: string;

  source: string;

  constructor(input: UpdateDemandInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
