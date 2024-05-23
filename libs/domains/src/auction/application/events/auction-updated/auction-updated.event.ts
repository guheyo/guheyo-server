import { IEvent } from '@nestjs/cqrs';

export class AuctionUpdatedEvent implements IEvent {
  auctionId: string;

  postId: string;

  constructor({ auctionId, postId }: { auctionId: string; postId: string }) {
    this.auctionId = auctionId;
    this.postId = postId;
  }
}
