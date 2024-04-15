export class UserReviewCreatedInput {
  reviewId: string;

  type: string;

  offerId?: string;

  auctionId?: string;

  userId: string;

  reviewedUserId: string;

  reviewStatus: string;

  constructor({
    reviewId,
    type,
    offerId,
    auctionId,
    userId,
    reviewedUserId,
    reviewStatus,
  }: {
    reviewId: string;
    type: string;
    offerId?: string;
    auctionId?: string;
    userId: string;
    reviewedUserId: string;
    reviewStatus: string;
  }) {
    this.reviewId = reviewId;
    this.type = type;
    this.offerId = offerId;
    this.auctionId = auctionId;
    this.userId = userId;
    this.reviewedUserId = reviewedUserId;
    this.reviewStatus = reviewStatus;
  }
}
