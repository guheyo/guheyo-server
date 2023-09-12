import { Member } from '@prisma/client';
import { RoleEntity } from './role.entity';

export class MemberEntity implements Member {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  userId: string;

  guildId: string;

  roles: RoleEntity[];

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}
