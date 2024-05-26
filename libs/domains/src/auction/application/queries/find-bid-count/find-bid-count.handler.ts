import { QueryHandler } from '@nestjs/cqrs';
import { PrismaQueryHandler } from '@lib/shared/cqrs/queries/handlers/prisma-query.handler';
import { plainToClass } from 'class-transformer';
import { FindBidCountQuery } from './find-bid-count.query';
import { BidCountResponse } from '../../dtos/bid-count.response';

@QueryHandler(FindBidCountQuery)
export class FindBidCountHandler extends PrismaQueryHandler {
  async execute(query: FindBidCountQuery): Promise<BidCountResponse> {
    const bids = await this.prismaService.bid.findMany({
      where: {
        auctionId: query.auctionId,
      },
      select: {
        id: true,
      },
    });

    return plainToClass(BidCountResponse, {
      auctionId: query.auctionId,
      count: bids.length,
    });
  }
}
