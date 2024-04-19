import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { CreateUserReviewInput } from './create-user-review.input';

export class CreateUserReviewCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  type: string;

  offerId?: string;

  auctionId?: string;

  reviewedUserId: string;

  content?: string;

  rating: number;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateUserReviewInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.type = input.type;
    this.offerId = input.offerId;
    this.auctionId = input.auctionId;
    this.reviewedUserId = input.reviewedUserId;
    this.rating = input.rating;
    this.user = user;
  }
}
