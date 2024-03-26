import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
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
    let where: Prisma.DemandWhereInput;
    if (!!query.where?.buyerId && query.where.buyerId === query.userId) {
      where = {
        ...query.where,
        isHidden: !!query.where.isHidden,
      };
    } else {
      where = {
        ...query.where,
        isHidden: false,
      };
    }

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const demands = await this.prismaService.demand.findMany({
      where: {
        ...where,
        name: parseFollowedBySearcher(query.keyword),
        bumpedAt: query.where?.bumpedAt
          ? {
              gt: new Date(query.where.bumpedAt.gt),
            }
          : undefined,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        buyer: {
          select: {
            id: true,
            createdAt: true,
            username: true,
            avatarURL: true,
            bot: true,
          },
        },
      },
      orderBy: [
        {
          price: query.orderBy?.price,
        },
        {
          bumpedAt: query.orderBy?.bumpedAt,
        },
      ],
      distinct: query.distinct ? ['name', 'buyerId'] : undefined,
    });

    return paginate<DemandPreviewResponse>(
      this.parseResponses(await Promise.all(demands)),
      'id',
      query.take,
    );
  }
}
