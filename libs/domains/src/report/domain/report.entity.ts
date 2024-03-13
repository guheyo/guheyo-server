import { AggregateRoot } from '@nestjs/cqrs';

export class ReportEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  type: string;

  offerId: string | null;

  demandId: string | null;

  swapId: string | null;

  reporterId: string;

  title: string;

  content: string | null;

  constructor(partial: Partial<ReportEntity>) {
    super();
    Object.assign(this, partial);
  }
}
