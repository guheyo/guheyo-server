import { IEvent } from '@nestjs/cqrs';

export class PostCreatedEvent implements IEvent {
  postId: string;

  type: string;

  constructor({ postId, type }: { postId: string; type: string }) {
    this.postId = postId;
    this.type = type;
  }
}
