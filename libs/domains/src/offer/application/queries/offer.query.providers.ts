import { FindOfferByIdHandler } from './find-offer-by-id/find-offer-by-id.handler';
import { FindOfferHandler } from './find-offer/find-offer.handler';
import { FindOfferPreviewsHandler } from './find-offer-previews/find-offer-previews.handler';

export const OFFER_QUERY_PROVIDERS = [
  FindOfferByIdHandler,
  FindOfferHandler,
  FindOfferPreviewsHandler,
];
