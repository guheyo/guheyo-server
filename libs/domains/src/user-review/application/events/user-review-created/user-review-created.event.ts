import { IEvent } from '@nestjs/cqrs';
import { UserReviewCreatedInput } from './user-review-created.input';

export class UserReviewCreatedEvent implements IEvent {
  reviewId: string;

  reviewStatus: string;

  postId: string;

  tagIds: string[];

  constructor(input: UserReviewCreatedInput) {
    this.reviewId = input.reviewId;
    this.reviewStatus = input.reviewStatus;
    this.postId = input.postId;
    this.tagIds = input.tagIds;
  }
}
