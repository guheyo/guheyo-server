import { ICommand } from '@nestjs/cqrs/dist';
import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { OfferStatus } from '@lib/domains/offer/domain/offer.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UpdateOfferInput } from './update-offer.input';

export class UpdateOfferCommand implements ICommand {
  post: UpdatePostInput;

  id: string;

  name0?: string;

  name1?: string;

  price?: number;

  priceCurrency?: string;

  shippingCost?: number;

  shippingType?: string;

  status?: OfferStatus;

  user: MyUserResponse;

  constructor({ input, user }: { input: UpdateOfferInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.status = input.status as OfferStatus;
    this.user = user;
  }
}
