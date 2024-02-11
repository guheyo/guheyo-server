import { SocialAccountRepository } from './adapter/out/persistence/social-account.repository';
import { SOCIAL_ACCOUNT_COMMAND_PROVIDERS } from './application/commands/social-account.command.providers';
import { SOCIAL_ACCOUNT_QUERY_PROVIDERS } from './application/queries/social-account.query.providers';

export const SOCIAL_ACCOUNT_PROVIDERS = [
  {
    provide: 'SocialAccountLoadPort',
    useClass: SocialAccountRepository,
  },
  {
    provide: 'SocialAccountSavePort',
    useClass: SocialAccountRepository,
  },
  ...SOCIAL_ACCOUNT_COMMAND_PROVIDERS,
  ...SOCIAL_ACCOUNT_QUERY_PROVIDERS,
];
