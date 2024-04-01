import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SOCIAL_ACCOUNT_PROVIDERS } from '@lib/domains/social-account/social-account.providers';

@Module({
  imports: [CqrsModule, PrismaModule],
  // No SocialAccountResolver
  providers: [...SOCIAL_ACCOUNT_PROVIDERS],
})
export class SocialAccountModule {}
