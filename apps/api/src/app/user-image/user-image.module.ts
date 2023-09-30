import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ImageModule } from '@lib/shared/image/image.module';
import { USER_IMAGE_PROVIDERS } from '@lib/domains/user-image/user-image.providers';
import { UserImageResolver } from './user-image.resolver';

@Module({
  imports: [CqrsModule, PrismaModule, ImageModule],
  providers: [UserImageResolver, ...USER_IMAGE_PROVIDERS],
})
export class UserImageModule {}
