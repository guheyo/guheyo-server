import { IEvent } from '@nestjs/cqrs';

export class OfferCreatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
