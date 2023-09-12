import { SocialAccount } from '@prisma/client';
import { SocialAccountWithoutAuthEntity } from './social-account.without-auth.entity';

export class SocialAccountEntity extends SocialAccountWithoutAuthEntity implements SocialAccount {
  refreshToken: string | null;

  accessToken: string | null;

  expiresAt: number | null;

  tokenType: string | null;

  scope: string | null;

  idToken: string | null;

  sessionState: string | null;

  constructor(partial: Partial<SocialAccountEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
