import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCommandModule } from '@lib/domains/user/application/commands/user.command.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule, UserCommandModule],
  providers: [UserResolver],
})
export class UserModule {}
