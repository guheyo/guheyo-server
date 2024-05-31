import { FindAuthorHandler } from './find-author/find-author.handler';
import { FindMyUserHandler } from './find-my-user/find-my-user.handler';
import { FindUserWithoutSocialAccountsCountHandler } from './find-user-without-social-accounts-count/find-user-without-social-accounts-count.handler';
import { FindUserHandler } from './find-user/find-user.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

export const USER_QUERY_PROVIDERS = [
  FindUserHandler,
  FindUsersHandler,
  FindMyUserHandler,
  FindAuthorHandler,
  FindUserWithoutSocialAccountsCountHandler,
];
