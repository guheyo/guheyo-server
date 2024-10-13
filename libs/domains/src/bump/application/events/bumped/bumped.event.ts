import { IEvent } from '@nestjs/cqrs';

export class BumpedEvent implements IEvent {
  id: string;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  username: string;

  avatarURL?: string;

  businessFunction: string;

  title: string;

  slug?: string;

  price: number;

  postId: string;

  thumbnail?: string;

  constructor({
    id,
    offerId,
    oldPrice,
    newPrice,
    username,
    avatarURL,
    businessFunction,
    title,
    slug,
    price,
    postId,
    thumbnail,
  }: {
    id: string;
    offerId: string;
    oldPrice: number;
    newPrice: number;
    username: string;
    avatarURL?: string;
    businessFunction: string;
    title: string;
    slug?: string;
    price: number;
    postId: string;
    thumbnail?: string;
  }) {
    this.id = id;
    this.offerId = offerId;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
    this.username = username;
    this.avatarURL = avatarURL;
    this.businessFunction = businessFunction;
    this.title = title;
    this.slug = slug;
    this.price = price;
    this.postId = postId;
    this.thumbnail = thumbnail;
  }
}
