import { CreateAuctionHandler } from './create-auction/create-auction.handler';
import { UpdateAuctionHandler } from './update-auction/update-auction.handler';
import { DeleteAuctionHandler } from './delete-auction/delete-auction.handler';

export const AUCTION_COMMAND_PROVIDERS = [
  CreateAuctionHandler,
  UpdateAuctionHandler,
  DeleteAuctionHandler,
];
