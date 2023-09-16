import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { FindMemberByUserAndGuildQuery } from './find-member-by-user-and-guild.query';
import { MemberLoadPort } from '../../../port/out/member.load.port';

@QueryHandler(FindMemberByUserAndGuildQuery)
export class FindMemberByUserAndGuildHandler
  implements IQueryHandler<FindMemberByUserAndGuildQuery>
{
  constructor(@Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort) {}

  execute(query: FindMemberByUserAndGuildQuery): Promise<any> {
    return this.memberLoadPort.findMemberByUserAndGuild(query);
  }
}
