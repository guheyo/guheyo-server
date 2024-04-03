import { FindAuthorHandler } from './find-author/find-author.handler';
import { FindMyUserHandler } from './find-my-user/find-my-user.handler';
import { FindUserHandler } from './find-user/find-user.handler';
import { FindUsersHandler } from './find-users/find-users.handler';

export const USER_QUERY_PROVIDERS = [
  FindUserHandler,
  FindUsersHandler,
  FindMyUserHandler,
  FindAuthorHandler,
];
