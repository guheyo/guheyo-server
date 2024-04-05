import { FindOfferHandler } from './find-offer/find-offer.handler';
import { FindOfferPreviewsHandler } from './find-offer-previews/find-offer-previews.handler';
import { FindOfferCountHandler } from './find-offer-count/find-offer-count.handler';

export const OFFER_QUERY_PROVIDERS = [
  FindOfferHandler,
  FindOfferPreviewsHandler,
  FindOfferCountHandler,
];
