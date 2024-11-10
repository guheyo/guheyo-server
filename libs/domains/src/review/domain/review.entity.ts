import { AggregateRoot } from '@nestjs/cqrs';
import { isUndefined, omitBy } from 'lodash';
import { PostEntity } from '@lib/domains/post/domain/post.entity';
import { Type } from 'class-transformer';
import { ReviewStatus, UpdateReviewProps } from './review.types';

export class ReviewEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  @Type(() => PostEntity)
  post: PostEntity;

  productId: string;

  content: string | null;

  rating: number;

  status: ReviewStatus;

  constructor(partial: Partial<ReviewEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateReviewProps) {
    Object.assign(this, omitBy(props, isUndefined));
  }
}
