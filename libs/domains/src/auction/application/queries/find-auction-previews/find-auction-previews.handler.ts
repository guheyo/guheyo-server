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
    let auctions;
    if (query.orderBy?.extendedEndDate) {
      auctions = await this.fetchAuctions(query, true);
      if (auctions.length < query.take + 1) {
        const auctionsClosed = await this.fetchAuctions(
          {
            ...query,
            take: query.take - auctions.length,
          },
          false,
        );
        auctions.push(...auctionsClosed);
      }
    } else {
      auctions = await this.fetchAuctions(query);
    }

    return paginate<AuctionPreviewResponse>(
      auctions.map((auction) =>
        plainToClass(AuctionPreviewResponse, {
          ...auction,
          currentBidPrice: auction.bids[0]?.price || 0,
        }),
      ),
      'id',
      query.take,
    );
  }

  private async fetchAuctions(query: FindAuctionPreviewsQuery, isLive?: boolean) {
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
          ...(isLive !== undefined && {
            extendedEndDate: isLive
              ? {
                  gt: new Date(),
                }
              : {
                  lte: new Date(),
                },
          }),
        }
      : {};

    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;

    const orderBy:
      | Prisma.AuctionOrderByWithRelationAndSearchRelevanceInput
      | Prisma.AuctionOrderByWithRelationAndSearchRelevanceInput[]
      | undefined = [
      {
        createdAt: query.orderBy?.createdAt,
      },
      {
        extendedEndDate: query.orderBy?.extendedEndDate ? (isLive ? 'asc' : 'desc') : undefined,
      },
    ];

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
        bids: {
          select: {
            id: true,
            price: true,
          },
          where: {
            canceledAt: null,
          },
          orderBy: {
            price: 'desc',
          },
          take: 1,
        },
      },
      orderBy,
    });
    return auctions;
  }
}
