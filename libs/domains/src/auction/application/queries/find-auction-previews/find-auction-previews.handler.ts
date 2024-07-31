import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { parseContainsSearcher } from '@lib/shared/search/search';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { AUCTION_CLOSED } from '@lib/domains/auction/domain/auction.constants';
import { NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import dayjs from 'dayjs';
import { FindAuctionPreviewsQuery } from './find-auction-previews.query';
import { AuctionPreviewResponse } from '../../dtos/auction-preview.response';
import { PaginatedAuctionPreviewsResponse } from './paginated-auction-previews.response';

@QueryHandler(FindAuctionPreviewsQuery)
export class FindAuctionPreviewsHandler extends PrismaQueryHandler {
  async execute(query: FindAuctionPreviewsQuery): Promise<PaginatedAuctionPreviewsResponse> {
    let auctions = [];
    if (query.orderBy?.extendedEndDate) {
      const isCursorAuctionLive = query.cursor ? await this.isAuctionLive(query.cursor) : true;
      if (isCursorAuctionLive) {
        auctions = await this.fetchLiveAndClosedAuctions(query);
      } else {
        auctions = await this.fetchAuctions(query, false);
      }
    } else {
      auctions = await this.fetchAuctions(query);
    }

    return paginate<AuctionPreviewResponse>(
      auctions.map((auction) => plainToClass(AuctionPreviewResponse, auction)),
      'id',
      query.take,
    );
  }

  private async isAuctionLive(id: string) {
    const auction = await this.prismaService.auction.findUnique({
      where: {
        id,
      },
      select: {
        extendedEndDate: true,
      },
    });
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_NOT_FOUND);

    return dayjs().isBefore(auction.extendedEndDate);
  }

  private async fetchLiveAndClosedAuctions(query: FindAuctionPreviewsQuery) {
    const liveAuctions = await this.fetchAuctions(query, true);
    const auctions = [...liveAuctions];

    if (liveAuctions.length < query.take + 1) {
      const remainingTake = query.take - liveAuctions.length;
      const closedAuctions = await this.fetchAuctions(
        {
          ...query,
          cursor: undefined,
          take: remainingTake,
          skip: 0,
        },
        false,
      );
      auctions.push(...closedAuctions);
    }

    return auctions;
  }

  private async fetchAuctions(query: FindAuctionPreviewsQuery, isLive?: boolean) {
    const keywordCondition = query.keyword
      ? {
          OR: [
            ...(['all', 'title', undefined].includes(query.target)
              ? [
                  {
                    post: {
                      title: parseContainsSearcher({
                        keyword: query.keyword,
                      }),
                    },
                  },
                ]
              : []),
            ...(['all', 'content', undefined].includes(query.target)
              ? [
                  {
                    content: parseContainsSearcher({
                      keyword: query.keyword,
                    }),
                  },
                ]
              : []),
          ],
        }
      : {};

    const where: Prisma.AuctionWhereInput = query.where
      ? {
          post: {
            groupId: query.where.groupId,
            categoryId: query.where.categoryId,
            userId: query.where.userId,
            pending: query.where.pending,
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
          ...(query.where.bidderId && {
            bids: {
              some: {
                userId: query.where.bidderId,
                canceledAt: null,
              },
            },
          }),
          ...keywordCondition,
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

    const isMyClosedAuctions =
      !!query.userId &&
      query.userId === query.where?.userId &&
      query.where?.status === AUCTION_CLOSED;

    const auctions = await this.prismaService.auction.findMany({
      where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      include: {
        post: {
          include: {
            group: true,
            category: true,
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
        userReviews: isMyClosedAuctions
          ? {
              where: {
                post: {
                  userId: query.userId,
                },
              },
            }
          : false,
      },
      orderBy,
    });
    return auctions.map((auction) => ({
      ...auction,
      currentBidPrice: auction.bids[0]?.price || 0,
      hasSubmittedReview: isMyClosedAuctions ? auction.userReviews.length > 0 : undefined,
    }));
  }
}
