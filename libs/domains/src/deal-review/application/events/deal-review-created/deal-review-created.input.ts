export class DealReviewCreatedInput {
  reviewId: string;

  refId: string;

  authorId: string;

  revieweeId: string;

  reviewStatus: string;

  constructor({
    reviewId,
    refId,
    authorId,
    revieweeId,
    reviewStatus,
  }: {
    reviewId: string;
    refId: string;
    authorId: string;
    revieweeId: string;
    reviewStatus: string;
  }) {
    this.reviewId = reviewId;
    this.refId = refId;
    this.authorId = authorId;
    this.revieweeId = revieweeId;
    this.reviewStatus = reviewStatus;
  }
}
