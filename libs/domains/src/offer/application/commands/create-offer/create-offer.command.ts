import { ICommand } from '@nestjs/cqrs';
import { OfferStatus } from '@lib/domains/offer/domain/offer.types';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { CreateOfferInput } from './create-offer.input';

export class CreateOfferCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  createdAt?: Date;

  updatedAt?: Date;

  businessFunction: string;

  name0?: string;

  name1?: string;

  content?: string;

  price: number;

  priceCurrency: string;

  shippingCost: number;

  shippingType: string;

  status: OfferStatus;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateOfferInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.businessFunction = input.businessFunction;
    this.name0 = input.name0;
    this.name1 = input.name1;
    this.content = input.content;
    this.price = input.price;
    this.priceCurrency = input.priceCurrency;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.status = input.status as OfferStatus;
    this.user = user;
  }
}
