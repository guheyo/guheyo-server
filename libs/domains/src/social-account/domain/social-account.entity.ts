import { AggregateRoot } from '@nestjs/cqrs/dist';
import { isUndefined, omitBy } from 'lodash';
import { hashToken } from '@lib/shared/bcrypt/bcypt';
import { UpdateSocialAccountProps } from './social-account.types';

export class SocialAccountEntity extends AggregateRoot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  provider: string;

  socialId: string;

  userId: string;

  refreshToken: string | null;

  accessToken: string | null;

  expiresAt: number | null;

  tokenType: string | null;

  scope: string | null;

  idToken: string | null;

  sessionState: string | null;

  userAgent: string | null;

  ipAddress: string | null;

  constructor(partial: Partial<SocialAccountEntity>) {
    super();
    Object.assign(this, partial);
  }

  async init() {
    this.accessToken = this.accessToken ? await hashToken(this.accessToken) : null;
    this.refreshToken = this.refreshToken ? await hashToken(this.refreshToken) : null;
  }

  async update(props: UpdateSocialAccountProps) {
    Object.assign(this, omitBy(props, isUndefined), {
      accessToken: props?.accessToken ? await hashToken(props.accessToken) : null,
      refreshToken: props?.refreshToken ? await hashToken(props.refreshToken) : null,
    });
  }
}
