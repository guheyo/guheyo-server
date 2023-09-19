import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MemberModule as MemberDomainModule } from '@lib/domains/member/member.module';
import { MemberResolver } from './member.resolver';

@Module({
  imports: [CqrsModule, MemberDomainModule],
  providers: [MemberResolver],
})
export class MemberModule {}
