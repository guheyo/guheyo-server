import { IQuery } from '@nestjs/cqrs';
import { FindUserWithoutSocialAccountsCountArgs } from './find-user-without-social-accounts-count.args';

export class FindUserWithoutSocialAccountsCountQuery implements IQuery {
  providers: string[];

  constructor({ args }: { args: FindUserWithoutSocialAccountsCountArgs }) {
    this.providers = args.providers;
  }
}
