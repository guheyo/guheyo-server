import { ICommand } from '@nestjs/cqrs/dist';
import { SwapStatus } from '@lib/domains/swap/domain/swap.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateSwapInput } from './create-swap.input';

export class CreateSwapCommand implements ICommand {
  id: string;

  createdAt?: Date;

  updatedAt?: Date;

  name0: string;

  name1: string;

  description0?: string;

  description1?: string;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  businessFunction: string;

  status: SwapStatus;

  groupId: string;

  productCategoryId: string;

  proposerId: string;

  brandId?: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateSwapInput; user: MyUserResponse }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.description0 = input.description0;
    this.description1 = input.description1;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.status = input.status as SwapStatus;
    this.groupId = input.groupId;
    this.productCategoryId = input.productCategoryId;
    this.proposerId = input.proposerId;
    this.brandId = input.brandId;
    this.source = input.source;
    this.user = user;
  }
}
