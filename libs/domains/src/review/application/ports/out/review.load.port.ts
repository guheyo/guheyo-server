import { ReviewEntity } from '@lib/domains/review/domain/review.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface ReviewLoadPort extends LoadPort<ReviewEntity> {}
