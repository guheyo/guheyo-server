import { IEvent } from '@nestjs/cqrs';

export class AuctionExtendedEvent implements IEvent {
  auctionId: string;

  constructor({ auctionId }: { auctionId: string }) {
    this.auctionId = auctionId;
  }
}
