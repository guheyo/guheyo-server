import { IEvent } from '@nestjs/cqrs';
import { DealReviewCreatedInput } from './deal-review-created.input';

export class DealReviewCreatedEvent implements IEvent {
  reviewId: string;

  refId: string;

  authorId: string;

  revieweeId: string;

  reviewStatus: string;

  constructor(input: DealReviewCreatedInput) {
    this.reviewId = input.reviewId;
    this.refId = input.refId;
    this.authorId = input.authorId;
    this.revieweeId = input.revieweeId;
    this.reviewStatus = input.reviewStatus;
  }
}
