import { Module } from '@nestjs/common';
import { SocialAccountCommandModule } from '@lib/domains/social-account/application/commands/social-account.command.module';
import { SocialAccountResolver } from './social-account.resolver';

@Module({
  imports: [SocialAccountCommandModule],
  providers: [SocialAccountResolver],
})
export class SocialAccountModule {}
