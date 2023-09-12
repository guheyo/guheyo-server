import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { CreateUserHandler } from '@lib/domains/user/application/commands/create-user/create-user.handler';
import { UserUpdateHandler } from '@lib/domains/user/application/commands/user-update/user.update.handler';
import { DeleteUserHandler } from '@lib/domains/user/application/commands/delete-user/delete-user.handler';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';

const commandHandlers = [CreateUserHandler, UserUpdateHandler, DeleteUserHandler];

@Module({
  imports: [PrismaModule],
  providers: [
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserCommandRepository,
    },
  ],
  exports: [
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserCommandRepository,
    },
  ],
})
export class UserCommandModule {}
