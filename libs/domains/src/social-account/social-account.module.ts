import { Module } from '@nestjs/common';
import { SocialAccountCommandModule } from './application/commands/social-account.command.module';

@Module({
  imports: [SocialAccountCommandModule],
})
export class SocialAccountModule {}
