import { AggregateRoot } from '@nestjs/cqrs';

export class TermEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  name: string;

  title: string;

  content: string;

  meta?: any;

  constructor(partial: Partial<TermEntity>) {
    super();
    Object.assign(this, partial);
  }
}
