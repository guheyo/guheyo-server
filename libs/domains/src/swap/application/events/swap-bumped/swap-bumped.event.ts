import { IEvent } from '@nestjs/cqrs';

export class SwapBumpedEvent implements IEvent {
  id: string;

  swapId: string;

  oldPrice: number;

  newPrice: number;

  constructor({
    id,
    swapId,
    oldPrice,
    newPrice,
  }: {
    id: string;
    swapId: string;
    oldPrice: number;
    newPrice: number;
  }) {
    this.id = id;
    this.swapId = swapId;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
  }
}
