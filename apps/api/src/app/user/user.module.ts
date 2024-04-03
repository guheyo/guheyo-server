import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { ImageModule } from '@lib/shared/image/image.module';
import { USER_PROVIDERS } from '@lib/domains/user/user.providers';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule, PrismaModule, ImageModule],
  providers: [UserResolver, ...USER_PROVIDERS],
})
export class UserModule {}
