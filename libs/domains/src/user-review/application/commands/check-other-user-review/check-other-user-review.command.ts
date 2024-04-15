import { ICommand } from '@nestjs/cqrs';
import { CheckOtherUserReviewInput } from './check-other-user-review.input';

export class CheckOtherUserReviewCommand implements ICommand {
  sourceUserReviewId: string;

  type: string;

  offerId?: string;

  auctionId?: string;

  userId: string;

  reviewedUserId: string;

  reviewStatus: string;

  constructor(input: CheckOtherUserReviewInput) {
    this.sourceUserReviewId = input.sourceUserReviewId;
    this.type = input.type;
    this.offerId = input.offerId;
    this.auctionId = input.auctionId;
    this.userId = input.userId;
    this.reviewedUserId = input.reviewedUserId;
    this.reviewStatus = input.reviewStatus;
  }
}
