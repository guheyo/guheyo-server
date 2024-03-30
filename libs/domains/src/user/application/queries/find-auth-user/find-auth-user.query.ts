import { IQuery } from '@nestjs/cqrs';
import { FindAuthUserArgs } from './find-auth-user.args';

export class FindAuthUserQuery implements IQuery {
  provider: string;

  socialId: string;

  constructor(args: FindAuthUserArgs) {
    this.provider = args.provider;
    this.socialId = args.socialId;
  }
}
