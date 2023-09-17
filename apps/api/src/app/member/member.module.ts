import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MemberCommandModule } from '@lib/domains/member/application/commands/member.command.module';
import { MemberQueryModule } from '@lib/domains/member/application/queries/member.query.module';
import { MemberResolver } from './member.resolver';

@Module({
  imports: [CqrsModule, MemberCommandModule, MemberQueryModule],
  providers: [MemberResolver],
})
export class MemberModule {}
