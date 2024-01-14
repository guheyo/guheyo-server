import { IEvent } from '@nestjs/cqrs';

export class AuctionUpdatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
