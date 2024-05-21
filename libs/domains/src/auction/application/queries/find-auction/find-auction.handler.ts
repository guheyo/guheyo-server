import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { AuctionResponse } from '../../dtos/auction.response';
import { FindAuctionQuery } from './find-auction.query';

@QueryHandler(FindAuctionQuery)
export class FindAuctionHandler extends PrismaQueryHandler<FindAuctionQuery, AuctionResponse> {
  constructor() {
    super(AuctionResponse);
  }

  async execute(query: FindAuctionQuery): Promise<any> {
    if (!query.id && !query.slug) return null;

    const auction = await this.prismaService.auction.findFirst({
      where: {
        id: query.id,
        post: {
          slug: query.slug,
        },
      },
      include: {
        post: {
          include: {
            group: true,
            category: true,
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
            tags: true,
            reports: {
              select: {
                id: true,
              },
            },
          },
        },
        bids: {
          orderBy: {
            createdAt: 'desc',
          },
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
        },
      },
    });
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_NOT_FOUND);

    const images = await this.prismaService.userImage.findMany({
      where: {
        type: 'auction',
        refId: auction.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    return this.parseResponse({
      ...auction,
      post: {
        ...auction.post,
        images,
        reportCount: auction.post.reports.length,
      },
    });
  }
}
