import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { plainToClass } from 'class-transformer';
import { CommentWithAuthorResponse } from '@lib/domains/comment/application/dtos/comment-with-author.response';
import { COMMENT } from '@lib/domains/comment/domain/comment.constants';
import { FindAuctionInteractionItemsQuery } from './find-auction-interaction-items.query';
import { AuctionInteractionItemUnion } from '../../dtos/auction-interaction-item.response';
import { PaginatedAuctionInteractionItemsResponse } from './paginated-auction-interaction-items.response';
import { BidResponse } from '../../dtos/bid.response';

@QueryHandler(FindAuctionInteractionItemsQuery)
export class FindAuctionInteractionItemsHandler extends PrismaQueryHandler {
  async execute(
    query: FindAuctionInteractionItemsQuery,
  ): Promise<PaginatedAuctionInteractionItemsResponse> {
    const where = query.cursor
      ? {
          createdAt:
            query.orderBy?.createdAt === 'asc'
              ? {
                  gt: new Date(parseInt(query.cursor, 10)),
                }
              : {
                  lt: new Date(parseInt(query.cursor, 10)),
                },
        }
      : {};

    const bids =
      query.where?.view === 'newest' || query.where?.view === 'bid'
        ? await this.prismaService.bid.findMany({
            where: {
              ...where,
              auctionId: query.where?.auctionId,
              userId: query.where?.userId,
              status: query.where?.status,
            },
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
          })
        : [];

    const comments =
      query.where?.view === 'newest' ||
      query.where?.view === 'comment' ||
      query.where?.view === 'pinned' ||
      query.where?.view === 'sellerComment'
        ? await this.prismaService.comment.findMany({
            where: {
              ...where,
              postId: query.where?.postId,
              userId: query.where?.userId,
              pinned: query.where.view === 'pinned' ? true : undefined,
            },
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

    const commentWithImages = await Promise.all(
      comments.map(async (comment) => ({
        ...comment,
        images: await this.prismaService.userImage.findMany({
          where: {
            type: COMMENT,
            refId: comment.id,
          },
          orderBy: {
            position: 'asc',
          },
        }),
      })),
    );

    const auctionInteractionItems = [
      ...bids.map((bid) => plainToClass(BidResponse, bid)),
      ...commentWithImages.map((comment) => plainToClass(CommentWithAuthorResponse, comment)),
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
