import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { COMMENT_PROVIDERS } from '@lib/domains/comment/comment.providers';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [CommentResolver, ...COMMENT_PROVIDERS],
})
export class CommentModule {}
