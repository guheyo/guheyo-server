import { IEvent } from '@nestjs/cqrs';

export class AuctionCreatedEvent implements IEvent {
  id: string;

  postId: string;

  tagIds: string[];

  extendedEndDate: Date;

  constructor({
    id,
    postId,
    tagIds,
    extendedEndDate,
  }: {
    id: string;
    postId: string;
    tagIds: string[];
    extendedEndDate: Date;
  }) {
    this.id = id;
    this.postId = postId;
    this.tagIds = tagIds;
    this.extendedEndDate = extendedEndDate;
  }
}
