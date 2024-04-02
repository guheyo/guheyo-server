import { OfferEntity } from '@lib/domains/offer/domain/offer.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';
import { FindOfferCountArgs } from '../../queries/find-offer-count/find-offer-count.args';

export interface OfferLoadPort extends LoadPort<OfferEntity> {
  findOfferCount(args: FindOfferCountArgs): Promise<number>;
}
