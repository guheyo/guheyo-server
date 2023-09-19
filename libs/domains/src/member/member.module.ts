import { Module } from '@nestjs/common';
import { MemberCommandModule } from './application/commands/member.command.module';
import { MemberQueryModule } from './application/queries/member.query.module';

@Module({
  imports: [MemberCommandModule, MemberQueryModule],
})
export class MemberModule {}
