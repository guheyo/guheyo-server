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
  OPEN = 'open',
  END = 'end',
}

export enum AuctionBusinessFunction {
  AUCTION = 'auction',
}

export enum BidStatus {
  BID = 'bid',
  WIN = 'win',
}
