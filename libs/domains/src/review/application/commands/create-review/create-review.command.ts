import { ICommand } from '@nestjs/cqrs/dist';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ReviewStatus } from '@lib/domains/review/domain/review.types';
import { CreatePostInput } from '@lib/domains/post/application/commands/create-post/create-post.input';
import { CreateReviewInput } from './create-review.input';

export class CreateReviewCommand implements ICommand {
  post: CreatePostInput;

  id: string;

  productId?: string;

  content?: string;

  rating: number;

  status: ReviewStatus;

  user: MyUserResponse;

  userAgent?: string;

  ipAddress?: string;

  constructor({
    input,
    user,
    userAgent,
    ipAddress,
  }: {
    input: CreateReviewInput;
    user: MyUserResponse;
    userAgent?: string;
    ipAddress?: string;
  }) {
    this.id = input.id;
    this.post = input.post;
    this.productId = input.productId;
    this.content = input.content;
    this.rating = input.rating;
    this.status = input.status as ReviewStatus;
    this.user = user;
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
  }
}
