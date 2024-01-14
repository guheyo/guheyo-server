import { QueryHandler } from '@nestjs/cqrs/dist';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMemberByUserAndGuildQuery } from './find-member-by-user-and-guild.query';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

@QueryHandler(FindMemberByUserAndGuildQuery)
export class FindMemberByUserAndGuildHandler extends PrismaQueryHandler<
  FindMemberByUserAndGuildQuery,
  MemberWithRolesResponse
> {
  constructor() {
    super(MemberWithRolesResponse);
  }

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
    return this.parseResponse(members[0]);
  }
}
