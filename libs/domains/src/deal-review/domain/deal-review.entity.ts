import { CommentEntity } from '@lib/domains/comment/domain/comment.entity';
import { VersionEntity } from '@lib/domains/version/domain/version.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { DealReviewCreatedEvent } from '../application/events/deal-review-created/deal-review-created.event';
import { DEAL_REVIEW_ONE_WAY, DEAL_REVIEW_TWO_WAY } from './deal-review.constants';

export class DealReviewEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  refId: string;

  refVersionId: string;

  @Type(() => VersionEntity)
  refVersion: VersionEntity;

  authorId: string;

  revieweeId: string;

  groupId: string;

  status: string;

  title: string;

  content: string | null;

  comments: CommentEntity[];

  constructor(partial: Partial<DealReviewEntity>) {
    super();
    Object.assign(this, partial);
    this.status = DEAL_REVIEW_ONE_WAY;
  }

  create() {
    this.apply(
      new DealReviewCreatedEvent({
        reviewId: this.id,
        refId: this.refId,
        revieweeId: this.revieweeId,
        reviewStatus: this.status,
      }),
    );
  }

  validateMatching(otherReviewAuthorId: string) {
    return this.revieweeId === otherReviewAuthorId;
  }

  matching() {
    this.status = DEAL_REVIEW_TWO_WAY;
  }
}
