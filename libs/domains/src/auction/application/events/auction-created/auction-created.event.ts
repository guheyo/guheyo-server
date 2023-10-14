import { IEvent } from '@nestjs/cqrs';

export class AuctionCreatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
