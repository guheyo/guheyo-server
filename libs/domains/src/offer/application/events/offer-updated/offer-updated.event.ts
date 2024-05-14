import { IEvent } from '@nestjs/cqrs';

export class OfferUpdatedEvent implements IEvent {
  offerId: string;

  postId: string;

  constructor({ offerId, postId }: { offerId: string; postId: string }) {
    this.offerId = offerId;
    this.postId = postId;
  }
}
