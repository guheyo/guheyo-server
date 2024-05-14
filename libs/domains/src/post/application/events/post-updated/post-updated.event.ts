import { IEvent } from '@nestjs/cqrs';

export class PostUpdatedEvent implements IEvent {
  postId: string;

  type: string;

  constructor({ postId, type }: { postId: string; type: string }) {
    this.postId = postId;
    this.type = type;
  }
}
