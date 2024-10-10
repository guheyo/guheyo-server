import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { plainToInstance } from 'class-transformer';
import { FindAuctionPreviewQuery } from './find-auction-preview.query';
import { AuctionPreviewResponse } from '../../dtos/auction-preview.response';

@QueryHandler(FindAuctionPreviewQuery)
export class FindAuctionPreviewHandler extends PrismaQueryHandler {
  async execute(query: FindAuctionPreviewQuery): Promise<AuctionPreviewResponse> {
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
              select: {
                id: true,
                createdAt: true,
                username: true,
                avatarURL: true,
                bot: true,
              },
            },
            tags: true,
            brands: true,
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
    });
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_NOT_FOUND);

    return plainToInstance(AuctionPreviewResponse, {
      ...auction,
      currentBidPrice: auction.bids[0]?.price || 0,
      hasSubmittedReview: undefined,
    });
  }
}
