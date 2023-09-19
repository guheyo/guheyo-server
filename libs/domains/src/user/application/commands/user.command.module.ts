import { Module } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';

const commandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

@Module({
  providers: [
    PrismaService,
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
