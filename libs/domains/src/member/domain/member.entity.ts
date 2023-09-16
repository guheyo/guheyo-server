import { Member } from '@prisma/client';

export class MemberEntity implements Member {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  userId: string;

  guildId: string;

  constructor(partial: Partial<MemberEntity>) {
    Object.assign(this, partial);
  }
}
