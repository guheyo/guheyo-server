import { IEvent } from '@nestjs/cqrs';

export class BumpedEvent implements IEvent {
  id: string;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  constructor({
    id,
    offerId,
    oldPrice,
    newPrice,
  }: {
    id: string;
    offerId: string;
    oldPrice: number;
    newPrice: number;
  }) {
    this.id = id;
    this.offerId = offerId;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
  }
}
