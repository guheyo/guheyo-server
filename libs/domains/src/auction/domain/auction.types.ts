export interface UpdateAuctionProps {
  id: string;

  name?: string;

  description?: string;

  price?: number;

  priceCurrency?: string;

  businessFunction?: string;

  brandId?: string;
}

export enum AuctionStatus {
  OPEN = 'OPEN',
  END = 'END',
}

export enum AuctionBusinessFunction {
  AUCTION = 'AUCTION',
}

export enum BidStatus {
  BID = 'BID',
  WINNING_BID = 'WINNING_BID',
}
