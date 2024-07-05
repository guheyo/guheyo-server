import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ARTICLE_PROVIDERS } from '@lib/domains/article/article.providers';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [ArticleResolver, ...ARTICLE_PROVIDERS],
})
export class ArticleModule {}
