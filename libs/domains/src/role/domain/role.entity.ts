import { AggregateRoot } from '@nestjs/cqrs';

export class RoleEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  rank: number | null;

  hexColor: string = '#000000';

  guildId: string;

  constructor(partial: Partial<RoleEntity>) {
    super();
    Object.assign(this, partial);
  }
}
