import { AggregateRoot } from '@nestjs/cqrs';

export class TagEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  type: string;

  name: string;

  description: string | null;

  position: number;

  constructor(partial: Partial<TagEntity>) {
    super();
    Object.assign(this, partial);
  }
}
