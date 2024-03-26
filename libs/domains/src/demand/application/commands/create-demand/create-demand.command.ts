import { ICommand } from '@nestjs/cqrs/dist';
import { DemandStatus } from '@lib/domains/demand/domain/demand.types';
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

  status: DemandStatus;

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
    this.status = input.status as DemandStatus;
    this.groupId = input.groupId;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
