import { OfferRepository } from './adapter/out/persistence/offer.repository';
import { OFFER_COMMAND_PROVIDERS } from './application/commands/offer.command.providers';
import { OFFER_QUERY_PROVIDERS } from './application/queries/offer.query.providers';
import { OFFER_EVENT_PROVIDERS } from './application/events/offer.event.providers';
import { OfferSagas } from './application/sagas/offer.sagas';

export const OFFER_PROVIDERS = [
  {
    provide: 'OfferLoadPort',
    useClass: OfferRepository,
  },
  {
    provide: 'OfferSavePort',
    useClass: OfferRepository,
  },
  ...OFFER_COMMAND_PROVIDERS,
  ...OFFER_QUERY_PROVIDERS,
  ...OFFER_EVENT_PROVIDERS,
  OfferSagas,
];
