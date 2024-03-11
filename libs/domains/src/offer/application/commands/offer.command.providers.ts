import { CreateOfferHandler } from './create-offer/create-offer.handler';
import { UpdateOfferHandler } from './update-offer/update-offer.handler';
import { DeleteOfferHandler } from './delete-offer/delete-offer.handler';
import { BumpOfferHandler } from './bump-offer/bump-offer.handler';
import { CreateOfferBumpHandler } from './create-offer-bump/create-offer-bump.handler';

export const OFFER_COMMAND_PROVIDERS = [
  CreateOfferHandler,
  UpdateOfferHandler,
  DeleteOfferHandler,
  BumpOfferHandler,
  CreateOfferBumpHandler,
];
