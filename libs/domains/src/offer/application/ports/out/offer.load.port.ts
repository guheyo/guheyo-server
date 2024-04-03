import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface OfferLoadPort extends LoadPort<OfferEntity> {}
