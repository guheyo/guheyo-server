import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindSwapsQuery } from './find-swaps.query';
import { SwapResponse } from '../../dtos/swap.response';
import { PaginatedSwapsResponse } from './paginated-swaps.response';

@QueryHandler(FindSwapsQuery)
export class FindSwapsHandler extends PrismaQueryHandler<FindSwapsQuery, SwapResponse> {
  constructor() {
    super(SwapResponse);
  }

  async execute(query: FindSwapsQuery): Promise<PaginatedSwapsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const swaps = await this.prismaService.swap.findMany({
      where: query.where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        proposer: {
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
    const swapWithImagesPromises = swaps.map(async (swap) => ({
      ...swap,
      images: await this.prismaService.userImage.findMany({
        where: {
          type: 'swap',
          refId: swap.id,
          tracked: true,
        },
      }),
    }));
    return paginate<SwapResponse>(
      this.parseResponses(await Promise.all(swapWithImagesPromises)),
      'id',
      query.take,
    );
  }
}
