import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { PrismaService } from '@lib/shared';
import { FindMemberByUserAndGuildQuery } from './find-member-by-user-and-guild.query';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

@QueryHandler(FindMemberByUserAndGuildQuery)
export class FindMemberByUserAndGuildHandler
  implements IQueryHandler<FindMemberByUserAndGuildQuery>
{
  constructor(private prismaService: PrismaService) {}

  async execute(query: FindMemberByUserAndGuildQuery): Promise<MemberWithRolesResponse | null> {
    const members = await this.prismaService.member.findMany({
      where: {
        userId: query.userId,
        guildId: query.guildId,
      },
      include: {
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return members.length ? members[0] : null;
  }
}
