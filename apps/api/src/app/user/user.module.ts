import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { USER_PROVIDERS } from '@lib/domains/user/user.providers';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [UserResolver, ...USER_PROVIDERS],
})
export class UserModule {}
