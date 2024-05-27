import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { FindGroupProfilesQuery } from './find-group-profiles.query';
import { GroupProfileResponse } from '../../dtos/group-profile.response';
import { PaginatedGroupProfilesResponse } from './paginated-group-profiles.response';

@QueryHandler(FindGroupProfilesQuery)
export class FindGroupProfilesHandler extends PrismaQueryHandler {
  async execute(query: FindGroupProfilesQuery): Promise<PaginatedGroupProfilesResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const groups = await this.prismaService.group.findMany({
      where: {
        ...query.where,
        position: {
          gt: 0,
        },
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      select: {
        id: true,
        name: true,
        slug: true,
        icon: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return paginate<GroupProfileResponse>(
      groups.map((group) => plainToClass(GroupProfileResponse, group)),
      'id',
      query.take,
    );
  }
}
