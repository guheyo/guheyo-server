import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { FindMemberByUserAndGuildQuery } from './find-member-by-user-and-guild.query';
import { MemberLoadPort } from '../../port/out/member.load.port';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

@QueryHandler(FindMemberByUserAndGuildQuery)
export class FindMemberByUserAndGuildHandler
  implements IQueryHandler<FindMemberByUserAndGuildQuery>
{
  constructor(@Inject('MemberLoadPort') private memberLoadPort: MemberLoadPort) {}

  execute(query: FindMemberByUserAndGuildQuery): Promise<MemberWithRolesResponse | null> {
    return this.memberLoadPort.findMemberByUserAndGuild(query);
  }
}
