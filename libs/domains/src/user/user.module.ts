import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { UserCommandModule } from './application/commands/user.command.module';
import { UserQueryModule } from './application/queries/user.query.module';
import { UserEventModule } from './application/events/user.event.module';
import { UserSagaModule } from './application/sagas/user.saga.module';

@Module({
  imports: [PrismaModule, UserCommandModule, UserQueryModule, UserEventModule, UserSagaModule],
})
export class UserModule {}
