import { FindAuctionByIdHandler } from './find-auction-by-id/find-auction-by-id.handler';
import { FindAuctionsHandler } from './find-auctions/find-auctions.handler';

export const AUCTION_QUERY_PROVIDERS = [FindAuctionByIdHandler, FindAuctionsHandler];
