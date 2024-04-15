import { IEvent } from '@nestjs/cqrs';
import { UserReviewCreatedInput } from './user-review-created.input';

export class UserReviewCreatedEvent implements IEvent {
  reviewId: string;

  type: string;

  offerId?: string;

  auctionId?: string;

  userId: string;

  reviewedUserId: string;

  reviewStatus: string;

  constructor(input: UserReviewCreatedInput) {
    this.reviewId = input.reviewId;
    this.type = input.type;
    this.offerId = input.offerId;
    this.auctionId = input.auctionId;
    this.userId = input.userId;
    this.reviewedUserId = input.reviewedUserId;
    this.reviewStatus = input.reviewStatus;
  }
}
