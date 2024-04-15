import { AggregateRoot } from '@nestjs/cqrs';

export class BumpEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  offerId: string;

  oldPrice: number;

  newPrice: number;

  constructor(partial: Partial<BumpEntity>) {
    super();
    Object.assign(this, partial);
  }
}
