import { AggregateRoot } from '@nestjs/cqrs';
import { RoleEntity } from '@lib/domains/role/domain/role.entity';

export class MemberEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  userId: string;

  guildId: string;

  roles: RoleEntity[];

  constructor(partial: Partial<MemberEntity>) {
    super();
    Object.assign(this, partial);
  }
}
