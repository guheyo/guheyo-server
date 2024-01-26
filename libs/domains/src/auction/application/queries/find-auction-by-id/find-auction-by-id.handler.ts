import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { NotFoundException } from '@nestjs/common';
import { AuctionErrorMessage } from '@lib/domains/auction/domain/auction.error.message';
import { FindAuctionByIdQuery } from './find-auction-by-id.query';
import { AuctionResponse } from '../../dtos/auction.response';

@QueryHandler(FindAuctionByIdQuery)
export class FindAuctionByIdHandler extends PrismaQueryHandler<
  FindAuctionByIdQuery,
  AuctionResponse
> {
  constructor() {
    super(AuctionResponse);
  }

  async execute(query: FindAuctionByIdQuery): Promise<any> {
    const auction = await this.prismaService.auction.findUnique({
      where: {
        id: query.id,
      },
      include: {
        seller: {
          include: {
            members: {
              include: {
                roles: {
                  orderBy: {
                    position: 'asc',
                  },
                },
              },
            },
          },
        },
        bids: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            bidder: true,
          },
        },
      },
    });
    if (!auction) throw new NotFoundException(AuctionErrorMessage.AUCTION_IS_NOT_FOUND);

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
      images,
    });
  }
}