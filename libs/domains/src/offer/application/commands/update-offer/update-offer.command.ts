import { ICommand } from '@nestjs/cqrs/dist';
import { OfferStatus } from '@lib/domains/offer/domain/offer.types';
import { UpdateOfferInput } from './update-offer.input';

export class UpdateOfferCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  sellerId: string;

  status?: OfferStatus;

  hidden?: boolean;

  brandId?: string;

  source: string;

  constructor(input: UpdateOfferInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.sellerId = input.sellerId;
    this.status = input.status as OfferStatus;
    this.hidden = input.hidden;
    this.brandId = input.brandId;
    this.source = input.source;
  }
}
