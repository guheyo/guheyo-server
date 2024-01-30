import { ICommand } from '@nestjs/cqrs/dist';
import { CreateSwapInput } from './create-swap.input';

export class CreateSwapCommand implements ICommand {
  id: string;

  name0: string;

  name1: string;

  description0?: string;

  description1?: string;

  price: number;

  priceCurrency: string;

  businessFunction: string;

  status: string;

  groupId: string;

  productCategoryId: string;

  proposerId: string;

  brandId?: string;

  source: string;

  constructor(input: CreateSwapInput) {
    this.id = input.id;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.description0 = input.description0;
    this.description1 = input.description1;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.status = input.status;
    this.groupId = input.groupId;
    this.productCategoryId = input.productCategoryId;
    this.proposerId = input.proposerId;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
