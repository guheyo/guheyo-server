import { DealReviewEntity } from '@lib/domains/deal-review/domain/deal-review.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface DealReviewSavePort extends SavePort<DealReviewEntity> {
  connectMannerTags(reviewId: string, tagIds: string[]): Promise<void>;
}
