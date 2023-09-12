import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: string;

  createdAt: Date;

  updateedAt: Date;

  deletedAt: Date | null;

  name: string;

  rank: number | null;

  hexColor: string = '#000000';

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
