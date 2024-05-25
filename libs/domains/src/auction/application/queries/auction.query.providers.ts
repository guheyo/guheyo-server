import { FindAuctionInteractionItemsHandler } from './find-auction-interaction-items/find-auction-interaction-items.handler';
import { FindAuctionPreviewsHandler } from './find-auction-previews/find-auction-previews.handler';
import { FindAuctionHandler } from './find-auction/find-auction.handler';
import { FindBidsHandler } from './find-bids/find-bids.handler';

export const AUCTION_QUERY_PROVIDERS = [
  FindAuctionHandler,
  FindAuctionPreviewsHandler,
  FindBidsHandler,
  FindAuctionInteractionItemsHandler,
];
