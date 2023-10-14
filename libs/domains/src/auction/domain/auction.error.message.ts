export enum AuctionErrorMessage {
  AUCTION_IS_NOT_FOUND = 'Auction is not found',
  AUCTION_HAS_ENDED = 'Auction has ended',
  BID_IS_NOT_FOUND = 'Bid is not found',
  BID_BELOW_THE_CURRENT_PRICE = 'Bid below the current price',
  CANCELLERS_ATTEMPT_TO_RE_BID = 'Cancellers attempt to re-bid',
  BID_CANCELLATION_TIMEOUT = 'Bid cancellation Timeout',
}
