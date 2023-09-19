import { Module } from '@nestjs/common';
import { UserCommandModule } from './application/commands/user.command.module';
import { UserQueryModule } from './application/queries/user.query.module';
import { UserEventModule } from './application/events/user.event.module';
import { UserSagaModule } from './application/sagas/user.saga.module';

@Module({
  imports: [UserCommandModule, UserQueryModule, UserEventModule, UserSagaModule],
})
export class UserModule {}
