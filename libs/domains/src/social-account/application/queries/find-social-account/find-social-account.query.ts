import { IQuery } from '@nestjs/cqrs';
import { FindSocialAccountArgs } from './find-social-account.args';

export class FindSocialAccountQuery implements IQuery {
  provider: string;

  socialId: string;

  refreshToken: string;

  constructor(args: FindSocialAccountArgs) {
    this.provider = args.provider;
    this.socialId = args.socialId;
    this.refreshToken = args.refreshToken;
  }
}
