export class UserReviewCreatedInput {
  reviewId: string;

  reviewStatus: string;

  postId: string;

  tagIds: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  rating: number;

  constructor({
    reviewId,
    reviewStatus,
    postId,
    tagIds,
    username,
    userAvatarURL,
    title,
    slug,
    rating,
  }: {
    reviewId: string;
    reviewStatus: string;
    postId: string;
    tagIds: string[];
    username: string;
    userAvatarURL?: string;
    title: string;
    slug?: string;
    rating: number;
  }) {
    this.reviewId = reviewId;
    this.reviewStatus = reviewStatus;
    this.postId = postId;
    this.tagIds = tagIds;
    this.username = username;
    this.userAvatarURL = userAvatarURL;
    this.title = title;
    this.slug = slug;
    this.rating = rating;
  }
}
