import { ICommand } from '@nestjs/cqrs/dist';
import { DemandStatus } from '@lib/domains/demand/domain/demand.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateDemandInput } from './create-demand.input';

export class CreateDemandCommand implements ICommand {
  id: string;

  createdAt?: Date;

  updatedAt?: Date;

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

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateDemandInput; user: MyUserResponse }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
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
    this.user = user;
  }
}
