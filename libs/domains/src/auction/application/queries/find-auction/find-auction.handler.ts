import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { plainToInstance } from 'class-transformer';
import { AuctionResponse } from '../../dtos/auction.response';
import { FindAuctionQuery } from './find-auction.query';

@QueryHandler(FindAuctionQuery)
export class FindAuctionHandler extends PrismaQueryHandler {
  async execute(query: FindAuctionQuery): Promise<AuctionResponse> {
    if (!query.id && !query.slug)
      throw new ForbiddenException(AuctionErrorMessage.INVALID_FIND_AUCTION_ARGS);

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
    return plainToInstance(AuctionResponse, {
      ...auction,
      post: {
        ...auction.post,
        images,
        reportCount: auction.post.reports.length,
      },
    });
  }
}
