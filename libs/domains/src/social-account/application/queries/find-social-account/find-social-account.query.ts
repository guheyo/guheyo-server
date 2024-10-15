import { IQuery } from '@nestjs/cqrs';
import { FindSocialAccountWithTokenInput } from './find-social-account-with-token.input';

export class FindSocialAccountQuery implements IQuery {
  provider: string;

  socialId: string;

  refreshToken: string;

  constructor(input: FindSocialAccountWithTokenInput) {
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.refreshToken = input.refreshToken;
  }
}
