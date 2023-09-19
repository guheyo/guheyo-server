import { FindMyUserByIdHandler } from './find-my-user-by-id/find-my-user-by-id.handler';
import { FindMyUserBySocialAccountHandler } from './find-my-user-by-social-account/find-my-user-by-social-account.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

export const USER_QUERY_PROVIDERS = [
  FindMyUserByIdHandler,
  FindMyUserBySocialAccountHandler,
  FindUsersHandler,
];