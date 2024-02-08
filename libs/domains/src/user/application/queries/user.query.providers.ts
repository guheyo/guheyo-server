import { FindMyUserByIdHandler } from './find-my-user-by-id/find-my-user-by-id.handler';
import { FindMyUserByUsernameHandler } from './find-my-user-by-username/find-my-user-by-username.handler';
import { FindUserHandler } from './find-user/find-user.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

export const USER_QUERY_PROVIDERS = [
  FindMyUserByIdHandler,
  FindUserHandler,
  FindUsersHandler,
  FindMyUserByUsernameHandler,
];
