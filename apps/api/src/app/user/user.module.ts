import { Module } from '@nestjs/common';
import { UserCommandModule } from '@lib/domains/user/application/commands/user.command.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UserCommandModule],
  providers: [UserResolver],
})
export class UserModule {}
