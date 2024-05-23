import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { Prisma } from '@prisma/client';
import { FindBidsQuery } from './find-bids.query';
import { PaginatedBidsResponse } from './paginated-bids.response';
import { BidResponse } from '../../dtos/bid.response';

@QueryHandler(FindBidsQuery)
export class FindBidsHandler extends PrismaQueryHandler<FindBidsQuery, BidResponse> {
  constructor() {
    super(BidResponse);
  }

  async execute(query: FindBidsQuery): Promise<PaginatedBidsResponse> {
    const where: Prisma.BidWhereInput = query.where
      ? {
          auctionId: query.where.auctionId,
          userId: query.where.userId,
          status: query.where.status,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const bids = await this.prismaService.bid.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        user: {
          include: {
            roles: {
              include: {
                group: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
            socialAccounts: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
      ],
    });

    return paginate<BidResponse>(this.parseResponses(bids), 'id', query.take);
  }
}
