import { IEvent } from '@nestjs/cqrs';

export class DemandBumpedEvent implements IEvent {
  id: string;

  demandId: string;

  oldPrice: number;

  newPrice: number;

  constructor({
    id,
    demandId,
    oldPrice,
    newPrice,
  }: {
    id: string;
    demandId: string;
    oldPrice: number;
    newPrice: number;
  }) {
    this.id = id;
    this.demandId = demandId;
    this.oldPrice = oldPrice;
    this.newPrice = newPrice;
  }
}
