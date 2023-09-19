import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule as UserDomainModule } from '@lib/domains/user/user.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule, UserDomainModule],
  providers: [UserResolver],
})
export class UserModule {}
