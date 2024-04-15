import { UserReviewEntity } from '@lib/domains/user-review/domain/user-review.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface UserReviewLoadPort extends LoadPort<UserReviewEntity> {
  findLastUserReview({
    type,
    offerId,
    auctionId,
    userId,
    reviewedUserId,
  }: {
    type: string;
    offerId?: string;
    auctionId?: string;
    userId: string;
    reviewedUserId: string;
  }): Promise<UserReviewEntity | null>;
}
