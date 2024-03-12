import { CreateOfferHandler } from './create-offer/create-offer.handler';
import { UpdateOfferHandler } from './update-offer/update-offer.handler';
import { DeleteOfferHandler } from './delete-offer/delete-offer.handler';
import { BumpOfferHandler } from './bump-offer/bump-offer.handler';

export const OFFER_COMMAND_PROVIDERS = [
  CreateOfferHandler,
  UpdateOfferHandler,
  DeleteOfferHandler,
  BumpOfferHandler,
];
