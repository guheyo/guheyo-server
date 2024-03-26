import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
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
    let where: Prisma.SwapWhereInput;
    if (!!query.where?.proposerId && query.where.proposerId === query.userId) {
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

    const swaps = await this.prismaService.swap.findMany({
      where: {
        ...where,
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
        bumpedAt: query.where?.bumpedAt
          ? {
              gt: new Date(query.where.bumpedAt.gt),
            }
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
          bumpedAt: query.orderBy?.bumpedAt,
        },
      ],
      include: {
        proposer: {
          select: {
            id: true,
            createdAt: true,
            username: true,
            avatarURL: true,
            bot: true,
          },
        },
      },
      distinct: query.distinct ? ['name0', 'name1', 'proposerId'] : undefined,
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
