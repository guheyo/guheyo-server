import { ICommand } from '@nestjs/cqrs/dist';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreateAuctionInput } from './create-auction.input';

export class CreateAuctionCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  createdAt: Date;

  originalEndDate: Date;

  content?: string;

  shippingCost: number;

  shippingType: string;

  status: string;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateAuctionInput; user: MyUserResponse }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.originalEndDate = input.originalEndDate;
    this.content = input.content;
    this.shippingCost = input.shippingCost;
    this.shippingType = input.shippingType;
    this.status = input.status;
    this.user = user;
  }
}
