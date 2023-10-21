import { ICommand } from '@nestjs/cqrs/dist';
import { CreateOfferInput } from './create-offer.input';

export class CreateOfferCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  price: number;

  priceCurrency: string;

  businessFunction: string;

  status: string;

  source: string;

  guildId: string;

  productCategoryId: string;

  sellerId: string;

  brandId?: string;

  constructor(input: CreateOfferInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.businessFunction = input.businessFunction;
    this.status = input.status;
    this.source = input.source;
    this.guildId = input.guildId;
    this.productCategoryId = input.productCategoryId;
    this.sellerId = input.sellerId;
    this.brandId = input.brandId;
  }
}
