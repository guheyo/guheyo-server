import { IQuery } from '@nestjs/cqrs';
import { FindMyUserBySocialAccountArgs } from './find-my-user-by-social-account.args';

export class FindMyUserBySocialAccountQuery implements IQuery {
  provider: string;

  socialId: string;

  constructor(args: FindMyUserBySocialAccountArgs) {
    this.provider = args.provider;
    this.socialId = args.socialId;
  }
}
