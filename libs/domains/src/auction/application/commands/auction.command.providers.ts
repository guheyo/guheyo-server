import { CreateAuctionHandler } from './create-auction/create-auction.handler';
import { UpdateAuctionHandler } from './update-auction/update-auction.handler';
import { DeleteAuctionHandler } from './delete-auction/delete-auction.handler';
import { PlaceBidHandler } from './place-bid/place-bid.handler';
import { CancelBidHandler } from './cancel-bid/cancel-bid.handler';
import { InitialScheduleAuctionEndHandler } from './initial-schedule-auction-end/initial-schedule-auction-end.handler';
import { ReScheduleAuctionEndHandler } from './re-schedule-auction-end/re-schedule-auction-end.handler';

export const AUCTION_COMMAND_PROVIDERS = [
  CreateAuctionHandler,
  UpdateAuctionHandler,
  DeleteAuctionHandler,
  PlaceBidHandler,
  CancelBidHandler,
  InitialScheduleAuctionEndHandler,
  ReScheduleAuctionEndHandler,
];
