import { IEvent } from '@nestjs/cqrs';

export class SwapCreatedEvent implements IEvent {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
