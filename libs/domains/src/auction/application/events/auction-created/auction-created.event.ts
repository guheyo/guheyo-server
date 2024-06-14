import { IEvent } from '@nestjs/cqrs';

export class AuctionCreatedEvent implements IEvent {
  id: string;

  username: string;

  avatarURL?: string;

  title: string;

  postId: string;

  tagIds: string[];

  extendedEndDate: Date;

  slug?: string;

  userAgent?: string;

  constructor({
    id,
    username,
    avatarURL,
    title,
    postId,
    tagIds,
    extendedEndDate,
    slug,
    userAgent,
  }: {
    id: string;
    username: string;
    avatarURL?: string;
    title: string;
    postId: string;
    tagIds: string[];
    extendedEndDate: Date;
    slug?: string;
    userAgent?: string;
  }) {
    this.id = id;
    this.username = username;
    this.avatarURL = avatarURL;
    this.title = title;
    this.postId = postId;
    this.tagIds = tagIds;
    this.extendedEndDate = extendedEndDate;
    this.slug = slug;
    this.userAgent = userAgent;
  }
}
