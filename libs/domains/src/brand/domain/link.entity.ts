import { AggregateRoot } from '@nestjs/cqrs';

export class LinkEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  url: string;

  platformId: string;

  brandId: string;

  position: number;

  constructor(partial: Partial<LinkEntity>) {
    super();
    Object.assign(this, partial);
  }
}
