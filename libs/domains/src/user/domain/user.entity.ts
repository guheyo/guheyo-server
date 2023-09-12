import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  name: string | null;

  username: string;

  avatarURL: string | null;

  bot: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
