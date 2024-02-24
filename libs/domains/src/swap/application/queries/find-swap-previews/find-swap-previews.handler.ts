import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { FindSwapPreviewsQuery } from './find-swap-previews.query';
import { SwapPreviewResponse } from '../../dtos/swap-preview.response';
import { PaginatedSwapPreviewsResponse } from './paginated-swap-previews.response';

@QueryHandler(FindSwapPreviewsQuery)
export class FindSwapPreviewsHandler extends PrismaQueryHandler<
  FindSwapPreviewsQuery,
  SwapPreviewResponse
> {
  constructor() {
    super(SwapPreviewResponse);
  }

  async execute(query: FindSwapPreviewsQuery): Promise<PaginatedSwapPreviewsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const swaps = await this.prismaService.swap.findMany({
      where: {
        ...query.where,
        OR: query.keyword
          ? [
              {
                name0: parseFollowedBySearcher(query.keyword),
              },
              {
                name1: parseFollowedBySearcher(query.keyword),
              },
            ]
          : undefined,
      },
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: [
        {
          price: query.orderBy?.price,
        },
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
      include: {
        proposer: {
          select: {
            username: true,
          },
        },
      },
    });
    const swapPreviewPromises = swaps.map(async (swap) => {
      const thumbnail = await this.prismaService.userImage.findFirst({
        where: {
          type: 'swap',
          refId: swap.id,
          tracked: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        ...swap,
        thumbnail,
      };
    });
    return paginate<SwapPreviewResponse>(
      this.parseResponses(await Promise.all(swapPreviewPromises)),
      'id',
      query.take,
    );
  }
}
