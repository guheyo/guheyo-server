export class UserReviewCreatedInput {
  reviewId: string;

  reviewStatus: string;

  constructor({ reviewId, reviewStatus }: { reviewId: string; reviewStatus: string }) {
    this.reviewId = reviewId;
    this.reviewStatus = reviewStatus;
  }
}
