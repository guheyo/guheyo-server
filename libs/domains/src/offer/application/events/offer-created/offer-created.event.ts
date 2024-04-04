import { IEvent } from '@nestjs/cqrs';

export class OfferCreatedEvent implements IEvent {
  id: string;

  username: string;

  avatarURL?: string;

  name: string;

  slug?: string;

  price: number;

  source: string;

  constructor({
    id,
    username,
    avatarURL,
    name,
    slug,
    price,
    source,
  }: {
    id: string;
    username: string;
    avatarURL?: string;
    name: string;
    slug?: string;
    price: number;
    source: string;
  }) {
    this.id = id;
    this.username = username;
    this.avatarURL = avatarURL;
    this.name = name;
    this.slug = slug;
    this.price = price;
    this.source = source;
  }
}
