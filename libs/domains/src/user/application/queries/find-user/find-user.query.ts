import { IQuery } from '@nestjs/cqrs';
import { FindUserArgs } from './find-user.args';

export class FindUserQuery implements IQuery {
  provider?: string;

  socialId?: string;

  username?: string;

  constructor(args: FindUserArgs) {
    this.provider = args.provider;
    this.socialId = args.socialId;
    this.username = args.username;
  }
}
