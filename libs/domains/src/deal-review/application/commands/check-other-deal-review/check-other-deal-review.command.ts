import { ICommand } from '@nestjs/cqrs';
import { CheckOtherDealReviewInput } from './check-other-deal-review.input';

export class CheckOtherDealReviewCommand implements ICommand {
  sourceDealReviewId: string;

  refId: string;

  authorId: string;

  revieweeId: string;

  reviewStatus: string;

  constructor(input: CheckOtherDealReviewInput) {
    this.sourceDealReviewId = input.sourceDealReviewId;
    this.refId = input.refId;
    this.authorId = input.authorId;
    this.revieweeId = input.revieweeId;
    this.reviewStatus = input.reviewStatus;
  }
}
