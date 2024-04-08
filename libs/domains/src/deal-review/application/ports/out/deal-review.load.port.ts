import { DealReviewEntity } from '@lib/domains/deal-review/domain/deal-review.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface DealReviewLoadPort extends LoadPort<DealReviewEntity> {
  findLastDealReview({
    refId,
    authorId,
    revieweeId,
  }: {
    refId: string;
    authorId: string;
    revieweeId: string;
  }): Promise<DealReviewEntity | null>;
}
