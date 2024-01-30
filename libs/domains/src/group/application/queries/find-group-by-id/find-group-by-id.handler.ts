import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { FindGroupByIdQuery } from './find-group-by-id.query';
import { GroupResponse } from '../../dtos/group.response';

@QueryHandler(FindGroupByIdQuery)
export class FindGroupByIdHandler extends PrismaQueryHandler<FindGroupByIdQuery, GroupResponse> {
  constructor() {
    super(GroupResponse);
  }

  async execute(query: FindGroupByIdQuery): Promise<GroupResponse | null> {
    const group = await this.prismaService.group.findUnique({
      where: { id: query.id },
      include: {
        productCategories: {
          orderBy: {
            position: 'asc',
          },
        },
        postCategories: {
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
