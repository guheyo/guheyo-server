import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@lib/shared/prisma/prisma.module';
import { MEMBER_PROVIDERS } from '@lib/domains/member/member.providers';
import { MemberResolver } from './member.resolver';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [MemberResolver, ...MEMBER_PROVIDERS],
})
export class MemberModule {}
