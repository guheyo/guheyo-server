import { ICommand } from '@nestjs/cqrs/dist';
import { CreateDemandInput } from './create-demand.input';

export class CreateDemandCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  businessFunction: string;

  status: string;

  groupId: string;

  productCategoryId: string;

  buyerId: string;

  brandId?: string;

  source: string;

  constructor(input: CreateDemandInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.status = input.status;
    this.groupId = input.groupId;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
