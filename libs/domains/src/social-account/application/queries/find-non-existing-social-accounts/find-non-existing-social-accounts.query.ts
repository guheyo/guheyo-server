import { IQuery } from '@nestjs/cqrs';
import { FindNonExistingSocialAccountsArgs } from './find-non-existing-social-accounts.args';

export class FindNonExistingSocialAccountsQuery implements IQuery {
  provider: string;

  socialIds: string[];

  constructor(args: FindNonExistingSocialAccountsArgs) {
    this.provider = args.provider;
    this.socialIds = args.socialIds;
  }
}
