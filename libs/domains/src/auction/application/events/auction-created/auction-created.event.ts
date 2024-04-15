import { IEvent } from '@nestjs/cqrs';

export class AuctionCreatedEvent implements IEvent {
  id: string;

  tagIds: string[];

  constructor({ id, tagIds }: { id: string; tagIds: string[] }) {
    this.id = id;
    this.tagIds = tagIds;
  }
}
