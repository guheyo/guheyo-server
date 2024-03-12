import { AggregateRoot } from '@nestjs/cqrs';

export class BumpEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  offerId: string | null;

  demandId: string | null;

  swapId: string | null;

  oldPrice: number;

  newPrice: number;

  constructor(partial: Partial<BumpEntity>) {
    super();
    Object.assign(this, partial);
  }
}
