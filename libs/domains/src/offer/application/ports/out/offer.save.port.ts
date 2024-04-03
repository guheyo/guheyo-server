import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface OfferSavePort extends SavePort<OfferEntity> {}
