import { FindAuctionPreviewsHandler } from './find-auction-previews/find-auction-previews.handler';
import { FindAuctionHandler } from './find-auction/find-auction.handler';

export const AUCTION_QUERY_PROVIDERS = [FindAuctionHandler, FindAuctionPreviewsHandler];
