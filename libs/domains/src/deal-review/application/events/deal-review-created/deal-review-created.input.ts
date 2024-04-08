export class DealReviewCreatedInput {
  reviewId: string;

  refId: string;

  revieweeId: string;

  reviewStatus: string;

  constructor({
    reviewId,
    refId,
    revieweeId,
    reviewStatus,
  }: {
    reviewId: string;
    refId: string;
    revieweeId: string;
    reviewStatus: string;
  }) {
    this.reviewId = reviewId;
    this.refId = refId;
    this.revieweeId = revieweeId;
    this.reviewStatus = reviewStatus;
  }
}
