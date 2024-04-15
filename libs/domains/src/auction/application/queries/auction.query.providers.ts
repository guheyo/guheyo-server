import { FindAuctionByIdHandler } from './find-auction-by-id/find-auction-by-id.handler';
import { FindAuctionPreviewsHandler } from './find-auction-previews/find-auction-previews.handler';

export const AUCTION_QUERY_PROVIDERS = [FindAuctionByIdHandler, FindAuctionPreviewsHandler];
