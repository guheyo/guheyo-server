export class SocialAccountWithoutAuthEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  provider: string;

  socialId: string;

  userId: string;

  constructor(partial: Partial<SocialAccountWithoutAuthEntity>) {
    Object.assign(this, partial);
  }
}
