import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { MemberLoadPort } from '@lib/domains/member/application/port/out/member.load.port';
import { FindMemberByUserAndGuildQuery } from '@lib/domains/member/application/queries/find-member-by-user-and-guild/find-member-by-user-and-guild.query';
import { MemberWithRolesResponse } from '@lib/domains/member/application/dtos/member-with-roles.response';

@Injectable()
export class MemberQueryRepository implements MemberLoadPort {
  constructor(private prismaService: PrismaService) {}

  async findMemberByUserAndGuild(
    query: FindMemberByUserAndGuildQuery,
  ): Promise<MemberWithRolesResponse | null> {
    const members = await this.prismaService.member.findMany({
      where: {
        userId: query.userId,
        guildId: query.guildId,
      },
      include: {
        roles: {
          orderBy: {
            rank: 'asc',
          },
        },
      },
    });
    return members.length ? members[0] : null;
  }
}
