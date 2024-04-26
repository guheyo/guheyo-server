export class UserReviewCreatedInput {
  reviewId: string;

  reviewStatus: string;

  postId: string;

  tagIds: string[];

  constructor({
    reviewId,
    reviewStatus,
    postId,
    tagIds,
  }: {
    reviewId: string;
    reviewStatus: string;
    postId: string;
    tagIds: string[];
  }) {
    this.reviewId = reviewId;
    this.reviewStatus = reviewStatus;
    this.postId = postId;
    this.tagIds = tagIds;
  }
}
