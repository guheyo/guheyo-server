import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MEMBER_PROVIDERS } from '@lib/domains/member/member.providers';

@Module({
  imports: [CqrsModule, PrismaModule],
  // No MemberResolver
  providers: [...MEMBER_PROVIDERS],
})
export class MemberModule {}
