import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseFollowedBySearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { FindAuctionPreviewsQuery } from './find-auction-previews.query';
import { AuctionPreviewResponse } from '../../dtos/auction-preview.response';
import { PaginatedAuctionPreviewsResponse } from './paginated-auction-previews.response';

@QueryHandler(FindAuctionPreviewsQuery)
export class FindAuctionPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindAuctionPreviewsQuery): Promise<PaginatedAuctionPreviewsResponse> {
    const where: Prisma.AuctionWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            userId: query.where.userId,
            pending: query.where.pending,
            title: parseFollowedBySearcher(query.keyword),
          },
          status: query.where.status,
          createdAt: query.where?.createdAt
            ? {
                gt: new Date(query.where.createdAt.gt),
              }
            : undefined,
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const auctions = await this.prismaService.auction.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            user: {
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
            tags: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: query.orderBy?.createdAt,
        },
        {
          extendedEndDate: query.orderBy?.extendedEndDate,
        },
      ],
    });

    return paginate<AuctionPreviewResponse>(
      auctions.map((auction) => plainToClass(AuctionPreviewResponse, auction)),
      'id',
      query.take,
    );
  }
}
