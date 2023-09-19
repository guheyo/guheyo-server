import { Module } from '@nestjs/common';
import { FindMemberByUserAndGuildHandler } from './find-member-by-user-and-guild/find-member-by-user-and-guild.handler';

const queryHandlers = [FindMemberByUserAndGuildHandler];

@Module({
  providers: [...queryHandlers],
})
export class MemberQueryModule {}
