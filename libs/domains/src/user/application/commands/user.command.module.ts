import { Module } from '@nestjs/common';
import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';
import { CreateJoinedUserHandler } from './create-joined-user/create-joined-user.handler';

const commandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  CreateJoinedUserHandler,
];

@Module({
  providers: [
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserRepository,
    },
    {
      provide: 'UserLoadPort',
      useClass: UserRepository,
    },
  ],
})
export class UserCommandModule {}
