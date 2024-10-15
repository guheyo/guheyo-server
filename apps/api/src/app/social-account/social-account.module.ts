import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SOCIAL_ACCOUNT_PROVIDERS } from '@lib/domains/social-account/social-account.providers';
import { SocialAccountResolver } from './social-account.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [SocialAccountResolver, ...SOCIAL_ACCOUNT_PROVIDERS],
})
export class SocialAccountModule {}
