import { DealReviewEntity } from '@lib/domains/deal-review/domain/deal-review.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface DealReviewLoadPort extends LoadPort<DealReviewEntity> {
  findLastDealReview(refId: string, authorId: string): Promise<DealReviewEntity | null>;
}
