import { IEvent } from '@nestjs/cqrs';
import { UserReviewCreatedInput } from './user-review-created.input';

export class UserReviewCreatedEvent implements IEvent {
  reviewId: string;

  reviewStatus: string;

  postId: string;

  tagIds: string[];

  username: string;

  userAvatarURL?: string;

  title: string;

  slug?: string;

  rating: number;

  constructor(input: UserReviewCreatedInput) {
    this.reviewId = input.reviewId;
    this.reviewStatus = input.reviewStatus;
    this.postId = input.postId;
    this.tagIds = input.tagIds;
    this.username = input.username;
    this.userAvatarURL = input.userAvatarURL;
    this.title = input.title;
    this.slug = input.slug;
    this.rating = input.rating;
  }
}
