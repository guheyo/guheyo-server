import { IEvent } from '@nestjs/cqrs';

export class OfferUpdatedEvent implements IEvent {
  id: string;

  businessFunction: string;

  constructor({ id, businessFunction }: { id: string; businessFunction: string }) {
    this.id = id;
    this.businessFunction = businessFunction;
  }
}
