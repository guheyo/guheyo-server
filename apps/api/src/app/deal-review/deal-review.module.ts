import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DEAL_REVIEW_PROVIDERS } from '@lib/domains/deal-review/deal-review.providers';
import { DealReviewResolver } from './deal-review.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [DealReviewResolver, ...DEAL_REVIEW_PROVIDERS],
})
export class DealReviewModule {}
