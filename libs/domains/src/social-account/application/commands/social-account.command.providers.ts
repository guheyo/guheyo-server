import { SocialAccountRepository } from '../../adapter/out/persistence/social-account.repository';
import { CreateSocialAccountHandler } from './create-social-account/create-social-account.handler';
import { UpdateSocialAccountHandler } from './update-social-account/update-social-account.handler';
import { DeleteSocialAccountHandler } from './delete-social-account/delete-social-account.handler';

export const SOCIAL_ACCOUNT_COMMAND_PROVIDERS = [
  CreateSocialAccountHandler,
  UpdateSocialAccountHandler,
  DeleteSocialAccountHandler,
  {
    provide: 'SocialAccountSavePort',
    useClass: SocialAccountRepository,
  },
  {
    provide: 'SocialAccountLoadPort',
    useClass: SocialAccountRepository,
  },
];
