import { QueryHandler } from '@nestjs/cqrs/dist';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMemberQuery } from './find-member.query';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

@QueryHandler(FindMemberQuery)
export class FindMemberHandler extends PrismaQueryHandler<
  FindMemberQuery,
  MemberWithRolesResponse
> {
  constructor() {
    super(MemberWithRolesResponse);
  }

  async execute(query: FindMemberQuery): Promise<MemberWithRolesResponse | null> {
    const members = await this.prismaService.member.findMany({
      where: {
        userId: query.userId,
        groupId: query.groupId,
      },
      include: {
        group: true,
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
