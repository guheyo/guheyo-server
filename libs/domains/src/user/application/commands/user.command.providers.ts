import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { CreateJoinedUserHandler } from './create-joined-user/create-joined-user.handler';

export const USER_COMMAND_PROVIDERS = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  CreateJoinedUserHandler,
  {
    provide: 'UserSavePort',
    useClass: UserRepository,
  },
  {
    provide: 'UserLoadPort',
    useClass: UserRepository,
  },
];
