import { QueryHandler } from '@nestjs/cqrs/dist';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindMemberByUserAndGroupQuery } from './find-member-by-user-and-group.query';
import { MemberWithRolesResponse } from '../../dtos/member-with-roles.response';

@QueryHandler(FindMemberByUserAndGroupQuery)
export class FindMemberByUserAndGroupHandler extends PrismaQueryHandler<
  FindMemberByUserAndGroupQuery,
  MemberWithRolesResponse
> {
  constructor() {
    super(MemberWithRolesResponse);
  }

  async execute(query: FindMemberByUserAndGroupQuery): Promise<MemberWithRolesResponse | null> {
    const members = await this.prismaService.member.findMany({
      where: {
        userId: query.userId,
        groupId: query.groupId,
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
