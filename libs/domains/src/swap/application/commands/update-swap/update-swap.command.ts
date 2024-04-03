import { ICommand } from '@nestjs/cqrs/dist';
import { SwapStatus } from '@lib/domains/swap/domain/swap.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateSwapInput } from './update-swap.input';

export class UpdateSwapCommand implements ICommand {
  id: string;

  name0?: string;

  name1?: string;

  description0?: string;

  description1?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  businessFunction?: string;

  productCategoryId?: string;

  proposerId: string;

  status?: SwapStatus;

  isHidden?: boolean;

  brandId?: string;

  source: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateSwapInput; user: MyUserResponse }) {
    this.id = input.id;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.description0 = input.description0;
    this.description1 = input.description1;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.businessFunction = input.businessFunction;
    this.productCategoryId = input.productCategoryId;
    this.proposerId = input.proposerId;
    this.status = input.status as SwapStatus;
    this.isHidden = input.isHidden;
    this.brandId = input.brandId;
    this.source = input.source;
    this.user = user;
  }
}
