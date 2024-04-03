import { ICommand } from '@nestjs/cqrs/dist';
import { DemandStatus } from '@lib/domains/demand/domain/demand.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateDemandInput } from './update-demand.input';

export class UpdateDemandCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  buyerId: string;

  status?: DemandStatus;

  isHidden?: boolean;

  brandId?: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateDemandInput; user: MyUserResponse }) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.buyerId = input.buyerId;
    this.status = input.status as DemandStatus;
    this.isHidden = input.isHidden;
    this.brandId = input.brandId;
    this.source = input.source;
    this.user = user;
  }
}
