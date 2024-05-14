import { UserReviewEntity } from '@lib/domains/user-review/domain/user-review.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface UserReviewSavePort extends SavePort<UserReviewEntity> {}
