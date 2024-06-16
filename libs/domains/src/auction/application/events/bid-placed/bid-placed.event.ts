import { IEvent } from '@nestjs/cqrs';

export class BidPlacedEvent implements IEvent {
  auctionId: string;

  bidId: string;

  constructor({ auctionId, bidId }: { auctionId: string; bidId: string }) {
    this.auctionId = auctionId;
    this.bidId = bidId;
  }
}
