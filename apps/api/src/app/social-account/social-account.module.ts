import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SocialAccountCommandModule } from '@lib/domains/social-account/application/commands/social-account.command.module';
import { SocialAccountResolver } from './social-account.resolver';

@Module({
  imports: [CqrsModule, SocialAccountCommandModule],
  providers: [SocialAccountResolver],
})
export class SocialAccountModule {}
