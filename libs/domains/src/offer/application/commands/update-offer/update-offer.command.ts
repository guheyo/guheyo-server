import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateOfferInput } from './update-offer.input';

export class UpdateOfferCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  businessFunction?: string;

  source: string;

  brandId?: string;

  constructor(input: UpdateOfferInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.source = input.source;
    this.brandId = input.brandId;
  }
}
