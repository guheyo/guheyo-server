import { IQuery } from '@nestjs/cqrs';
import { SocialUserArgs } from './social-user.args';
import { FindNonExistingSocialAccountsArgs } from './find-non-existing-social-accounts.args';

export class FindNonExistingSocialAccountsQuery implements IQuery {
  socialUsers: SocialUserArgs[];

  constructor(args: FindNonExistingSocialAccountsArgs) {
    this.socialUsers = args.socialUsers;
  }
}
