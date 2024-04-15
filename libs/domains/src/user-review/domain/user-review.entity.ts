import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { UserReviewCreatedEvent } from '../application/events/user-review-created/user-review-created.event';
import { USER_REVIEW_ONE_WAY, USER_REVIEW_TWO_WAY } from './user-review.constants';

export class UserReviewEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  postId: string;

  @Type()
  post: PostEntity;

  type: string;

  refVersionId: string;

  @Type(() => VersionEntity)
  refVersion: VersionEntity;

  reviewedUserId: string;

  offerId: string | null;

  auctionId: string | null;

  rating: number;

  status: string;

  constructor(partial: Partial<UserReviewEntity>) {
    super();
    Object.assign(this, partial);
    this.status = USER_REVIEW_ONE_WAY;
  }

  create() {
    this.apply(
      new UserReviewCreatedEvent({
        reviewId: this.id,
        offerId: this.offerId || undefined,
        auctionId: this.auctionId || undefined,
        userId: this.post.userId,
        reviewedUserId: this.reviewedUserId,
        reviewStatus: this.status,
      }),
    );
  }

  matching() {
    this.status = USER_REVIEW_TWO_WAY;
  }
}
