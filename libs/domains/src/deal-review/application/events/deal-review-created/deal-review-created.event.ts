import { IEvent } from '@nestjs/cqrs';
import { DealReviewCreatedInput } from './deal-review-created.input';

export class DealReviewCreatedEvent implements IEvent {
  reviewId: string;

  refId: string;

  revieweeId: string;

  reviewStatus: string;

  constructor(input: DealReviewCreatedInput) {
    this.reviewId = input.reviewId;
    this.refId = input.refId;
    this.revieweeId = input.revieweeId;
    this.reviewStatus = input.reviewStatus;
  }
}
