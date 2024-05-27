import { IEvent } from '@nestjs/cqrs';

export class AuctionCreatedEvent implements IEvent {
  id: string;

  postId: string;

  tagIds: string[];

  constructor({ id, postId, tagIds }: { id: string; postId: string; tagIds: string[] }) {
    this.id = id;
    this.postId = postId;
    this.tagIds = tagIds;
  }
}
