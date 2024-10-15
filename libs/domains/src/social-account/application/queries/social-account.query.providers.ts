import { FindNonExistingSocialAccountsHandler } from './find-non-existing-social-accounts/find-non-existing-social-accounts.handler';
import { FindSocialAccountConflictsHandler } from './find-social-account-conflicts/find-social-account-conflicts.handler';
import { FindSocialAccountHandler } from './find-social-account/find-social-account.handler';

export const SOCIAL_ACCOUNT_QUERY_PROVIDERS = [
  FindSocialAccountHandler,
  FindNonExistingSocialAccountsHandler,
  FindSocialAccountConflictsHandler,
];
