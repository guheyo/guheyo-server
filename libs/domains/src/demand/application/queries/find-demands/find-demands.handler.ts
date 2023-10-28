import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindDemandsQuery } from './find-demands.query';
import { DemandResponse } from '../../dtos/demand.response';
import { PaginatedDemandsResponse } from './paginated-demands.response';

@QueryHandler(FindDemandsQuery)
export class FindDemandsHandler extends PrismaQueryHandler<FindDemandsQuery, DemandResponse> {
  constructor() {
    super(DemandResponse);
  }

  async execute(query: FindDemandsQuery): Promise<PaginatedDemandsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const demands = await this.prismaService.demand.findMany({
      where: query.where,
      cursor,
      take: query.take,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        buyer: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    });
    const demandWithImagesPromises = demands.map(async (demand) => ({
      ...demand,
      images: await this.prismaService.userImage.findMany({
        where: {
          type: 'demand',
          refId: demand.id,
          tracked: true,
        },
      }),
    }));
    return paginate<DemandResponse>(
      this.parseResponses(await Promise.all(demandWithImagesPromises)),
      'id',
      query.take,
    );
  }
}
