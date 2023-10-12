import { IEvent } from '@nestjs/cqrs';

export class DemandCreatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
