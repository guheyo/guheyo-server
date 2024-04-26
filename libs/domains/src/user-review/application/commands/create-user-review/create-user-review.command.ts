import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { UserReviewStatus } from '@lib/domains/user-review/domain/user-review.types';
import { CreateUserReviewInput } from './create-user-review.input';

export class CreateUserReviewCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  type: string;

  reviewedUserId: string;

  offerId?: string;

  auctionId?: string;

  content?: string;

  rating: number;

  status: UserReviewStatus;

  user: MyUserResponse;

  constructor({ input, user }: { input: CreateUserReviewInput; user: MyUserResponse }) {
    this.post = input.post;
    this.id = input.id;
    this.type = input.type;
    this.reviewedUserId = input.reviewedUserId;
    this.offerId = input.offerId;
    this.auctionId = input.auctionId;
    this.rating = input.rating;
    this.status = input.status as UserReviewStatus;
    this.user = user;
  }
}
