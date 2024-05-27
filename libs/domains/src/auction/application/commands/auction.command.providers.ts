import { CreateAuctionHandler } from './create-auction/create-auction.handler';
import { UpdateAuctionHandler } from './update-auction/update-auction.handler';
import { DeleteAuctionHandler } from './delete-auction/delete-auction.handler';
import { PlaceBidHandler } from './place-bid/place-bid.handler';
import { CancelBidHandler } from './cancel-bid/cancel-bid.handler';

export const AUCTION_COMMAND_PROVIDERS = [
  CreateAuctionHandler,
  UpdateAuctionHandler,
  DeleteAuctionHandler,
  PlaceBidHandler,
  CancelBidHandler,
];
