import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateSwapInput } from './update-swap.input';

export class UpdateSwapCommand implements ICommand {
  id: string;

  name0?: string;

  name1?: string;

  description0?: string;

  description1?: string;

  price?: number;

  priceCurrency?: string;

  businessFunction?: string;

  brandId?: string;

  constructor(input: UpdateSwapInput) {
    this.id = input.id;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.description0 = input.description0;
    this.description1 = input.description1;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.brandId = input.brandId;
  }
}
