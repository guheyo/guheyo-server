import { SocialAccountRepository } from './adapter/out/persistence/social-account.repository';
import { SOCIAL_ACCOUNT_COMMAND_PROVIDERS } from './application/commands/social-account.command.providers';

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
];
