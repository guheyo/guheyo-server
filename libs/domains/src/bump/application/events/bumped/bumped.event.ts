import { IEvent } from '@nestjs/cqrs';

export class BumpedEvent implements IEvent {
  id: string;

  type: string;

  refId: string;

  oldPrice: number;

  newPrice: number;

  constructor({
    id,
    type,
    refId,
    oldPrice,
    newPrice,
  }: {
    id: string;
    type: string;
    refId: string;
    oldPrice: number;
    newPrice: number;
  }) {
    this.id = id;
    this.type = type;
    this.refId = refId;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
  }
}
