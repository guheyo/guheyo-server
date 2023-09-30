import { OfferRepository } from '../../adapter/out/persistence/offer.repository';
import { CreateOfferHandler } from './create-offer/create-offer.handler';
import { UpdateOfferHandler } from './update-offer/update-offer.handler';
import { DeleteOfferHandler } from './delete-offer/delete-offer.handler';

export const OFFER_COMMAND_PROVIDERS = [
  CreateOfferHandler,
  UpdateOfferHandler,
  DeleteOfferHandler,
  {
    provide: 'OfferLoadPort',
    useClass: OfferRepository,
  },
  {
    provide: 'OfferSavePort',
    useClass: OfferRepository,
  },
];
