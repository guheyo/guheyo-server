import { FindMemberByUserAndGuildQuery } from '../../queries/find-member-by-user-and-guild/find-member-by-user-and-guild.query';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

export interface MemberLoadPort {
  findMemberByUserAndGuild(
    query: FindMemberByUserAndGuildQuery,
  ): Promise<MemberWithRolesResponse | null>;
}
