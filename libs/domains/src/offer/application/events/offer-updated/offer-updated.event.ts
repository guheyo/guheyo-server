import { IEvent } from '@nestjs/cqrs';

export class OfferUpdatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
