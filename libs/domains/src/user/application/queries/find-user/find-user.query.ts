import { IQuery } from '@nestjs/cqrs';
import { FindUserArgs } from './find-user.args';

export class FindUserQuery implements IQuery {
  provider?: string;

  socialId?: string;

  sessionToken?: string;

  constructor(args: FindUserArgs) {
    this.provider = args.provider;
    this.socialId = args.socialId;
    this.sessionToken = args.sessionToken;
  }
}
