import { AggregateRoot } from '@nestjs/cqrs';

export class MannerTagEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  description: string | null;

  isPositive: boolean;

  position: number;

  constructor(partial: Partial<MannerTagEntity>) {
    super();
    Object.assign(this, partial);
  }
}
