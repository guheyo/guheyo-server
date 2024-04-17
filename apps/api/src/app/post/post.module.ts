import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { POST_PROVIDERS } from '@lib/domains/post/post.providers';
import { PostResolver } from './post.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [PostResolver, ...POST_PROVIDERS],
})
export class PostModule {}
