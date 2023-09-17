import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '@lib/domains/user/application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { UserRepository } from '@lib/domains/user/adapter/out/persistence/user.repository';

const commandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

@Module({
  imports: [PrismaModule],
  providers: [
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserRepository,
    },
  ],
  exports: [
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserRepository,
    },
  ],
})
export class UserCommandModule {}
