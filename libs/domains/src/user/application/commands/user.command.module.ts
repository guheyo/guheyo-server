import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs/dist';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { UserCommandService } from '@lib/domains/user/application/commands/user.command.service';
import { UserCreateHandler } from '@lib/domains/user/application/commands/user-create/user.create.handler';
import { UserUpdateHandler } from '@lib/domains/user/application/commands/user-update/user.update.handler';
import { UserDeleteHandler } from '@lib/domains/user/application/commands/user-delete/user.delete.handler';
import { UserCommandRepository } from '@lib/domains/user/adapter/out/persistence/user.command.repository';

const commandHandlers = [UserCreateHandler, UserUpdateHandler, UserDeleteHandler];

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [
    UserCommandService,
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserCommandRepository,
    },
  ],
  exports: [
    UserCommandService,
    ...commandHandlers,
    {
      provide: 'UserSavePort',
      useClass: UserCommandRepository,
    },
  ],
})
export class UserCommandModule {}
