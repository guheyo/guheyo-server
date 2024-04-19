import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGroupQuery } from './find-group.query';
import { GroupResponse } from '../../dtos/group.response';

@QueryHandler(FindGroupQuery)
export class FindGroupHandler extends PrismaQueryHandler<FindGroupQuery, GroupResponse> {
  constructor() {
    super(GroupResponse);
  }

  async execute(query: FindGroupQuery): Promise<GroupResponse | null> {
    const group = await this.prismaService.group.findFirst({
      where: {
        id: query.id,
        slug: query.slug,
      },
      include: {
        categories: {
          orderBy: {
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
    return this.parseResponse(group);
  }
}
