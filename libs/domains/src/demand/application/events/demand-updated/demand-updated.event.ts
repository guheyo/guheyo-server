import { IEvent } from '@nestjs/cqrs';

export class DemandUpdatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
