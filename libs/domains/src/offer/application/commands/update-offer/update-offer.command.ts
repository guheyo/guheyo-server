import { ICommand } from '@nestjs/cqrs/dist';
import { OfferStatus } from '@lib/domains/offer/domain/offer.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
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

  isHidden?: boolean;

  brandId?: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateOfferInput; user: MyUserResponse }) {
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
    this.isHidden = input.isHidden;
    this.brandId = input.brandId;
    this.source = input.source;
    this.user = user;
  }
}
