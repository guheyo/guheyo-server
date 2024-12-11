import { ReviewEntity } from '@lib/domains/review/domain/review.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface ReviewSavePort extends SavePort<ReviewEntity> {}
