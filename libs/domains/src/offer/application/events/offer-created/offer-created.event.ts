import { IEvent } from '@nestjs/cqrs';

export class OfferCreatedEvent implements IEvent {
  id: string;

  username: string;

  avatarURL?: string;

  businessFunction: string;

  title: string;

  slug?: string;

  price: number;

  userAgent?: string;

  postId: string;

  tagIds: string[];

  constructor({
    id,
    username,
    avatarURL,
    businessFunction,
    title,
    slug,
    price,
    userAgent,
    postId,
    tagIds,
  }: {
    id: string;
    username: string;
    avatarURL?: string;
    businessFunction: string;
    title: string;
    slug?: string;
    price: number;
    userAgent?: string;
    postId: string;
    tagIds: string[];
  }) {
    this.id = id;
    this.username = username;
    this.avatarURL = avatarURL;
    this.businessFunction = businessFunction;
    this.title = title;
    this.slug = slug;
    this.price = price;
    this.userAgent = userAgent;
    this.postId = postId;
    this.tagIds = tagIds;
  }
}
