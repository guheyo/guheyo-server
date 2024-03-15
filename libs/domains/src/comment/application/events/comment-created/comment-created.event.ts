import { IEvent } from '@nestjs/cqrs';

export class CommentCreatedEvent implements IEvent {
  type: string;

  refId: string;

  constructor({ type, refId }: { type: string; refId: string }) {
    this.type = type;
    this.refId = refId;
  }
}
