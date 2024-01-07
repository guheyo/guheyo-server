import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { paginate } from '@lib/shared/cqrs/queries/pagination/paginate';
import { FindAuctionsQuery } from './find-auctions.query';
import { AuctionResponse } from '../../dtos/auction.response';
import { PaginatedAuctionsResponse } from './paginated-auctions.response';

@QueryHandler(FindAuctionsQuery)
export class FindAuctionsHandler extends PrismaQueryHandler<FindAuctionsQuery, AuctionResponse> {
  constructor() {
    super(AuctionResponse);
  }

  async execute(query: FindAuctionsQuery): Promise<PaginatedAuctionsResponse> {
    const cursor = query.cursor
      ? {
          id: query.cursor,
        }
      : undefined;
    const auctions = await this.prismaService.auction.findMany({
      where: query.where,
      cursor,
      take: query.take + 1,
      skip: query.skip,
      orderBy: {
        createdAt: 'desc',
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
            socialAccounts: true,
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
    const auctionWithImagesPromises = auctions.map(async (auction) => ({
      ...auction,
      images: await this.prismaService.userImage.findMany({
        where: {
          type: 'auction',
          refId: auction.id,
          tracked: true,
        },
      }),
    }));
    return paginate<AuctionResponse>(
      this.parseResponses(await Promise.all(auctionWithImagesPromises)),
      'id',
      query.take,
    );
  }
}
