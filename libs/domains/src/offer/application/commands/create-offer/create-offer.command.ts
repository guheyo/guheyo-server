import { ICommand } from '@nestjs/cqrs/dist';
import { OfferStatus } from '@lib/domains/offer/domain/offer.types';
import { CreateOfferInput } from './create-offer.input';

export class CreateOfferCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  businessFunction: string;

  status: OfferStatus;

  source: string;

  groupId: string;

  productCategoryId: string;

  sellerId: string;

  brandId?: string;

  constructor(input: CreateOfferInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.status = input.status as OfferStatus;
    this.source = input.source;
    this.groupId = input.groupId;
    this.productCategoryId = input.productCategoryId;
    this.sellerId = input.sellerId;
    this.brandId = input.brandId;
  }
}
