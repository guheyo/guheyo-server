import { ICommand } from '@nestjs/cqrs';
import { CheckOtherUserReviewInput } from './check-other-user-review.input';

export class CheckOtherUserReviewCommand implements ICommand {
  sourceUserReviewId: string;

  reviewStatus: string;

  constructor(input: CheckOtherUserReviewInput) {
    this.sourceUserReviewId = input.sourceUserReviewId;
    this.reviewStatus = input.reviewStatus;
  }
}
