import { IEvent } from '@nestjs/cqrs';

export class BidPlacedEvent implements IEvent {
  auctionId: string;

  bidId: string;

  title: string;

  slug?: string;

  price: number;

  constructor({
    auctionId,
    bidId,
    title,
    slug,
    price,
  }: {
    auctionId: string;
    bidId: string;
    title: string;
    slug?: string;
    price: number;
  }) {
    this.auctionId = auctionId;
    this.bidId = bidId;
    this.title = title;
    this.slug = slug;
    this.price = price;
  }
}
