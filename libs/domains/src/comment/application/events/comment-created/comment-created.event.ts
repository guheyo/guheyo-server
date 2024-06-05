import { IEvent } from '@nestjs/cqrs';

export class CommentCreatedEvent implements IEvent {
  id: string;

  constructor({ id }: { id: string }) {
    this.id = id;
  }
}
