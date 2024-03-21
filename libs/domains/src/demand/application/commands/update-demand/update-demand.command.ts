import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateDemandInput } from './update-demand.input';

export class UpdateDemandCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  buyerId: string;

  status?: string;

  brandId?: string;

  source: string;

  constructor(input: UpdateDemandInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.status = input.status;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
