import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindDemandPreviewsQuery } from './find-demand-previews.query';
import { DemandPreviewResponse } from '../../dtos/demand-preview.response';
import { PaginatedDemandPreviewsResponse } from './paginated-demand-previews.response';

@QueryHandler(FindDemandPreviewsQuery)
export class FindDemandPreviewsHandler extends PrismaQueryHandler<
  FindDemandPreviewsQuery,
  DemandPreviewResponse
> {
  constructor() {
    super(DemandPreviewResponse);
  }

  async execute(query: FindDemandPreviewsQuery): Promise<PaginatedDemandPreviewsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const demands = await this.prismaService.demand.findMany({
      where: query.where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        buyer: {
          select: {
            username: true,
          },
        },
      },
    });

    return paginate<DemandPreviewResponse>(
      this.parseResponses(await Promise.all(demands)),
      'id',
      query.take,
    );
  }
}
