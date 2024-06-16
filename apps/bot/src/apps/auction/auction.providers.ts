import { AuctionClient } from './clients/auction.client';
import { BidClient } from './clients/bid.client';
import { AuctionParser } from './parsers/auction.parser';
import { BidParser } from './parsers/bid.parser';

export const BOT_AUCTION_PROVIDERS = [AuctionClient, AuctionParser, BidClient, BidParser];
