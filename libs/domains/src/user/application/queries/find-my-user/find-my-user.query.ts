import { IQuery } from '@nestjs/cqrs';
import { FindMyUserArgs } from './find-my-user.args';

export class FindMyUserQuery implements IQuery {
  userId?: string;

  provider?: string;

  socialId?: string;

  constructor(args: FindMyUserArgs) {
    this.userId = args.userId;
    this.provider = args.provider;
    this.socialId = args.socialId;
  }
}
