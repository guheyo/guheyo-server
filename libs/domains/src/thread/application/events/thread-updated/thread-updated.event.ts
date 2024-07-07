import { IEvent } from '@nestjs/cqrs';
import { ThreadUpdatedInput } from './thread-updated.input';

export class ThreadUpdatedEvent implements IEvent {
  threadId: string;

  postId: string;

  constructor(input: ThreadUpdatedInput) {
    this.threadId = input.threadId;
    this.postId = input.postId;
  }
}
