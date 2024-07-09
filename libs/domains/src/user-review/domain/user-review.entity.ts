import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { UserReviewCreatedEvent } from '../application/events/user-review-created/user-review-created.event';
import { USER_REVIEW_TWO_WAY } from './user-review.constants';

export class UserReviewEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  postId: string;

  @Type()
  post: PostEntity;

  type: string;

  reviewedUserId: string;

  offerId: string | null;

  auctionId: string | null;

  content: string | null;

  rating: number;

  status: string;

  constructor(partial: Partial<UserReviewEntity>) {
    super();
    Object.assign(this, partial);
  }

  create(tagIds: string[]) {
    this.apply(
      new UserReviewCreatedEvent({
        reviewId: this.id,
        reviewStatus: this.status,
        postId: this.post.id,
        thumbnail: this.post.thumbnail || undefined,
        tagIds,
        username: this.post.user.username,
        userAvatarURL: this.post.user.avatarURL || undefined,
        title: this.post.title,
        slug: this.post.slug || undefined,
        rating: this.rating,
      }),
    );
  }

  isAuthorized(userId: string) {
    return this.post.userId === userId;
  }

  matching() {
    this.status = USER_REVIEW_TWO_WAY;
  }
}
