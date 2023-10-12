import { IEvent } from '@nestjs/cqrs';

export class SwapUpdatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
