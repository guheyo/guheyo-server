import { FindOfferByIdHandler } from './find-offer-by-id/find-offer-by-id.handler';
import { FindOfferHandler } from './find-offer/find-offer.handler';
import { FindOffersHandler } from './find-offers/find-offers.handler';

export const OFFER_QUERY_PROVIDERS = [FindOfferByIdHandler, FindOfferHandler, FindOffersHandler];
