import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { CommentWithAuthorResponse } from '@lib/domains/comment/application/dtos/comment-with-author.response';
import { FindAuctionInteractionItemsQuery } from './find-auction-interaction-items.query';
import { AuctionInteractionItemUnion } from '../../dtos/auction-interaction-item.response';
import { PaginatedAuctionInteractionItemsResponse } from './paginated-auction-interaction-items.response';
import { BidResponse } from '../../dtos/bid.response';

@QueryHandler(FindAuctionInteractionItemsQuery)
export class FindAuctionInteractionItemsHandler extends PrismaQueryHandler {
  async execute(
    query: FindAuctionInteractionItemsQuery,
  ): Promise<PaginatedAuctionInteractionItemsResponse> {
    const cursor = query.cursor
      ? {
          id: undefined,
          createdAt: new Date(query.cursor),
        }
      : undefined;

    const bids =
      query.where?.type === 'all' || query.where?.type === 'bid'
        ? await this.prismaService.bid.findMany({
            where: {
              auctionId: query.where?.auctionId,
              userId: query.where?.userId,
              status: query.where?.status,
            },
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
          })
        : [];

    const comments =
      query.where?.type === 'all' || query.where?.type === 'comment'
        ? await this.prismaService.comment.findMany({
            where: {
              postId: query.where?.postId,
              userId: query.where?.userId,
            },
            cursor,
            take: query.take + 1,
            skip: query.skip,
            orderBy: [
              {
                createdAt: query.orderBy?.createdAt,
              },
            ],
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
              reactions: {
                where: {
                  canceledAt: null,
                },
                include: {
                  emoji: true,
                },
              },
            },
          })
        : [];

    const auctionInteractionItems = [
      ...bids.map((bid) => plainToClass(BidResponse, bid)),
      ...comments.map((comment) => plainToClass(CommentWithAuthorResponse, comment)),
    ]
      .sort((a, b) =>
        query.orderBy?.createdAt === 'asc'
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime(),
      )
      .slice(0, query.take + 1);

    return paginate<typeof AuctionInteractionItemUnion>(
      auctionInteractionItems,
      'createdAt',
      query.take,
    );
  }
}
