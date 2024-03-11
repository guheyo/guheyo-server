import { IEvent } from '@nestjs/cqrs';

export class OfferBumpedEvent implements IEvent {
  id: string;

  offerId: string;

  oldData?: any;

  newData?: any;

  constructor({
    id,
    offerId,
    oldData,
    newData,
  }: {
    id: string;
    offerId: string;
    oldData?: any;
    newData?: any;
  }) {
    this.id = id;
    this.offerId = offerId;
    this.oldData = oldData;
    this.newData = newData;
  }
}
