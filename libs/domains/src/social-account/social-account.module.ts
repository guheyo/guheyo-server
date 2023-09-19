import { Module } from '@nestjs/common';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { SocialAccountCommandModule } from './application/commands/social-account.command.module';

@Module({
  imports: [PrismaModule, SocialAccountCommandModule],
})
export class SocialAccountModule {}
