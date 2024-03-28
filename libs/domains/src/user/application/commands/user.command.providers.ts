import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { SignInUserHandler } from './sign-in-user/sign-in-user.handler';
import { LinkSocialProfileHandler } from './link-social-profile/link-social-profile.handler';

export const USER_COMMAND_PROVIDERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  SignInUserHandler,
  LinkSocialProfileHandler,
];
