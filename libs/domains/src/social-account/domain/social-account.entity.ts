import { AggregateRoot } from '@nestjs/cqrs/dist';
import _ from 'lodash';
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

  constructor(partial: Partial<SocialAccountEntity>) {
    super();
    Object.assign(this, partial);
  }

  update(props: UpdateSocialAccountProps) {
    Object.assign(this, _.pickBy(props, _.identity));
  }
}
