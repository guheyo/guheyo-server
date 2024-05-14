import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REVIEW_PROVIDERS } from '@lib/domains/user-review/user-review.providers';
import { UserReviewResolver } from './user-review.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [UserReviewResolver, ...USER_REVIEW_PROVIDERS],
})
export class UserReviewModule {}
