import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SocialAccountModule as SocialAccountDomainModule } from '@lib/domains/social-account/social-account.module';
import { SocialAccountResolver } from './social-account.resolver';

@Module({
  imports: [CqrsModule, SocialAccountDomainModule],
  providers: [SocialAccountResolver],
})
export class SocialAccountModule {}
