import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { REVIEW_PROVIDERS } from '@lib/domains/review/review.providers';
import { ReviewResolver } from './review.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [ReviewResolver, ...REVIEW_PROVIDERS],
})
export class ReviewModule {}
