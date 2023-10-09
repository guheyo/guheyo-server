import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { CreateUserFromDiscordHandler } from './create-user-from-discord/create-user-from-discord.handler';

export const USER_COMMAND_PROVIDERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  CreateUserFromDiscordHandler,
];
