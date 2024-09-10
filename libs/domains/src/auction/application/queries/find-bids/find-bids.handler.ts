import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { FindBidsQuery } from './find-bids.query';
import { PaginatedBidsResponse } from './paginated-bids.response';
import { BidResponse } from '../../dtos/bid.response';

@QueryHandler(FindBidsQuery)
export class FindBidsHandler extends PrismaQueryHandler {
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

    return paginate<BidResponse>(
      bids.map((bid) => plainToInstance(BidResponse, bid)),
      'id',
      query.take,
    );
  }
}
