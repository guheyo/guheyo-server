import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { FindGroupsQuery } from './find-groups.query';
import { GroupResponse } from '../../dtos/group.response';
import { PaginatedGroupsResponse } from './paginated-groups.response';

@QueryHandler(FindGroupsQuery)
export class FindGroupsHandler extends PrismaQueryHandler {
  async execute(query: FindGroupsQuery): Promise<PaginatedGroupsResponse> {
    const groups = await this.prismaService.group.findMany({
      orderBy: {
        position: 'asc',
      },
      include: {
        categories: {
          orderBy: {
            type: 'asc',
            position: 'asc',
          },
        },
        roles: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
    return paginate<GroupResponse>(
      groups.map((group) => plainToClass(GroupResponse, group)),
      'id',
      query.take,
    );
  }
}
