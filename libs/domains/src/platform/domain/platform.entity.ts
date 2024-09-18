import { AggregateRoot } from '@nestjs/cqrs';

export class PlatformEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  description: string | null;

  logo: string | null;

  position: number;

  constructor(partial: Partial<PlatformEntity>) {
    super();
    Object.assign(this, partial);
  }
}
