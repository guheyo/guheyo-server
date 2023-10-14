import { CreateAuctionHandler } from './create-auction/create-auction.handler';
import { UpdateAuctionHandler } from './update-auction/update-auction.handler';
import { DeleteAuctionHandler } from './delete-auction/delete-auction.handler';
import { AddBidHandler } from './add-bid/add-bid.handler';
import { CancelBidHandler } from './cancel-bid/cancel-bid.handler';

export const AUCTION_COMMAND_PROVIDERS = [
  CreateAuctionHandler,
  UpdateAuctionHandler,
  DeleteAuctionHandler,
  AddBidHandler,
  CancelBidHandler,
];
